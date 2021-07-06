
import Link from 'next/link'
import CurrencyFormat from 'react-currency-format'
import { CURRENCY_CONFIG } from '../../utils/consts'
import utilStyles from '../../styles/utils.module.css'
import listItemStyles from './index.module.css'
import Galery from '../Galery'


const ListItem = ({ data, portal, page }) => {

  const { id, images, pricingInfos } = data
  const isSale = pricingInfos ?.businessType === 'SALE'

  return (
    <li className={ `${utilStyles.listItem} ${listItemStyles.listItemContainer}` }>
      <Galery images={ images } />
      <Link href={ `/${portal}/post/${id}?page=${page ? page : '1'}` }>
        <a className={ `${utilStyles.headingSm} ${listItemStyles.listItemContainerInfos}` }>
          <strong>{ `Imóvel para ${isSale ? 'Venda' : 'Aluguel'}` }</strong>
          <ul className={ `${utilStyles.list}` }>
            <li className={ utilStyles.lightText }>
              <strong>{ `${isSale ? 'Preço:' : 'Aluguel:'} ` }</strong>
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
            { pricingInfos ?.yearlyIptu && (
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
          </ul>
        </a>
      </Link>
    </li>
  )
}


export default ListItem
