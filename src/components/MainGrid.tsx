import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import useInfiniteScroll from '../hooks/use-infinitescroll';
import LazyLoadingImage from './LazyLoading';
import PlaceholderImg from '../assets/images/placeholderImg.svg';
import useProducts from '../hooks/useProducts';

function MainGrid() {
    const navigate = useNavigate()
    const { getProducts: { data, fetchNextPage, hasNextPage } } = useProducts();

    const target = useInfiniteScroll({
        hasNextPage,
        fetchNextPage,
    })

    return (
        <Container>
            {
                data?.pages.flat().map((p, i) => {
                    return <div key={p?.product_id}>
                        <LazyLoadingImage
                            src={p?.image}
                            onError={(e: React.ChangeEvent<HTMLImageElement>) => {
                                e.target.onerror = null; // 에러 핸들러 무한 루프 방지
                                e.target.src = p.image // 이미지 로드 실패 시 p.image 사용
                                e.target.width = 380;
                                e.target.height = 380;
                            }}
                            alt={p?.product_name}
                            onClick={() => navigate(`/detail/${p?.product_id}`)}
                            placeholderImg={PlaceholderImg}
                        />
                        <p className='product-name'>{p?.store_name}</p>
                        <p className='product'>{p?.product_name}</p>
                        <span className='product-price'>{p?.price?.toLocaleString()}</span>
                        <span>원</span>
                    </div>
                })
            }
            {hasNextPage ? <div ref={target}></div> : null}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns:repeat(3,380px);
    justify-content: center;
    gap: 70px;
    padding: 80px 0 180px;
    @media screen and (max-width:1300px) {
    grid-template-columns:repeat(2,380px);
}
    @media screen and (max-width:932px) {
        grid-template-columns:repeat(1,380px);
    }
    div {
        cursor: pointer;
    }
    img {
        margin-bottom: 16px;
        /* border: 1px solid #C4C4C4; */
        border-radius: 10px;
        /* width: 380px; */
        height: 380px;
    }
    .product-name {
        font-size: 16px;
        color: #767676;
    }
    .product {
        font-size: 18px;
        margin: 10px 0;
    }
    .product-price {
        font-size: 24px;
        font-weight: bold;
    }
`

export default MainGrid