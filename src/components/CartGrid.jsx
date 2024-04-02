import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import CartCheckBox from './CartCheckBox';
import UserModal from './UserModal';
import Button from '../elements/Button';
//assets
import MinusIcon from "../assets/images/minus-icon_2.svg";
import PlusIcon from "../assets/images/plus-icon_2.svg";
import DeleteIcon from '../assets/images/icon-delete.svg';
import ModalPortal from '../helpers/Portal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apis } from '../shared/api';

function CartGrid(props) {
    const { cart_sum_grid, sum, shippingFeeSum, onChange, checked, isCheck, refetchCartList } = props;
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [modal, setModal] = useState(0);
    const [itemId, setItemId] = useState("");
    const [count, setCount] = useState(props.quantityList)

    // cartItem 삭제하기
    const deleteCartItem = useMutation({
        mutationFn: async (itemId) => {
            const res = apis.deleteItem(itemId)
            return res.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['cartList'] });
            await refetchCartList()
        }
    })

    // cartItem 수정하기
    const modifyCartItem = useMutation({
        mutationFn: async ({ cartItemId, itemData }) => {
            const res = await apis.modifyQuantity(cartItemId, itemData)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartList'] })
        },
        onError: (error) => {
            console.log("장바구니에러", error);
            throw error;
        }
    })

    console.log("modifyCartItem", modifyCartItem)

    const cartToPayment = () => {
        if (props.is_active === true && isCheck === true) {
            navigate("/payment", {
                state: {
                    item: props.checkedProduct[0],
                    product_id: props.checkedProduct[0].product_id,
                    quantity: props.checkCartItem[0].quantity,
                    order_kind: "cart_one_order",
                    total_price: (props.checkedProduct[0].price * props.checkCartItem[0].quantity) + props.checkedProduct[0].shipping_fee,
                    shipping_fee: props.item.shipping_fee,
                    difference: props.difference,
                }
            })
        } else if (isCheck === false) {
            window.alert("구매하실 상품을 선택해주세요.")
        }
        else if (props.is_active === false) {
            const itemData = {
                product_id: props.item.product_id,
                quantity: count,
                is_active: true,
                // item[i].product_id === cartList[i].product_id
            }
            modifyCartItem.mutate({ cartItemId: props.cart_item_id, itemData })
            navigate("/payment", {
                state: {
                    item: props.checkedProduct[0],
                    quantity: props.checkCartItem[0].quantity,
                    order_kind: "cart_one_order",
                    total_price: (props.checkedProduct[0].price * props.checkCartItem[0].quantity) + props.checkedProduct[0].shipping_fee,
                    shipping_fee: props.item.shipping_fee,
                }
            })
        }
    }

    if (cart_sum_grid) {
        return (
            <SumGrid>
                <div className='product-price'>
                    <div>
                        <p>총 상품금액</p>
                        <span>{(sum - shippingFeeSum).toLocaleString()}</span>
                        <span>원</span>
                    </div>
                    <img src={MinusIcon} alt="" />
                    <div>
                        <p>상품 할인</p>
                        <span>0</span>
                        <span>원</span>
                    </div>
                    <img src={PlusIcon} alt="" />
                    <div>
                        <p>배송비</p>
                        <span>{shippingFeeSum.toLocaleString()}</span>
                        <span>원</span>
                    </div>
                </div>
                <div className='price-sum'>
                    <p>결제 예정 금액</p>
                    <div>
                        <span>{sum.toLocaleString()}</span>
                        <span>원</span>
                    </div>
                </div>
            </SumGrid>
        )
    }
    return (
        <>
            {
                <Grid >
                    <CartCheckBox
                        margin="0 40px 0 30px"
                        onChange={onChange}
                        checked={checked}
                    />
                    <div className='cart-info'>
                        <img src={props.item?.image} alt="" />
                        <div className='info-text'>
                            <p>{props.item?.seller_store}</p>
                            <p>{props.item?.product_name}</p>
                            <p>{props.item?.price.toLocaleString()}</p>
                            <p>택배배송/ {props.item?.shipping_fee === 0 ? "무료배송" : props.item?.shipping_fee.toLocaleString()}</p>
                        </div>
                    </div>
                    <Button quantity_button margin="0 148px 0 0"
                        _onClickMinus={() => {
                            setModal(1)
                            setItemId(props.product_id)
                        }}
                        _onClickPlus={() => {
                            setModal(1)
                            setItemId(props.product_id)
                        }}
                    >
                        {
                            props.quantityList
                        }
                    </Button>
                    <div className='cart-price'>
                        <p>{(props.item?.price * props.quantityList).toLocaleString()}원</p>
                        <Button width="130px" height="40px" font_weight="500" _onClick={cartToPayment}>주문하기</Button>
                    </div>
                    <img className="icon-delete" src={DeleteIcon} alt="" onClick={() => setModal(2)} />
                    <ModalPortal>
                        {
                            itemId === props.product_id &&
                                modal === 1 ?
                                <UserModal modal_to_check
                                    children={count}
                                    _onClickMinus={() => {
                                        if (1 < count) {
                                            setCount(count - 1)
                                        }
                                    }}
                                    _onClickPlus={() => {
                                        if (count < props.item.stock) {
                                            setCount(count + 1)
                                        }
                                    }}
                                    btn_children_1="취소"
                                    btn_children_2="수정"
                                    margin="26px 0 0 0"
                                    _onClick={() => setModal(0)}
                                    _onClick2={() => {
                                        const itemData = {
                                            product_id: props.product_id,
                                            quantity: count,
                                            is_active: true, //isCheck,
                                        }
                                        console.log("itemData", itemData)
                                        modifyCartItem.mutate({ cartItemId: props.cart_item_id, itemData })
                                        setModal(0)
                                    }}
                                    _onClickBg={() => setModal(0)}
                                /> :
                                modal === 2 &&
                                <UserModal modal_to_check
                                    _disabled={true}
                                    children2="상품을 삭제하시겠습니까?"
                                    btn_children_1="취소"
                                    btn_children_2="확인"
                                    margin="40px 0 0 0"
                                    _onClick={() => setModal(0)}
                                    _onClick2={() => {
                                        deleteCartItem.mutate(props.cart_item_id)
                                        setModal(0)
                                    }}
                                    _onClickBg={() => setModal(0)}
                                />
                        }
                    </ModalPortal>
                </Grid>
                // })
            }
        </>
    )
}

