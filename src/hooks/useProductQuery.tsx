import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apis } from "../shared/api";
import { Product, ProductDetail, SellerProduct } from "../components/types/product";

export const productQuery = {
    useGetProducts: () =>
        useInfiniteQuery<Product[]>({
            queryKey: ['products'],
            queryFn: async ({ pageParam = 1 }) => {
                const response = await apis.getProduct(pageParam as number);
                console.log('response', response)
                return response.data.results;
            },
            getNextPageParam: (lastPage, pages): number | false => {
                const nextPage = pages.length + 1;
                return lastPage?.length === 0 ? false : nextPage;
            },
            initialPageParam: 1,
            staleTime: 60 * 1000,
        }),
    useGetProductList: () =>
        useQuery({
            queryKey: ['allProduct'],
            queryFn: async () => {
                const promises = [];
                let page = 1;
                const response = await apis.getProduct(page);
                const count = response.data.count
                const totalPage = Math.ceil(count / 15)
                for (let page = 1; page <= totalPage; page++) {
                    promises.push(apis.getProduct(page))
                }
                const res = await Promise.all(promises);
                const products = res.flatMap(response => response.data.results);
                console.log(products)
                return products;
            },
            staleTime: 60 * 1000,
        }),
    useGetProductItem: (finalId: number) =>
        useQuery({
            queryKey: ['product', finalId],
            queryFn: async () => {
                const res = await apis.getOneProduct(finalId)
                return res.data
            },
            staleTime: 5 * 60 * 1000,
        }),
    useGetSellerProducts: () =>
        useQuery<SellerProduct[]>({
            queryKey: ['sellerProducts'],
            queryFn: async () => {
                const res = await apis.getSellerProduct()
                return res.data.results
            }
        }),
    useGetSearchProduct: (search: string) =>
        useQuery({
            queryKey: ['searchProduct'],
            queryFn: async () => {
                const res = await apis.searchProduct(search)
                const list = res.data.results
                const filterList = list.filter((p: ProductDetail) => search && p.product_name.replace(" ", "").toLocaleLowerCase().includes(search.toLocaleLowerCase().replace(" ", "")))
                return filterList
            },
            enabled: !!search,
            staleTime: 5 * 60 * 1000,
        }),
    useUploadProduct: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: async (formData: FormData) => {
                const res = await apis.addProduct(formData)
                return res.data.results
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['products'] })
            },
            onError: (error) => {
                console.log("상품업로드에러", error)
                throw error;
            }
        })
    },
    useModifyProduct: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: async ({ id, data }: { id: number, data: FormData }) => {
                const res = await apis.modifyProduct(id, data);
                return res.data
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['products'] })
            },
            onError: (error) => {
                console.log("상품수정에러", error);
                throw error;
            }
        })
    },
    useDeleteProduct: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: async (productId: number) => {
                await apis.deleteProduct(productId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['sellerProducts'] })
            }
        })
    }
}

