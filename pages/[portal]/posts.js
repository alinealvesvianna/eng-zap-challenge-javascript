import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import Pagination from '../../components/Pagination'
import ListItem from '../../components/ListItem'
import utilStyles from '../../styles/utils.module.css'
import { getAllPortalsIds, fetchAPI } from '../../lib/portals'

const limit = 20

function PortalList({ allPostsData }) {

  const router = useRouter()
  const {
    query: {
      portal,
      page
    }
  } = router

  const [paginateData, setPaginateData] = useState([])


  useEffect(() => {

    if (page) {
      const initialPostion = (+page - 1) * limit
      const finalPosition = +page * limit
      const sliceData = allPostsData?.[portal]?.slice(initialPostion, finalPosition)

      setPaginateData(sliceData)

    } else {

      const sliceData = allPostsData?.[portal]?.slice(0, limit)

      setPaginateData(sliceData)
    }

  }, [page])

  const renderListResult = () => {
    const { rows } = allPostsData

    return (
      <>
        <h3 className={`${utilStyles.centerText} ${utilStyles.colorGrupoZap}`}>{ `Resultado de ${rows[portal]} imóveis` }</h3>
        <ul className={ utilStyles.list }>
          { paginateData.map((data) => (
            <ListItem key={ data.id } data={ data } portal={ portal } page={page} />
          )) }
        </ul>
        <Pagination selected={ page } callbackPagination={ handlePagination } limit={ limit } rows={ rows[portal] } />
      </>
    )
  }

  const handlePagination = (e) => {
    router.push({
      query: { page: e.target.dataset.actual },
    })
  }

  const renderError = () => {
    return (
      <div>{ `Ops...Tivemos o seguinte problema: ${allPostsData.message}.` }</div>
    )
  }

  return (
    <Layout portalName={ portal }>
      <Head>
        <title>{ siteTitle }</title>
      </Head>
      <section className={ `${utilStyles.headingMd}` }>
        { allPostsData?.error && renderError() }
        { !!allPostsData?.[portal] ?.length && renderListResult() }
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPortalsIds()
  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps() {
  const res = await fetchAPI()
  return {
    props: {
      allPostsData: res,
    },
  }
}

export default PortalList