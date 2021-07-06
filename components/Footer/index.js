import Link from 'next/link'
import footerStyles from './index.module.css'

const Footer = ({ home = false, link = null }) => {
  if (!home) {
    return (
      <div className={ footerStyles.backToHome }>
        <Link href={link ? link : '/'}>
          <a>{`← Volte para ${link ? 'lista de imóveis' : 'página inicial'}`}</a>
        </Link>
      </div>
    )
  }
  return null

}

export default Footer
