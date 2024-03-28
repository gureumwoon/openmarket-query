import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
//components
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import UserModal from '../components/UserModal';
//elements
import Button from '../elements/Button';
//helpers
import ModalPortal from '../helpers/Portal';
import { useMutation, useQueries } from '@tanstack/react-query';
import { apis } from '../shared/api';
import { AddCart, CartDetail } from '../components/types/product';

function ProductDetail({ queryClient }: any) {
    const { id } = useParams();
    const parsedId = id ? parseInt(id, 10) : undefined;
    const finalId = parsedId || 0;
    const navigate = useNavigate()
    const isLogin = localStorage.getItem("token")
    const userType = localStorage.getItem("type")

    const [quantity, setQuantity] = useState(1)
    const [modal, setModal] = useState(0);
    const [isActive, setIsActive] = useState(0)

    const tabMenu = ["버튼", "리뷰", "Q&A", "반품/교환정보"]
    const itemDupCheck = true;

    const results = useQueries({
        queries: [
            {
                queryKey: ['product', finalId],
                queryFn: async () => {
                    const res = await apis.getOneProduct(finalId)
                    return res.data
                },
            },
            {
                queryKey: ['cartList'],
                queryFn: async () => {
                    const res = await apis.getCart()
                    return res.data.results
                }
            }
        ]
    })

    const productQuery = results[0];
    const cartQuery = results[1];

    const product = productQuery.isLoading ? null : productQuery.data;
    const carts = cartQuery.isLoading ? null : cartQuery.data;

    interface CustomError extends Error {
        response?: any;
    }

    const itemData = {
        product_id: (product?.product_id ?? 0),
        quantity: quantity,
        check: itemDupCheck
    }
    const addCartItem = useMutation<AddCart, CustomError, AddCart>({
        mutationFn: async () => {
            const res = await apis.addCart(itemData)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'cartList' })
            setModal(3)
        },
        onError: (error) => {
            console.log("장바구니에러", error);
            if (error.response.status === 406) {
                window.alert(error.response.data.FAIL_message);
            }
            throw error;
        }
    })


    const handleMinus = () => {
        if (1 < quantity) {
            setQuantity(quantity - 1)
        }
    }

    const handlePlus = () => {
        if (quantity <= (product.stock ?? 0) - 1) {
            setQuantity(quantity + 1)
        }
    }

    const handleBuyItNow = () => {
        if (!isLogin) {
            setModal(2)
        } else {
            navigate("/payment", {
                state: {
                    item: product,
                    product_id: product.product_id,
                    quantity: quantity,
                    product_image: product.image,
                    product_name: product.product_name,
                    shipping_fee: product.shipping_fee,
                    store_name: product.store_name,
                    order_kind: "direct_order",
                    total_price: (product.price ?? 0 * quantity) + (product.shipping_fee ?? 0)
                }
            })
        }
    }

    const handleAddCart = () => {
        const cartItem = carts?.find((c: CartDetail) => c.product_id === finalId)
        const cartItemId = carts?.map((c: CartDetail) => c.product_id)
        if (!isLogin) {
            setModal(2)
        }
        if (cartItemId?.includes(product?.product_id ?? 0) && (cartItem?.quantity ?? 0) + quantity <= (product?.stock ?? 0)) {
            setModal(1)
        }
        else if (carts === null || !cartItemId?.includes(product?.product_id ?? 0) || (cartItem?.quantity ?? 0) + quantity > (product?.stock ?? 0)) {
            addCartItem.mutate(itemData)
        }
    }

    return (
        <div>
            {
                userType === "SELLER" ?
                    <Nav /> :
                    <Nav user_nav children={isLogin ? "마이페이지" : "로그인"} />
            }
            <SectionOne>
                <img src={product?.image} alt="" />
                <div className='container-right'>
                    <div className='info'>
                        <p>{product?.store_name}</p>
                        <p>{product?.product_name}</p>
                        <span className='info-price'>{product?.price?.toLocaleString()}</span>
                        <span>원</span>
                    </div>
                    <div className='info2'>
                        <p>택배배송/{product?.shipping_fee === 0 ? "무료배송" : product?.shipping_fee?.toLocaleString()}</p>
                        <Button
                            quantity_button
                            _onClickMinus={handleMinus}
                            _onClickPlus={handlePlus}
                        >{quantity}</Button>
                    </div>
                    <div className='info3'>
                        <p>총 상품 금액</p>
                        <div>
                            <p>총 수량 {quantity}개</p>
                            <span>{((product?.price ?? 0) * quantity)?.toLocaleString()}</span>
                            <span>원</span>
                        </div>
                    </div>
                    <div className='btn-container'>
                        <Button width="416px" height="60px" margin="0 14px 0 0" _disabled={userType === "SELLER" && true} _onClick={handleBuyItNow}>바로구매</Button>
                        <Button width="200px" height="60px" bg={userType === "SELLER" ? "#C4C4C4" : "#767676"} _disabled={userType === "SELLER" && true} _onClick={handleAddCart}>장바구니</Button>
                    </div>
                </div>
            </SectionOne>
            <SectionTwo>
                {
                    tabMenu.map((m, i) => {
                        return <Button key={i} tab_active_button active={isActive === i} _onClick={() => setIsActive(i)}>{m}</Button>
                    })
                }
            </SectionTwo>
            <Footer />
            <ModalPortal>
                {
                    modal === 1 ?
                        <UserModal modal_to_check
                            display="none"
                            children2="이미 장바구니에 있는 상품입니다."
                            children3="장바구니로 이동하시겠습니까?"
                            btn_children_1="아니오"
                            btn_children_2="예"
                            margin="40px 0 0 0"
                            _onClick={() => setModal(0)}
                            _onClick2={() => navigate('/cart')}
                            _onClickBg={() => setModal(0)}
                        /> :
                        modal === 2 ?
                            <UserModal modal_to_check
                                _disabled={true}
                                children2="로그인이 필요한 서비스입니다."
                                children3="로그인 하시겠습니까?"
                                btn_children_1="아니오"
                                btn_children_2="예"
                                margin="30px 0 0 0"
                                _onClick={() => setModal(0)}
                                _onClick2={() => {
                                    navigate("/login")
                                }}
                                _onClickBg={() => setModal(0)}
                            /> :
                            modal === 3 &&
                            <UserModal modal_to_check
                                display="none"
                                children2="장바구니에 추가되었습니다."
                                children3="장바구니로 이동하시겠습니까?"
                                btn_children_1="아니오"
                                btn_children_2="예"
                                margin="40px 0 0 0"
                                _onClick={() => setModal(0)}
                                _onClick2={() => navigate('/cart')}
                                _onClickBg={() => setModal(0)}
                            />
                }
            </ModalPortal>
        </div>
    )
}

