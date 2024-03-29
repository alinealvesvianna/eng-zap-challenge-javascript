import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getPortalsData } from '../lib/portals'
import Link from 'next/link'

function Button({ infos }) {
  const { contentHtml, link, color } = infos
  return (
    <Link href={link}>
      <a
        className={utilStyles.linkButton}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        style={{ background: color }}
      />
    </Link>
  )
}

export default function Home({ allPortalsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.lightText}`}>
        <p>Escolha qual plataforma deseja ver os imóveis:</p>
      </section>
      <section
        className={`${utilStyles.gridAuto} ${utilStyles.headingMd} ${utilStyles.marginTop2rem}`}
      >
        {allPortalsData.map(data => (
          <Button key={data.id} infos={data} />
        ))}
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPortalsData = await getPortalsData()
  return {
    props: {
      allPortalsData,
    },
  }
}
