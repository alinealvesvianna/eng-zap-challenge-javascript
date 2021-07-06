import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import { getAllPostsId, getPostData } from '../../../lib/portals'
import utilStyles from '../../../styles/utils.module.css'

export default function Post({postSelected}) {

    const router = useRouter()
    const {
      query: {
        portal,
        page
      }
    } = router

    const { usableAreas, id, parkingSpaces, images, bathrooms, bedrooms, pricingInfos } = postSelected


    const isSale = pricingInfos?.businessType === 'SALE'

  return (
    <Layout link={`/${portal}/posts?page=${page !== 'undefined' ? page: `1`}`}>
       <Head>
        <title>{postSelected.id}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{ `Imóvel para ${isSale ? 'Venda' : 'Aluguel'}` }</h1>

        <ul>
            <li className={ utilStyles.lightText }>
              { `${isSale ? pricingInfos?.price : pricingInfos?.rentalTotalPrice}` } {`${isSale ? 'Preço' : 'Aluguel'}`}
            </li>
            <li className={ utilStyles.lightText }>
              condomínio { pricingInfos?.monthlyCondoFee }
            </li>
            {pricingInfos?.yearlyIptu && (
              <li className={ utilStyles.lightText }>
                Iptu { pricingInfos?.yearlyIptu }
              </li>
            )}
            <li className={ utilStyles.lightText }>
              { usableAreas } m2
            </li>
            <li className={ utilStyles.lightText }>
              { bathrooms } banheiros
            </li>
            <li className={ utilStyles.lightText }>
              { parkingSpaces } vagas
            </li>
            <li className={ utilStyles.lightText }>
              { bedrooms } quartos
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