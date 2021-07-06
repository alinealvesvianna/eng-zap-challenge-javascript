export function percentage(totalValue, perc) {
  return (totalValue * perc) / 100
}

export function squareMetreValue(imovelTotalValue, totalSquareMetre) {
  return imovelTotalValue / totalSquareMetre
}

export function pluralOrSingular(item){
  if(item > 1){
    return 's'
  }
  return ''
}