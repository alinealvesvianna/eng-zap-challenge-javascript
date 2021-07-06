import Link from 'next/link'
import Image from 'next/image'
import utilStyles from '../../styles/utils.module.css'
import headerStyles from './index.module.css'

const Header = ({ home = false, name, portalName = '' }) => {
  const renderImage = () => {
    return (
      <Image
        priority
        src="/images/grupo-zap-header.png"
        className={ utilStyles.borderCircle }
        height={ home ? 144 : 108 }
        width={ home ? 144 : 108 }
        alt={ name }
      />
    )
  }

  const renderHeaderLogo = () => {
    if (!home) {
      return (
        <>
          <Link href="/">
            <a>{ renderImage() }</a>
          </Link>
          <h2 className={ utilStyles.headingLg }>
            <Link href="/">
              <a className={ utilStyles.colorInherit }>{ name }</a>
            </Link>
          </h2>
          {portalName && (
            <h3 className={ `${utilStyles.headingSm} ${utilStyles.notBold}` }>
              Esses anúncios são da { ' ' }
              <strong className={ `${utilStyles.capitalize} ${utilStyles.colorGrupoZap}` }>
                { portalName.split('-').join(' ') }
              </strong>
            </h3>
          )}
        </>
      )
    }
    return (
      <>
        { renderImage() }
        <h1 className={ `${utilStyles.heading2Xl} ${utilStyles.lightText}` }>{ name }</h1>
      </>
    )
  }

  return <header className={ headerStyles.header }>{ renderHeaderLogo() }</header>
}

export default Header
