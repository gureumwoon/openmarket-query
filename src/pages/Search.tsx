import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import SearchGrid from '../components/SearchGrid'
import { apis } from '../shared/api'
import { ProductDetail } from "../components/types/product";
import { useQuery } from '@tanstack/react-query'

function Search() {
    const userType = localStorage.getItem("type")
    const isLogin = localStorage.getItem("token")
    const location = useLocation();
    const search = (location.state as { search: string }).search

    const { data: searchList } = useQuery({
        queryKey: ['searchProduct'],
        queryFn: async () => {
            const res = await apis.searchProduct(search)
            const list = res.data.results
            const filterList = list.filter((p: ProductDetail) => p.product_name.replace(" ", "").toLocaleLowerCase().includes(search.toLocaleLowerCase().replace(" ", "")))
            return filterList
        }
    })

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