export function formatCurrency(amount:number){
    return new Intl.NumberFormat('CLP',{
        style:'currency',
        currency:'CLP'
    }).format(amount)
}

export function toLowerFirstChar(str:string){
    return str.charAt(0).toLowerCase()
}