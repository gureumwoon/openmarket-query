import { render, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import MainGrid from "../MainGrid"
import { productQuery } from "../../hooks/useProductQuery";
import { Product } from "../types/product";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";

// productQuery의 useGetProducts 모킹
jest.mock('../../hooks/useProductQuery');
const mockedUseGetProducts = jest.mocked(productQuery.useGetProducts);

jest.mock('../LazyLoading', () => {
    return ({ alt, src, onClick }) => {
        return <img alt={alt} src={src} onClick={onClick} data-testid='lazy-image' />
    }
});

// IntersectionObserver 모킹

const mockIntersectionObserver = class {

    private viewPort: Element | Document | null;
    private entries: Array<{ isIntersecting: boolean; target: Element }>;

    constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
        this.viewPort = options.root;
        this.entries = [];

        if (this.viewPort instanceof Element) {
            this.viewPort.addEventListener('scroll', () => {
                this.entries.forEach((entry) => {
                    entry.isIntersecting = this.isInViewPort(entry.target);
                });
                callback(this.entries as unknown as IntersectionObserverEntry[], this as unknown as IntersectionObserver);
            });
        }
    }

    isInViewPort(target: Element): boolean {
        return true;
    }

    observe(target: Element) {
        this.entries.push({ isIntersecting: false, target });
    }

    unobserve(target: Element) {
        this.entries.filter((ob) => ob.target !== target);
    }

    disconnect() {
        this.entries = [];
    }

    simulateCallback() {
        const callback = (window.IntersectionObserver as jest.Mock).mock.calls[0][0];
        callback(this.entries as IntersectionObserverEntry[], this);
    }
};

(window as any).IntersectionObserver = mockIntersectionObserver;


const mockProduct = {
    pages: [
        Array.from({ length: 15 }, (_, i) => ({
            product_id: i,
            image: `image_url${i}`,
            product_name: `Product ${i}`,
            store_name: `Stroe ${i}`,
            price: 1000 + i
        }))
    ],
};

describe('MainGrid', () => {

    beforeEach(() => {
        mockedUseGetProducts.mockReturnValue({
            data: {
                pages: mockProduct.pages,
                pageParams: [1],
            },
            hasNextPage: true,
            fetchNextPage: jest.fn(),
        } as unknown as UseInfiniteQueryResult<InfiniteData<Product[], unknown>, Error>);
    });

    it('when scrolled loaded more product item', async () => {
        const fetchNextPage = jest.fn();
        mockedUseGetProducts.mockReturnValue({
            data: {
                pages: mockProduct.pages,
                pageParams: [1],
            },
            hasNextPage: true,
            fetchNextPage: jest.fn(),
        } as unknown as UseInfiniteQueryResult<InfiniteData<Product[], unknown>, Error>);
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<MainGrid />} />
                </Routes>
            </MemoryRouter>
        );

        const observer = (window.IntersectionObserver as jest.Mock).mock.instances[0];

        console.log("스크롤", window.IntersectionObserver)
        const callback = observer.observe.mock.calls[0][0]
        callback([{ isIntersecting: true }]);

        await waitFor(() => {
            expect(fetchNextPage).toHaveBeenCalled();
        })
    })

})

// src/__tests__/MainGrid.test.tsx

// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import MainGrid from '../components/MainGrid';
// import { productQuery } from '../hooks/useProductQuery';

// // Mocking hooks
// jest.mock('../hooks/useProductQuery', () => ({
//   productQuery: {
//     useGetProducts: jest.fn(),
//   },
// }));

// const mockProduct: Product[] = [
//     {
//         product_id: 1,
//         product_name: 'camera',
//         store_name: 'store1',
//         seller: 1,
//         image: 'camera1.jpg',
//         price: 350000,
//         shipping_method: 'delivery',
//         shipping_fee: 5000,
//         stock: 5,
//         products_info: 'digital camera'
//     },
//     {
//         product_id: 2,
//         product_name: 'thumbler',
//         store_name: 'store2',
//         seller: 2,
//         image: 'thumbler.jpg',
//         price: 26000,
//         shipping_method: 'delivery',
//         shipping_fee: 2500,
//         stock: 13,
//         products_info: 'venti size thumbler'
//     }
// ]

// jest.mock('../hooks/use-infinitescroll', () => jest.fn());

// // Mocking LazyLoadingImage component
// jest.mock('../components/LazyLoading', () => {
//   return ({ src, onClick, alt }) => (
//     <img src={src} onClick={onClick} alt={alt} data-testid="lazy-image" />
//   );
// });

// const mockData = {
//   pages: [
//     [
//       { product_id: 1, image: 'image1.jpg', store_name: 'Store 1', product_name: 'Product 1', price: 1000 },
//       { product_id: 2, image: 'image2.jpg', store_name: 'Store 2', product_name: 'Product 2', price: 2000 },
//     ],
//   ],
// };

// describe('MainGrid', () => {
//   beforeEach(() => {
//     productQuery.useGetProducts.mockReturnValue({
//       data: mockData,
//       hasNextPage: true,
//       fetchNextPage: jest.fn(),
//     });
//   });

//   it('renders products correctly', () => {
//     render(
//       <MemoryRouter>
//         <MainGrid />
//       </MemoryRouter>
//     );

//     expect(screen.getByTestId('lazy-image')).toBeInTheDocument();
//     expect(screen.getByText('Store 1')).toBeInTheDocument();
//     expect(screen.getByText('Store 2')).toBeInTheDocument();
//     expect(screen.getByText('1,000')).toBeInTheDocument();
//     expect(screen.getByText('2,000')).toBeInTheDocument();
//   });

//   it('navigates to product detail on click', () => {
//     const { container } = render(
//       <MemoryRouter>
//         <MainGrid />
//       </MemoryRouter>
//     );

//     const productImage = screen.getByAltText('Product 1');
//     fireEvent.click(productImage);

//     // Add your assertions to check if navigate was called correctly
//     // This could involve using a mocked navigate function
//   });

//   it('fetches next page on scroll', async () => {
//     const { fetchNextPage } = productQuery.useGetProducts.mock.results[0].value;
//     const { container } = render(
//       <MemoryRouter>
//         <MainGrid />
//       </MemoryRouter>
//     );

//     const target = container.querySelector('div[ref]');
//     fireEvent.scroll(target, { target: { scrollY: 1000 } });

//     await waitFor(() => {
//       expect(fetchNextPage).toHaveBeenCalled();
//     });
//   });
// });