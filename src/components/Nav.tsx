import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { useNavigate } from "react-router-dom";
import { apis } from '../shared/api';
import styled from "styled-components";
// Component
import UserModal from './UserModal';
// elements
import Button from "../elements/Button";
import Input from "../elements/Input";
// assets
import Hodu from "../assets/images/Nav-hodu.png";
import UserIcon from "../assets/images/icon-user.svg";
import Cart from "../assets/images/icon-shopping-cart.svg";
import ShoppingIcon from "../assets/images/icon-shopping-bag.svg";

interface NavProps {
    seller_nav?: boolean;
    user_nav?: boolean;
    children?: React.ReactNode;
    filter?: string;
    color?: string;
    search?: string;
    _onClick?: () => void;
    _onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Nav(props: NavProps) {
    const { seller_nav, user_nav, children, filter, color } = props;

    const isLogin = localStorage.getItem("token")
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState("");

    const handleLogOut = () => {
        apis.signOut()
            .then(() => {
                localStorage.clear()
                window.location.assign("/")
            })
            .catch((error) => {
                console.log("로그아웃에러", error)
            })
    }

    const handleSearchEnter = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            handleSearch()
            console.log(e)
        }
    }

    const handleSearch = () => {
        navigate(`/search?query=${search}`, {
            state: {
                search
            }
        })
    }

    if (seller_nav) {
        return (
            <SellerNavigation>
                <div onClick={() => navigate("/")}>
                    <img style={{ width: "80px", height: "24px" }} src={Hodu} alt="Logo" />
                </div>
                <h1>판매자 센터</h1>
            </SellerNavigation>
        )
    }
    if (user_nav) {
        return (
            <Navigation>
                <div>
                    <h1 onClick={() => navigate("/")}>
                        <img src={Hodu} alt="Logo" />
                    </h1>
                    <Input
                        nav_input
                        placeholder="상품을 검색해보세요!"
                        defaultValue={props.search}
                        _onChange={(e) => setSearch(e.target.value)}
                        _onClick={handleSearch}
                        _onKeyUp={(e: KeyboardEvent<HTMLElement>) => handleSearchEnter(e)}
                    />
                </div>
                <div>
                    <div className='navigate-cart' onClick={() => navigate("/cart", {
                        state: {
                            isCart: true
                        }
                    })}>
                        <img src={Cart} alt="mypage-button" style={{ filter: `${filter}` }} />
                        <p style={{ color: `${color}` }}>장바구니</p>
                    </div>
                    <div className="my-page" onClick={() => { isLogin ? setModal(!modal) : navigate("/login") }}>
                        <img src={UserIcon} alt="mypage-button" style={{ filter: `${modal === true ? "invert(55%) sepia(42%) saturate(1617%) hue-rotate(89deg) brightness(100%) contrast(76%)" : "none"}` }} />
                        <p style={{ color: `${modal === true ? "#21BF48" : "#767676"}` }}>{children}</p>
                        {
                            isLogin ?
                                modal === true ? <UserModal _onClick={handleLogOut} modal_top="95px" /> : null
                                : null
                        }
                    </div>
                </div>
            </Navigation>
        )
    }
    return (
        <Navigation>
            <div className='container-search'>
                <h1 onClick={() => navigate("/")}>
                    <img src={Hodu} alt="Logo" />
                </h1>
                <Input
                    nav_input
                    placeholder="상품을 검색해보세요!"
                    defaultValue={props.search}
                    _onChange={(e) => setSearch(e.target.value)}
                    _onClick={handleSearch}
                />
            </div>
            <div className='container-userIcon'>
                <div className='seller-mypage' onClick={() => setModal(!modal)}>
                    <img src={UserIcon} alt="mypage-button" style={{ filter: `${modal === true ? "invert(55%) sepia(42%) saturate(1617%) hue-rotate(89deg) brightness(100%) contrast(76%)" : "none"}` }} />
                    <p style={{ color: `${modal === true ? "#21BF48" : "#767676"}` }}>마이페이지</p>
                    {
                        isLogin ?
                            modal === true ? <UserModal _onClick={handleLogOut} modal_top="80px" /> : null
                            : null
                    }
                </div>
                <Button src={ShoppingIcon} seller_nav_button _onClick={() => navigate("/seller-center")}>판매자센터</Button>
            </div>
        </Navigation >
    )
}

const Navigation = styled.nav`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 320px;
  box-shadow: 0px 4px 5px 0px #0000001A;
  @media screen and (max-width:1500px) {
    padding: 22px 30px;
    }
  div {
    display: flex;
    align-items: center;
  }
  h1 {
    margin-right: 30px;
    cursor: pointer;
  }
  .navigate-cart {
    display: flex;
    flex-direction: column;
    margin-right: 26px;
    cursor: pointer;
  }
  a , .my-page{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 30px;
    cursor: pointer;
  }
    p {
      font-size: 12px;
      color: #767676;
    }
    .container-userIcon {
        position: relative;
        .seller-mypage {
            display: flex;
            flex-direction: column;
            margin-right: 30px;
            cursor: pointer;
        }
    }
`

const SellerNavigation = styled.nav`
    width: 100%;
    height: 90px;
    box-shadow: 0px 4px 5px 0px #0000001A;
    padding: 26px 100px;
    display: flex;
    align-items: center;
    flex-direction: row;
    div {
        cursor: pointer;
    }
    img {
        margin-right: 16px;
    }
    h1 {
        font-size: 30px;
        font-weight: 500;
        line-height: 37.56px;
    }
`

export default Nav