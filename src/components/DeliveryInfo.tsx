import { useState } from 'react'
import styled from "styled-components";
import { Address } from 'react-daum-postcode';
import { PaymentItem } from './types/product';
// Component
import PostCodeModal from './PostCode';
//element
import Input from '../elements/Input';
import Button from '../elements/Button';
import { useMutation } from '@tanstack/react-query';
import { apis } from '../shared/api';

interface PaymentProps {
    shipping_fee: number;
    price: number;
    product_id: number;
    quantity: number;
    order_kind: string;
    difference?: number;
}

function DeliveryInfo(props: PaymentProps) {
    const { shipping_fee, price, product_id, quantity, order_kind } = props;

    const [orderer, setOrderer] = useState("");
    const [orderPhone, setOrderPhone] = useState("");
    const [orderPhone2, setOrderPhone2] = useState("");
    const [orderPhone3, setOrderPhone3] = useState("");
    const fullOrdererPhone = orderPhone ?? '' + orderPhone2 ?? '' + orderPhone3 ?? '';
    const [receiver, setReceiver] = useState("");
    const [phone, setPhone] = useState("");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [addressMessage, setAddressMessage] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    const fullPhoneNum = phone ?? '' + phone2 ?? '' + phone3 ?? '';
    const fullAddress = address ?? '' + detailAddress ?? '';
    const sumPrice = price + shipping_fee

    const addPayment = useMutation({
        mutationFn: async (data: PaymentItem) => {
            const res = await apis.directOrder(data)
            return res.data
        },
        onError: (error) => {
            console.log("바로구매에러", error)
            throw error;
        }
    })

    const handlePostCode = () => {
        setIsOpen(!isOpen)
    }

    const handleComplete = (data: Address) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setAddress(fullAddress)
        setZipcode(data.zonecode)
    }

    const paymentBtnCheck = () => {
        if (!isCheck || !receiver || !addressMessage || !detailAddress || !zipcode || !address || !paymentMethod || !orderer || fullOrdererPhone === "" || fullPhoneNum === "") {
            return true
        } else {
            return false
        }
    }

    const handlePayment = () => {
        const data: PaymentItem = {
            product_id: product_id,
            quantity: quantity,
            order_kind: order_kind,
            receiver: receiver,
            receiver_phone_number: fullPhoneNum,
            address: fullAddress,
            address_message: addressMessage,
            payment_method: paymentMethod,
            total_price: props.order_kind === "cart_one_order" || "direct_order" ? sumPrice : sumPrice + (props.difference ?? 0)
        }
        addPayment.mutate(data)
    }

    return (
        <Info>
            <p className='container-title'>배송정보</p>
            <OrderingPersonInfo>
                <p className="order-person">주문자 정보</p>
                <div className='order-name'>
                    <p>이름</p>
                    <Input
                        radius="none"
                        margin_top="0"
                        margin_bottom="0"
                        width="334px"
                        height="40px"
                        border="1px solid #C4C4C4"
                        borderColor="#C4C4C4"
                        borderBottomColor="#C4C4C4"
                        _onChange={(e) => setOrderer(e.target.value)}
                    />
                </div>
                <div className="order-phone">
                    <p className='cellphone'>휴대폰</p>
                    <div className='phone-input'>
                        <Input
                            radius="none"
                            width="80px"
                            height="40px"
                            margin_top="0"
                            margin_bottom="0"
                            borderColor="#C4C4C4"
                            borderBottomColor="#C4C4C4"
                            _onChange={(e) => setOrderPhone(e.target.value)}
                        />
                        <p>-</p>
                        <Input
                            radius="none"
                            width="80px"
                            height="40px"
                            margin_top="0"
                            margin_bottom="0"
                            borderColor="#C4C4C4"
                            borderBottomColor="#C4C4C4"
                            _onChange={(e) => setOrderPhone2(e.target.value)}
                        />
                        <p>-</p>
                        <Input
                            radius="none"
                            width="80px"
                            height="40px"
                            margin_top="0"
                            margin_bottom="0"
                            borderColor="#C4C4C4"
                            borderBottomColor="#C4C4C4"
                            _onChange={(e) => setOrderPhone3(e.target.value)}
                        />
                    </div>
                </div>
                <div className="order-email">
                    <p>이메일</p>
                    <Input
                        radius="none"
                        margin_top="0"
                        margin_bottom="0"
                        width="334px"
                        height="40px"
                        border="1px solid #C4C4C4"
                        borderColor="#C4C4C4"
                        borderBottomColor="#C4C4C4"
                    />
                </div>
            </OrderingPersonInfo>
            <DeliveryInput>
                <p className="delivery-info">배송지 정보</p>
                <div className='recipient'>
                    <p>수령인</p>
                    <Input radius="none" margin_top="0" margin_bottom="0" width="334px" height="40px" border="1px solid #C4C4C4" borderColor="#C4C4C4" borderBottomColor="#C4C4C4" _onChange={(e) => setReceiver(e.target.value)} />
                </div>
                <div className="order-phone">
                    <p className='cellphone'>휴대폰</p>
                    <div className='phone-input'>
                        <Input
                            radius="none"
                            width="80px"
                            height="40px"
                            margin_top="0"
                            margin_bottom="0"
                            borderColor="#C4C4C4"
                            borderBottomColor="#C4C4C4"
                            _onChange={(e) => setPhone(e.target.value)}
                        />
                        <p>-</p>
                        <Input
                            radius="none"
                            width="80px"
                            height="40px"
                            margin_top="0"
                            margin_bottom="0"
                            borderColor="#C4C4C4"
                            borderBottomColor="#C4C4C4"
                            _onChange={(e) => setPhone2(e.target.value)}
                        />
                        <p>-</p>
                        <Input radius="none" width="80px" height="40px" margin_top="0" margin_bottom="0" borderColor="#C4C4C4" borderBottomColor="#C4C4C4" _onChange={(e) => setPhone3(e.target.value)} />
                    </div>
                </div>
                <div className='order-location'>
                    <p>배송주소</p>
                    <div className='location-input'>
                        <div className='postcode'>
                            <Input radius="none" width="170px" height="40px" margin_top="0" margin_bottom="0" borderColor="#C4C4C4" borderBottomColor="#C4C4C4" defaultValue={zipcode} />
                            <Button width="154px" height="40px" margin="0 0 0 10px" _onClick={handlePostCode}>우편번호 조회</Button>
                        </div>
                        <Input
                            radius="none"
                            width="800px"
                            width_screen="100%"
                            height="40px"
                            margin_top="0"
                            margin_bottom="0"
                            borderColor="#C4C4C4"
                            borderBottomColor="#C4C4C4"
                            defaultValue={address}
                        />
                        <Input
                            radius="none"
                            width="800px"
                            width_screen="100%"
                            height="40px"
                            margin_top="0"
                            margin_bottom="0"
                            borderColor="#C4C4C4"
                            borderBottomColor="#C4C4C4"
                            _onChange={(e) => setDetailAddress(e.target.value)}
                        />
                    </div>
                </div>
                {
                    isOpen &&
                    <>
                        <PostCodeModal
                            onComplete={handleComplete}
                        />
                    </>
                }
                <div className='delivery-message'>
                    <p>배송 메시지</p>
                    <Input
                        radius="none"
                        margin_top="0"
                        margin_bottom="0"
                        width="800px"
                        width_screen="100%"
                        height="40px"
                        border="1px solid #C4C4C4"
                        borderColor="#C4C4C4"
                        borderBottomColor="#C4C4C4"
                        _onChange={(e) => setAddressMessage(e.target.value)}
                    />
                </div>
            </DeliveryInput>
            <PaymentInfo>
                <div className='payment-option'>
                    <p className='container-title'>결제수단</p>
                    <div className='option'>
                        <label>
                            <input type="radio" name="payment-option" id="CARD" onChange={(e) => setPaymentMethod(e.target.id)} />
                            신용/체크카드
                        </label>
                        <label>
                            <input type="radio" name="payment-option" id="DEPOSIT" onChange={(e) => setPaymentMethod(e.target.id)} />
                            무통장 입금
                        </label>
                        <label>
                            <input type="radio" name="payment-option" id="PHONE_PAYMENT" onChange={(e) => setPaymentMethod(e.target.id)} />
                            휴대폰 결제
                        </label>
                        <label>
                            <input type="radio" name="payment-option" id="NAVERPAY" onChange={(e) => setPaymentMethod(e.target.id)} />
                            네이버페이
                        </label>
                        <label>
                            <input type="radio" name="payment-option" id="KAKAOPAY" onChange={(e) => setPaymentMethod(e.target.id)} />
                            카카오페이
                        </label>
                    </div>
                </div>
                <div className='final-payment'>
                    <p className='final-payment_txt'>최종결제 정보</p>
                    <div className='final-payment_info'>
                        <div className='payment-container_top'>
                            <div>
                                <p>-상품금액</p>
                                <p>
                                    <span>{price.toLocaleString()}</span>
                                    <span>원</span>
                                </p>
                            </div>
                            <div>
                                <p>-할인금액</p>
                                <p>
                                    <span>0</span>
                                    <span>원</span>
                                </p>
                            </div>
                            <div>
                                <div>
                                    <p>-배송비</p>
                                    <p>
                                        <span>{shipping_fee.toLocaleString()}</span>
                                        <span>원</span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p>-결제금액</p>
                                <p>{sumPrice.toLocaleString()}원</p>
                            </div>
                        </div>
                        <div className='payment-container_bottom'>
                            <div className='consent-check'>
                                <input type="checkbox" onChange={() => setIsCheck(!isCheck)} />
                                <p>주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.</p>
                            </div>
                            <Button
                                width="228px"
                                height="68px"
                                font_size="24px"
                                font_weight="700"
                                disabled={paymentBtnCheck()}
                                _onClick={handlePayment}
                            >
                                결제하기
                            </Button>
                        </div>
                    </div>
                </div>
            </PaymentInfo>
        </Info>
    )
}

