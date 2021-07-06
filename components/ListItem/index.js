
import Link from 'next/link'
import utilStyles from '../../styles/utils.module.css'

const ListItem = ({ data, portal, page }) => {

  const { usableAreas, id, parkingSpaces, images, bathrooms, bedrooms, pricingInfos } = data
  const isSale = pricingInfos?.businessType === 'SALE'

  return (
    <li className={ utilStyles.listItem }>
      <Link href={ `/${portal}/post/${id}?page=${page ? page : '1'}` }>
        <a>
          { `Imóvel para ${isSale ? 'Venda' : 'Aluguel'}` }
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
        </a>
      </Link>
    </li>
  )
}


export default ListItem