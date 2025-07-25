 export function MoneyFormat(price) {
    return(
        `$${(price/100).toFixed(2)}`
    )
  
}