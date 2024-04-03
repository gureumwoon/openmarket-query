import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

//components
import Nav from '../components/Nav'
import SellerCenterItem from '../components/SellerCenterItem';
//element
import Button from '../elements/Button';
//assets
import PlusIcon from "../assets/images/icon-plus.svg";
import { useQuery } from '@tanstack/react-query';
import { apis } from '../shared/api';
import { SellerProduct } from '../components/types/product';


function SellerCenter() {
    const navigate = useNavigate();

    // sellerProducts 가져오기.
    const { data: sellerProducts } = useQuery<SellerProduct[]>({
        queryKey: ['sellerProducts'],
        queryFn: async () => {
            const res = await apis.getSellerProduct()
            return res.data.results
        }
    })

    return (
        <div>
            <Nav seller_nav />
            <MainSection>
                <Header>
                    <div>
                        <p>대시보드</p>
                        <p>백엔드글로벌</p>
                    </div>
                    <Button src={PlusIcon} seller_nav_button _onClick={() => navigate("/upload")}>상품 업로드</ Button>
                </Header>
                <Section>
                    <div className='button-container'>
                        <Button seller_tab_button >판매중인 상품({sellerProducts?.length})</Button>
                        <Button seller_tab_button disabled={true} active={true}>주문/배송</Button>
                        <Button seller_tab_button disabled={true} active={true}>문의/리뷰</Button>
                        <Button seller_tab_button disabled={true}>통계</Button>
                        <Button seller_tab_button disabled={true}>스토어 설정</Button>
                    </div>
                    <div className='dash-board'>
                        <div className='info-nav'>
                            <p>상품정보</p>
                            <p>판매가격</p>
                            <p>수정</p>
                            <p>삭제</p>
                        </div>
                        {
                            sellerProducts?.map((p, i) => {
                                console.log("p", p)
                                console.log("p2", sellerProducts[i]?.product_id)
                                return <Fragment key={i}>
                                    <SellerCenterItem
                                        {...p}
                                    />
                                </Fragment>
                            })
                        }
                    </div>
                </Section>
            </MainSection>
        </div>
    )
}

const MainSection = styled.div`
    padding: 38px 100px 96px;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 42px;
    div {
        display: flex;
        p {
            &:first-child {
                margin-right: 16px;
                font-size: 36px;
                font-weight: bold;
            }
            &:nth-child(2){
                font-size: 36px;
                font-weight: 500;
                color: #21BF48;
            }
        }
    }
`
const Section = styled.div`
    display: flex;
    .button-container {
        display: flex;
        flex-direction: column;
        margin-right: 30px;
    }
    .dash-board {
        width: 1440px;
        height: 884px;
        border: 1px solid #c4c4c4;
        background-color: #F2F2F2;
        border-radius: 5px;
        .info-nav {
            width: 100%;
            height: 60px;
            background-color: #FFFF;
            display: flex;
            border-bottom: 1px solid #c4c4c4;
            align-items: center;
            text-align: center;
            p{
                font-size: 18px;
                &:first-child {
                    width: 50%;
                }
                &:nth-child(2) {
                    width: 30%;
                }
                &:nth-child(3) {
                    width: 10%;
                }
                &:nth-child(4) {
                    width: 10%;
                }
            }
        }
    }
`

export default SellerCenter