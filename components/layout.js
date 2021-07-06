import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from './layout.module.css'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'

const name = 'Grupo Zap'
export const siteTitle = 'Grupo Zap'

export default function Layout({ children, home = false, portalName = '', link = null }) {

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {

    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)


    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [])

  return (
    <div className={ styles.container }>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://oimod.oi.com.br/" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index,follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta
          name="description"
          content="Esse desafio foi feito por Aline Alves Vianna para o Grupo Zap"
        />
        {/* Open Graph | Facebook */ }
        <meta name="og:title" content={ siteTitle } />
        <meta
          property="og:url"
          content="TROCAR"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Aqui eu coloco uma descrição bacana para o facebook"
        />
        <meta
          property="og:image"
          content="https://v.fastcdn.co/u/3854b641/30803296-0-imagem-share.jpg"
        />
        {/* Twitter */ }
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@TechGrupoZAP" />
        <meta
          name="twitter:title"
          content="Grupo Zap | Aqui eu coloco um título bacana pra compartilhar no twitter"
        />
        <meta
          name="twitter:description"
          content="Aqui eu coloco uma descrição bacana para o twitter"
        />
        <meta
          name="twitter:image"
          content="https://v.fastcdn.co/u/3854b641/30803296-0-imagem-share.jpg"
        />
      </Head>
      <Header home={ home } name={ name } portalName={ portalName } />
      {loading ? (
        <Loading />
      ) : (
        <>
          <main>{ children }</main>
          <Footer link={link} home={ home } />
        </>
      )}
    </div>
  )
}