const Grid = styled.div`
    width: 1280px;
    height: 200px;
    border: 2px solid #C4C4C4;
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    position: relative;
    @media screen and (max-width:1320px) {
        width: 900px;
    }
    .cart-info {
        display: flex;
        margin-right: 48px;
        align-items: center;
        @media screen and (max-width:1320px) {
            margin-right: 35px;
    }
        img {
        width: 160px;
        height: 160px;
        border-radius: 10px;
        margin-right: 36px;
    }
    .info-text {
        align-self: center;
        p {
            &:first-child {
                font-size: 14px;
                color: #767676;
                margin-bottom: 10px;
            }
            &:nth-child(2) {
                width: 418px;
                font-size: 18px;
                margin-bottom: 10px;
                @media screen and (max-width:1320px) {
                    width: 194.8px;
                }
            }
            &:nth-child(3) {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 40px;
            }
            &:nth-child(4) {
                font-size: 14px;
                color: #767676;
            }
        }
    }
    }
    .cart-price {
        margin-left: 138px;
        text-align: center;
        @media screen and (max-width:1320px) {
        margin-left: 35px;
    }
        p {
            font-size: 18px;
            font-weight: bold;
            color: #EB5757;
            margin-bottom: 26px;
        }
    }
    .icon-delete {
        position: absolute;
        top: 18px;
        right: 18px;
        cursor: pointer;
    }
`

const SumGrid = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1280px;
    height: 150px;
    background-color: #F2F2F2;
    border-radius: 10px;
    margin: 70px 0 40px;
    text-align: center;
    @media screen and (max-width:1320px) {
        width: 900px;
    }
    .product-price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 121px;
        margin-right: 229px;
        width: 100%;
        @media screen and (max-width:1320px) {
            margin: 0 90px;
        }
        div {
            p {
                margin-bottom: 12px;
            }
            span {
                &:nth-child(2) {
                    font-size: 24px;
                    font-weight: bold;
                }
            }
        }
    }
    .price-sum {
        margin-right: 91px;
        width: 238px;
        div {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 36px;
            font-weight: bold;
        }
        p {
            font-weight: bold;
            margin-bottom: 5px;
        }
        span {
            color: #EB5757;
            &:nth-child(2) {
                font-size: 36px;
                font-weight: bold;
            }
            &:nth-child(3) {
                font-size: 18px;
            }
        }
    }
`

export default CartGrid