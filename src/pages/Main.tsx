// components
import Banner from "../components/Banner"
import Footer from '../components/Footer'
import MainGrid from '../components/MainGrid'
import Nav from '../components/Nav'

function SellerMain() {
    const userType = localStorage.getItem("type")
    const isLogin = localStorage.getItem("token")

    return (
        <div>
            {userType === "SELLER" ?
                <Nav />
                :
                <Nav user_nav children={isLogin ? "마이페이지" : "로그인"} />
            }
            <Banner />
            <MainGrid />
            <Footer />
        </div>
    )
}

export default SellerMain