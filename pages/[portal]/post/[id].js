import Head from 'next/head'
import CurrencyFormat from 'react-currency-format'
import { CURRENCY_CONFIG } from '../../../utils/consts'
import { pluralOrSingular } from '../../../utils/utilsCalcs'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import Galery from '../../../components/Galery'
import { getAllPostsId, getPostData } from '../../../lib/portals'
import utilStyles from '../../../styles/utils.module.css'

export default function Post({ postSelected }) {

  const router = useRouter()
  const {
    query: {
      portal,
      page
    }
  } = router

  const { usableAreas, parkingSpaces, images, bathrooms, bedrooms, pricingInfos } = postSelected


  const isSale = pricingInfos?.businessType === 'SALE'

  return (
    <Layout link={ `/${portal}/posts?page=${page !== 'undefined' ? page : `1`}` }>
      <Head>
        <title>{ postSelected.id }</title>
      </Head>
      <article>
        <h1 className={ `${utilStyles.headingLg} ${utilStyles.colorGrupoZap} ${utilStyles.centerText}` }>{ `Imóvel para ${isSale ? 'Venda' : 'Aluguel'}` }</h1>
        <Galery images={ images } />
        <ul>
          <li className={ utilStyles.lightText }>
            <strong>{ `${isSale ? 'Preço' : 'Aluguel'}: ` }</strong>
            { isSale ?
              (<CurrencyFormat
                value={ pricingInfos?.price }
                displayType={ CURRENCY_CONFIG.displayType }
                thousandSeparator={ CURRENCY_CONFIG.thousandSeparator }
                prefix={ CURRENCY_CONFIG.prefix }
              />)
              :
              (<CurrencyFormat
                value={ pricingInfos?.rentalTotalPrice }
                displayType={ CURRENCY_CONFIG.displayType }
                thousandSeparator={ CURRENCY_CONFIG.thousandSeparator }
                prefix={ CURRENCY_CONFIG.prefix }
              />)
            }

          </li>
          <li className={ utilStyles.lightText }>
            <strong>Condomínio: </strong>
            <CurrencyFormat
              value={ pricingInfos?.monthlyCondoFee }
              displayType={ CURRENCY_CONFIG.displayType }
              thousandSeparator={ CURRENCY_CONFIG.thousandSeparator }
              prefix={ CURRENCY_CONFIG.prefix }
            />
          </li>
          { pricingInfos?.yearlyIptu && (
            <li className={ utilStyles.lightText }>
              <strong>Iptu: </strong>

              <CurrencyFormat
                value={ pricingInfos?.yearlyIptu }
                displayType={ CURRENCY_CONFIG.displayType }
                thousandSeparator={ CURRENCY_CONFIG.thousandSeparator }
                prefix={ CURRENCY_CONFIG.prefix }
              />
            </li>
          )}
          <li className={ utilStyles.lightText }>
            { usableAreas } m²
            </li>
          <li className={ utilStyles.lightText }>
            { bathrooms } { `banheiro${pluralOrSingular(bathrooms)}` }
          </li>
          <li className={ utilStyles.lightText }>
            { parkingSpaces } { `vaga${pluralOrSingular(parkingSpaces)}` }
          </li>
          <li className={ utilStyles.lightText }>
            { bedrooms } { `quarto${pluralOrSingular(bedrooms)}` }
          </li>
        </ul>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllPostsId()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postSelected = await getPostData(params.id)
  return {
    props: {
      postSelected
    }
  }
}
