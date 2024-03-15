// 가격 단위로 콤마 생성
export const comma = (price: string) => {
    const priceValue = Number(price.replace(',', ''));
    return priceValue.toLocaleString()
}

// 가격 단위 해제하기
export const unComma = (price: string) => {
    const priceValue = Number(price.replace(',', ''));
    return priceValue
}
