import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
// Components
import Nav from '../components/Nav';
import CartCheckBox from '../components/CartCheckBox';
import CartGrid from '../components/CartGrid';
import Footer from '../components/Footer';
// Element
import Button from '../elements/Button';
import DeleteIcon from '../assets/images/icon-delete.svg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apis } from '../shared/api';
import { productQuery } from '../hooks/useProductQuery';

function ShoppingCart() {
    const [checkList, setCheckList] = useState([])
    const [modal, setModal] = useState(0);
    const [isCheck, setIsCheck] = useState(false)
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = localStorage.getItem("token")

    // 페이지별 데이터 한번에 가져오기.
    const { data: productList } = productQuery.useGetProductList()

    // cartList 가져오기.
    const { data: carts, refetch: refetchCartList } = useQuery({
        queryKey: ['cartList'],
        queryFn: async () => {
            const res = await apis.getCart()
            return res.data.results
        }
    })

    // cartList 삭제하기
    const deleteCartList = useMutation({
        mutationFn: async () => {
            return await apis.deleteAllItem();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['cartList'] });
            await refetchCartList();
        },
    })

    // cartItem 삭제하기
    const deleteCartItem = useMutation({
        mutationFn: async (itemId) => {
            const res = apis.deleteItem(itemId)
            return res.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['cartList'] });
            await refetchCartList();
        }
    })

    const quantityList = carts?.map((q) => q.quantity)
    const cartId = carts?.map((c) => c.product_id)
    const checkedCart = carts?.filter((c, i) => checkList.includes(c.product_id))
    const item = productList?.filter((p, i) => cartId?.includes(p?.product_id))
    const checkedProduct = item?.filter((c, i) => checkList.includes(c.product_id))
    const checkCartItem = carts?.filter((p, i) => checkList.includes(p?.product_id))
    const checkCartItemId = checkCartItem?.map((c) => c.cart_item_id)

    const quantity = [];
    const price = [];
    const price2 = [];
    const shippingFee = [];

    const checkAllBox = (checked) => {
        if (checked) {
            const allCheck = []
            carts?.forEach((cartItem) => allCheck.push(cartItem.product_id))
            setCheckList(allCheck)
            setIsCheck(true)
        } else {
            setCheckList([])
            setIsCheck(false)
        }
    }

    const checkSingleBox = (checked, id) => {
        if (checked) {
            setCheckList([...checkList, id])
            setIsCheck(true)
        } else {
            setCheckList(checkList.filter((c) => c !== id))
            setIsCheck(false)
        }
    }

    checkedCart && checkedCart.map((c, i) =>
        quantity.push(checkedCart.length === 0 ? 0 : checkedCart[i].quantity)
    )

    checkCartItem && checkCartItem.map((p, i) =>
        price?.push(checkCartItem.length === 0 ? 0 : checkedProduct.find((c, i) => p.product_id === c.product_id)?.price)
    )

    // 제품의 가격을 cart리스트의 quantity(수량)만큼 곱해서 배열에 넣기
    for (let i = 0; i < checkedCart?.length; i++) {
        price2.push(quantity[i] * price[i])
    }

    // 장바구니에 들어있는 제품들 가격의 합계 구하기.
    const sum = price2.length !== 0 ? price2.reduce((acc, cur) =>
        acc + cur
    ) : 0

    // 배송 합계 구하기
    checkedProduct?.map((p) =>
        shippingFee.push(p.length === 0 ? 0 : p.shipping_fee)
    )

    const shippingFeeSum = shippingFee.length !== 0 ? shippingFee.reduce((acc, cur) => acc + cur) : 0

    // 장바구니 상품의 총액 
    const totalQuantity = []
    const totalPrice = []
    const totalPrice2 = []
    const totalShippingFee = []

    carts?.map((c, i) =>
        totalQuantity.push(c.quantity)
    )

    item?.map((p, i) =>
        totalPrice.push(item.find((a, i) => p.product_id === carts[i].product_id)?.price)
    )

    item?.map((p, i) =>
        totalShippingFee.push(item.find((a, i) => p.product_id === carts[i]?.product_id)?.shipping_fee)
    )

    for (let i = 0; i < carts?.length; i++) {
        totalPrice2.push(totalQuantity[i] * totalPrice[i])
    }

    const resultSum = sum + shippingFeeSum // 체크한 상품의 총액
    const totalSum = totalPrice2.length === 0 ? 0 : totalPrice2.reduce((acc, cur) => acc + cur)
    const totalShippingFeeSum = totalShippingFee.length === 0 ? 0 : totalShippingFee.reduce((acc, cur) => acc + cur)
    const resultSum2 = totalSum + totalShippingFeeSum // 장바구니 전체 상품의 총액
    const difference = resultSum2 - resultSum // 전체 상품의 총액과 선택한 상품 총액의 차

    const handleDeleteAll = () => {
        if (checkList.length === carts?.length) {
            deleteCartList.mutate();
        } else if (checkList.length === 0) {
            window.alert("삭제할 상품을 선택해주세요")
        }
        else {
            checkCartItemId.map((c) => deleteCartItem.mutate(c))
        }
    }

    const navigateToPayment = () => {
        if (checkList.length > 0) {
            navigate("/payment", {
                state: {
                    total_price: sum + shippingFeeSum,
                    order_kind: "cart_order",
                    checkCartItem,
                    checkedProduct,
                    item,
                    shipping_fee: shippingFeeSum,
                }
            })
        } else {
            window.alert("주문할 상품을 선택해주세요.")
        }
    }

    return (
        <div>
            <Nav
                user_nav
                children={isLogin ? "마이페이지" : "로그인"}
                color={location.state?.isCart ? "#21BF48" : "none"}
                filter={location.state?.isCart ? "invert(55%) sepia(42%) saturate(1617%) hue-rotate(89deg) brightness(100%) contrast(76%)" : "none"}
            />
            <Main>
                <h1>장바구니</h1>
                <div className='cart-nav'>
                    <CartCheckBox
                        margin="0 0 0 30px"
                        width="30%"
                        onChange={(e) => checkAllBox(e.target.checked)}
                        checked={checkList.length === carts?.length && 0 < checkList.length && 0 < carts?.length ? true : false}
                    />
                    <p>상품정보</p>
                    <p>수량</p>
                    <p>상품금액</p>
                    <img className="icon-delete" src={DeleteIcon} alt="" onClick={handleDeleteAll} />
                </div>
                {
                    carts && carts?.length === 0 ?
                        <div className='empty-cart'>
                            <p>장바구니에 담긴 상품이 없습니다.</p>
                            <p>원하는 상품을 장바구니에 담아보세요!</p>
                        </div> :
                        <>
                            {
                                carts && carts?.map((c, i) => {
                                    return <CartGrid
                                        key={c.product_id}
                                        {...c}
                                        item={item?.find((p, i) => c.product_id === p.product_id)}
                                        quantityList={quantityList[i]}
                                        quantity={quantity[i]}
                                        _onClickPlus={() => setModal(1)}
                                        _onClickMinus={() => setModal(1)}
                                        isCheck={isCheck}
                                        _onClick={() => setModal(2)}
                                        onChange={(e) => checkSingleBox(e.target.checked, c.product_id)}
                                        checked={checkList.includes(c.product_id) ? true : false}
                                        checkedProduct={checkedProduct}
                                        checkCartItem={checkCartItem}
                                        difference={difference}
                                        refetchCartList={refetchCartList}
                                    />
                                })
                            }
                            <CartGrid cart_sum_grid
                                sum={sum + shippingFeeSum}
                                shippingFeeSum={shippingFeeSum}
                            />
                            <Button
                                width="220px"
                                height="68px"
                                font_size="24px"
                                font_weight="bold"
                                margin="0 0 160px 0"
                                _onClick={navigateToPayment}
                            >
                                주문하기
                            </Button>
                        </>
                }
            </Main>
            <Footer />
        </div>
    )
}

const Main = styled.div`
    width: 100%;
    min-height: 573px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    h1 {
        font-size: 36px;
        margin: 54px 0 52px;
    }
    .cart-nav {
        position:relative;
        width: 1280px;
        height: 60px;
        background-color: #F2F2F2;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 35px;
        @media screen and (max-width:1320px) {
                width: 900px;
        }
        p {
            font-size: 18px;
            &:nth-child(2) {
                width: 20%;
                text-align: start;
            }
            &:nth-child(3) {
                text-align: end;
                width: 20%;
            }
            &:nth-child(4) {
                margin-right: 131px;
                width: 25%;
                text-align: end;
            }
        }
        img {
            position: absolute;
            right: 18px;
            cursor: pointer;
        }
    }
    .empty-cart {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
            &:first-child {
                margin: 100px 0 17px;
                font-size: 18px;
                font-weight: bold;
            }
            &:nth-child(2) {
                font-size: 14px;
                color: #767676;
            }
        }
    }
`

export default ShoppingCart