import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "../components/types/product";
import { apis } from "../shared/api";

export default function useProducts() {
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

    return { getProducts }
}