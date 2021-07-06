import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { percentage, squareMetreValue } from '../utils/utilsCalcs'

const portalsDirectory = path.join(process.cwd(), 'portals')
const urlFetch = `http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json`
const urlTest = `http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-sample.json`

export async function getPortalsData() {

  const fileNames = fs.readdirSync(portalsDirectory)
  const allPortalsData = await fileNames.map(async fileName => {

    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(portalsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()


    return {
      id,
      contentHtml,
      ...matterResult.data,
    }
  })

  //resolve promise
  const portalsData = await Promise.all(
    allPortalsData.map(async item => {
      return item
    })
  )

  return portalsData
}

export function getAllPortalsIds() {
  const fileNames = fs.readdirSync(portalsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        portal: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getAllPostsId() {
  const data = await fetchAPI()

  const allPosts = data['all-data'].map(post => {
    return {
      params: {
        id: post.id,
        portal: post.portal
      }
    }
  })

  return allPosts

}

export async function getPostData(id){
  const res = await fetch(urlFetch, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.status >= 200 && res.status < 300) {
    const json = await res.json()

    const postSelected = json.filter(post => post.id === id)

    return postSelected[0]

  } else {

    console.error(res)
    return {
      error: true,
      message: res.statusText,
    }
  }
}

export async function fetchAPI() {
  const res = await fetch(urlFetch, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.status >= 200 && res.status < 300) {
    const json = await res.json()

    const valuesFilterByPortal = json.reduce((acc, imovel) => {

      const {
        usableAreas,
        address: {
          geoLocation: {
            location: lon, lat
          }
        },
        pricingInfos: {
          businessType, price, rentalTotalPrice, monthlyCondoFee
        }
      } = imovel

      const isEligible = lon !== 0 && lat !== 0

      const boundingBoxGrupoZAP = {
        minlon: -46.693419,
        minlat: -23.568704,
        maxlon: -46.641146,
        maxlat: -23.546686
      }

      if (isEligible) {

        const isBoundingBoxGrupoZAP = (lon >= boundingBoxGrupoZAP.minlon && lon <= boundingBoxGrupoZAP.maxlon) && (lat >= boundingBoxGrupoZAP.minlat && lat <= boundingBoxGrupoZAP.maxlat)

        if (businessType === 'RENTAL') {

          //regras de negócio para o aluguel dos imóveis
          const isMonthlyCondoFeeValidToVivaReal = typeof Number(monthlyCondoFee) === 'number' && Number(monthlyCondoFee) < percentage(Number(rentalTotalPrice), 30)
          const maxVivaRealRentalValue = isBoundingBoxGrupoZAP ? 4000 + percentage(4000, 50) : 4000
          const minRentalValueZapImoveis = 3500


          if (isMonthlyCondoFeeValidToVivaReal && Number(rentalTotalPrice) <= maxVivaRealRentalValue) {
            acc['viva-real'].push(imovel)
            acc['all-data'].push({
              portal: 'viva-real',
              ...imovel
            })
          } else if (Number(rentalTotalPrice) >= minRentalValueZapImoveis) {
            acc['zap-imoveis'].push(imovel)
            acc['all-data'].push({
              portal: 'zap-imoveis',
              ...imovel
            })
          }
        } else {

          //regras de negócio para a venda dos imóveis
          const isUsableAreasValidToZapImoveis = usableAreas > 0 && squareMetreValue(Number(price), usableAreas) > 3500
          const minPriceZapImoveis = isBoundingBoxGrupoZAP ? 600000 - percentage(600000, 10) : 600000
          const maxSaleValueVivaReal = 700000

          if (isUsableAreasValidToZapImoveis && Number(price) >= minPriceZapImoveis) {
            acc['zap-imoveis'].push(imovel)
            acc['all-data'].push({
              portal: 'zap-imoveis',
              ...imovel
            })
          } else if (Number(price) <= maxSaleValueVivaReal) {
            acc['viva-real'].push(imovel)
            acc['all-data'].push({
              portal: 'viva-real',
              ...imovel
            })
          }
        }
      }

      return acc
    }, {
        ['viva-real']: [],
        ['zap-imoveis']: [],
        ['all-data']: []
      })

    return {
      rows: {
        ['viva-real']: valuesFilterByPortal['viva-real'].length,
        ['zap-imoveis']: valuesFilterByPortal['zap-imoveis'].length,
      },
      ...valuesFilterByPortal
    }
  } else {

    console.error(res)
    return {
      error: true,
      message: res.statusText,
    }
  }
}