const SectionOne = styled.div`
    width: 1250px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 80px auto 140px;
    @media screen and (max-width:1320px) {
        width: 100%;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    img {
        width: 600px;
        height: 600px;
        margin-right: 50px;
        @media screen and (max-width:1320px) {
        margin-right: 0;
    }
    }
    .container-right {
        width: 100%;
        display:flex;
        flex-direction: column;
        @media screen and (max-width:1320px) {
        width: 600px;
        margin-top: 60px;
    }
        .info {
            margin-bottom: 138px;
            p {
                &:first-child {
                    font-size: 18px;
                    color: #767676;
                    line-height: 23px;
                    margin-bottom: 16px;
                }
                &:nth-child(2) {
                    font-size: 36px;
                    line-height: 45px;
                    margin-bottom: 20px;
                }
            }
            span {
                &:nth-child(3) {
                    font-size: 36px;
                    font-weight: bold;
                    line-height: 45px;
                }
                &:nth-child(4) {
                    font-size: 18px;
                }
            }
            }
        .info2 {
            &::after {
                    display: block;
                    content: "";
                    width: 100%;
                    height: 2px;
                    background-color: #C4C4C4;
                    margin: 30px 0 32px;
                }
            p{
                color: #767676;
                line-height: 20px;
                &::after {
                    display: block;
                    content: "";
                    width: 100%;
                    height: 2px;
                    background-color: #C4C4C4;
                    margin: 20px 0 30px;
                }
            }
            .quantity-container {
                width: 150px;
                height: 50px;
                border: 1px solid #c4c4c4;
                display: flex;
                border-radius: 5px;
                align-items: center;
                div {
                    width: 50px;
                    height: 50px;
                    border-left: 1px solid #c4c4c4;
                    border-right:1px solid #c4c4c4;
                    text-align: center;
                    line-height: 50px;
                }
                button {
                    width: 50px;
                }
            }
        }
        .info3 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            p {
                font-size: 18px;
                font-weight: 500;
                line-height: 23px;
            }
            div {
                display: flex;
                p {
                    font-size: 18px;
                    line-height: 23px;
                    color: #767676;
                    align-self: center;
                    &::after {
                        display: inline-block;
                        content: "";
                        width: 2px;
                        height: 23px;
                        background-color: #C4C4C4;
                        vertical-align: bottom;
                        margin: 0 12px 0 11px;
                    }
                }
                span {
                    color:#21BF48;
                    &:nth-child(2) {
                        font-size: 36px;
                    }
                    &:nth-child(3) {
                        align-self: center;
                    }
                }
            }
        }
        .btn-container {
            display: flex;
        }
}
`

const SectionTwo = styled.div`
    width: 1280px;
    margin: 0 auto;
    display: flex;
    margin-bottom: 80px;
    @media screen and (max-width:1320px) {
        width: 600px;
    }
`

export default ProductDetail