import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import SearchGrid from '../components/SearchGrid'
import { productQuery } from '../hooks/useProductQuery';

function Search() {
    const userType = localStorage.getItem("type")
    const isLogin = localStorage.getItem("token")
    const location = useLocation();
    const search = (location.state as { search: string }).search
    const { data: searchList } = productQuery.useGetSearchProduct(search)

    return (
        <div>
            {userType === "SELLER" ?
                <Nav />
                :
                <Nav user_nav children={isLogin ? "마이페이지" : "로그인"} />
            }
            <SearchGrid searchList={searchList} />
        </div>
    )
}

export default Search