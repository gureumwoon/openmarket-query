import { useLocation } from 'react-router-dom';
// Components
import styled from "styled-components";
import DeliveryInfo from '../components/DeliveryInfo';
import Nav from '../components/Nav'
import PaymentGrid from '../components/PaymentGrid';
import { CartDetail, Product } from '../components/types/product';

interface RouterState {
    order_kind: string;
    shipping_fee: number;
    total_price: number;
    difference: number;
    quantity: number;
    product_id: number;
    item: Product | undefined;
    checkedProduct: Product[];
    checkCartItem: CartDetail[];
}

function Payment() {
    const isLogin = localStorage.getItem("token")
    const location = useLocation();
    const state = location.state as RouterState;
    const orderKind = state.order_kind
    const sum = state.total_price

    return (
        <div>
            <Nav user_nav children={isLogin ? "마이페이지" : "로그인"} />
            <Main>
                <h1>주문/결제하기</h1>
                <PaymentNav>
                    <p className='product-info'>상품정보</p>
                    <div className='product-price'>
                        <p>할인</p>
                        <p>배송비</p>
                        <p>주문금액</p>
                    </div>
                </PaymentNav>
                {
                    orderKind === "direct_order" || orderKind === "cart_one_order" ?
                        <PaymentGrid
                            item={state.item}
                            quantity={state.quantity}
                            order_kind={orderKind}
                        /> : null
                }
                {
                    orderKind === "cart_order" &&
                    state.checkCartItem.map((cartItem, i) => {
                        return <PaymentGrid
                            key={cartItem.product_id}
                            {...cartItem}
                            item={state.checkedProduct.find((p) => cartItem.product_id === p.product_id)}
                            order_kind={orderKind}
                        />
                    })
                }
                <div className='price-sum'>
                    <p>총 주문금액</p>
                    <p>{sum.toLocaleString()}원</p>
                </div>
                <DeliveryInfo
                    shipping_fee={state.shipping_fee === 0 ? 0 : state.shipping_fee}
                    price={state.total_price - state.shipping_fee}
                    quantity={state.quantity}
                    product_id={state.product_id}
                    order_kind={state.order_kind}
                    difference={state.difference}
                />
            </Main>

        </div >
    )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width:1300px) {
    width: 800px;
    margin: 0 auto;
    }
  h1 {
    margin: 54px 0 52px;
    font-size: 36px;
  }
  .price-sum {
    margin: 30px 0 96px;
    display: flex;
    align-items: center;
    width: 1280px;
    justify-content: flex-end;
    @media screen and (max-width:1300px) {
        width: 100%;
    }
    p {
        &:first-child {
            font-size: 18px;
            font-weight: 500;
            margin-right: 10px;
        }
        &:nth-child(2) {
            font-size: 24px;
            font-weight: 700;
            color: #EB5757;
        }
    }
  }
`
const PaymentNav = styled.nav`
    width: 1280px;
    height: 60px;
    border-radius: 10px;
    background-color: #F2F2F2;
    display: flex;
    align-items: center;
    @media screen and (max-width:1300px) {
        width: 100%;
    }
    p {
        width: calc(50%/3);
        font-size: 18px;
        text-align: center;
        @media screen and (max-width:1300px) {
        width: 100%;
    }
    }
    .product-info {
        width: 50%;
        text-align: center;
    }
    .product-price {
        display: flex;
        width: 50%;
        justify-content: space-around;
    }
`

export default Payment