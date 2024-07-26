import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apis } from "../shared/api";
import { AddCart, ModifyCartQuantity } from "../components/types/product";

export const cartQuery = {
    useGetCart: () =>
        useQuery({
            queryKey: ['cartList'],
            queryFn: async () => {
                const res = await apis.getCart()
                return res.data.results
            },
            staleTime: 60 * 1000
        }),
    useDeleteCartList: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: async () => {
                return await apis.deleteAllItem();
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ['cartList'] });
            },
        })
    },
    useDeleteCartItem: () => {
        const queryClient = useQueryClient();
        const { refetch: refetchCartList } = cartQuery.useGetCart();
        return useMutation({
            mutationFn: async (itemId: number) => {
                const res = await apis.deleteItem(itemId)
                return res.data
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ['cartList'] });
                await refetchCartList();
            }
        })
    },
    useAddCartItem: (itemData: AddCart) => {
        const queryClient = useQueryClient();
        interface CustomError extends Error {
            response?: any;
        }
        return useMutation<AddCart, CustomError, AddCart>({
            mutationFn: async () => {
                const res = await apis.addCart(itemData)
                return res.data
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['cartList'] })
            },
            onError: (error) => {
                console.log("장바구니에러", error);
                if (error.response.status === 406) {
                    window.alert(error.response.data.FAIL_message);
                }
                throw error;
            }
        })
    },
    useModifyCartItem: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: async ({ cartItemId, itemData }: { cartItemId: number, itemData: ModifyCartQuantity }) => {
                const res = await apis.modifyQuantity(cartItemId, itemData)
                return res.data
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['cartList'] })
            },
            onError: (error) => {
                console.log("장바구니에러", error);
                throw error;
            }
        })
    }
}

