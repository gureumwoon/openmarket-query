import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "../components/types/product";
import { apis } from "../shared/api";

export default function useProducts(finalId?: number) {
    const queryClient = useQueryClient();

    const getProducts = useInfiniteQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async ({ pageParam = 1 }) => { // pageParam의 형식을 직접 지정
            const response = await apis.getProduct(pageParam as number);
            return response.data.results;
        },
        getNextPageParam: (lastPage, pages): number | false => {
            const nextPage = pages.length + 1;
            return lastPage?.length === 0 ? false : nextPage;
        },
        initialPageParam: 1
    })

    const getProductItem = useQuery({
        queryKey: ['product', finalId],
        queryFn: async () => {
            const res = await apis.getOneProduct(finalId)
            return res.data
        },
        enabled: !!finalId // finalId가 존재하는 경우에만 쿼리를 활성화
    })

    return { getProducts, getProductItem }
}