const Info = styled.div`
    width: 1280px;
    @media screen and (max-width:1300px) {
        width: 100%;
    }
    .container-title {
        font-size: 24px;
        font-weight: 500;
        &::after {
            content: "";
            display: block;
            width: 100%;
            height: 2px;
            background-color: #C4C4C4;
            margin: 18px 0 40px;
        }
    }
`

const OrderingPersonInfo = styled.div`
    width: 100%;
    .order-person {
            font-size: 18px;
            font-weight: 500;
            &::after {
                content: "";
                display: block;
                width: 100%;
                height: 2px;
                background-color: #C4C4C4;
                margin-top: 8px;
            }
        }
    .order-name {
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #C4C4C4;
        padding: 8px 0;
        p {
            flex: 1;
            @media screen and (max-width:1300px) {
                flex: 2;
        }
    }
        label {
            flex: 9;
            @media screen and (max-width:1300px) {
                flex: 8;
        }
        }
    }
    .order-phone {
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #C4C4C4;
        padding: 8px 0;
        .cellphone {
            flex: 1;
            @media screen and (max-width:1300px) {
                flex: 2;
        }
        }
        .phone-input {
            display: flex;
            align-items: center;
            flex: 9;
            @media screen and (max-width:1300px) {
                flex: 8;
        }
            p {
                margin: 0 10px;
            }
        }
    }
    .order-email {
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #C4C4C4;
        padding: 8px 0;
        margin-bottom: 40px;
        p {
            flex: 1;
            @media screen and (max-width:1300px) {
                flex: 2;
        }
        }
        label {
            flex: 9;
            @media screen and (max-width:1300px) {
                flex: 8;
        }
        }
    }
`
const DeliveryInput = styled.div`
    width: 100%;
    .delivery-info {
        font-size: 18px;
        font-weight: 500;
        &::after {
            content: "";
            display: block;
            width: 100%;
            height: 2px;
            background-color: #C4C4C4;
            margin-top: 8px;
        }
    }
    .recipient {
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #C4C4C4;
        padding: 8px 0;
        p {
            flex: 1;
            @media screen and (max-width:1300px) {
                flex: 2;
        }
        }
        label {
            flex: 9;
            @media screen and (max-width:1300px) {
                flex: 8;
        }
        }
    }
    .order-phone {
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #C4C4C4;
        padding: 8px 0;
        .cellphone {
            flex: 1;
            @media screen and (max-width:1300px) {
                flex: 2;
        }
        }
        .phone-input {
            display: flex;
            align-items: center;
            flex: 9;
            @media screen and (max-width:1300px) {
                flex: 8;
        }
            p {
                margin: 0 10px;
            }
        }
    }
    .order-location {
        width: 100%;
        display: flex;
        align-items: flex-start;
        border-bottom: 1px solid #c4c4c4;
        padding: 8px 0;
        p {
            flex: 1;
            @media screen and (max-width:1300px) {
                flex: 2;
        }
        }
        .location-input {
            display: flex;
            flex-direction: column;
            flex: 9;
               @media screen and (max-width:1300px) {
                flex: 8;
        }
            label {
                &:nth-child(2) {
                    margin: 8px 0;
                }
            }
            .postcode {
                display: flex;
            }
        }
    }
    .delivery-message {
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #C4C4C4;
        padding: 8px 0;
        margin-bottom: 70px;
        p {
            flex: 1;
            @media screen and (max-width:1300px) {
                flex: 2;
        }
        }
        label {
            flex: 9;
            @media screen and (max-width:1300px) {
                flex: 8;
        }
        }
    }
`

const PaymentInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 100px;
    @media screen and (max-width:1300px) {
            display: flex;
            flex-direction: column;
    }
    .payment-option {
        width: 100%;
        margin-right: 40px;
        @media screen and (max-width:1300px) {
            margin-bottom: 70px;
        }
        .container-title {
        margin-bottom: -22px;
    }
        .option {
            padding-bottom: 18px;
            border-bottom: 1px solid #C4C4C4;
            label:nth-child(n+2):nth-child(-n+5) {
                input {
                    margin-left: 15px;
                }
            }
            input{
            margin-right: 10px;
        }
    }   
}
.final-payment {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
    .final-payment_txt {
        width: 480px;
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 18px;
        @media screen and (max-width:1300px) {
            text-align: left;
            margin-bottom: 50px;
        }
    }
    .final-payment_info {
        width: 480px;
        height: 400px;
        border: 2px solid #21bf48;
        border-radius: 10px;
        overflow: hidden;
        @media screen and (max-width:1300px) {
            margin: 0 auto;
        }
        .payment-container_top {
            width: 100%;
            height: 218px;
            padding: 34px 30px 0;
            div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                &:nth-child(n+2):nth-child(-n+3) {
                    margin-top: 12px;
                }
                &:nth-child(3) {
                    display: flex;
                    flex-direction: column;
                    div {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                    }
                    &::after {
                        content: "";
                        display: block;
                        width: 100%;
                        height: 1px;
                        background-color: #C4C4C4;
                        margin: 18px 0 24px;
                    }
                }
                &:nth-child(4){
                    p:last-child {
                        color: #EB5757;
                        font-size: 24px;
                        font-weight: 700;
                    }
                }
                p>span:first-child {
                    font-size: 18px;
                    font-weight: 700;
                    margin-right: 4px;
                }
                p>span:nth-child(2) {
                    font-size: 14px;
                    color: #767676;
                }
            }
        }
        .payment-container_bottom {
            width: 100%;
            height: 182px;
            background-color: #F2F2F2;
            padding: 32px 30px 34px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .consent-check {
                display: flex;
                width: 100%;
                align-items: center;
                margin-bottom: 32px;
                input {
                    margin-right: 10px;
                }
            }
        }
    }
}
`

export default DeliveryInfo