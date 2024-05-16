import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3' })

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    endpoints: (builder) => ({
        getCoinsList: builder.query({
            query: () => ({
                url: '/coins/list',
                method: 'get'
            })
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/coins/${id}`,
                method: 'get',
            })
        }),
        getCoinHistory: builder.query({
            query:(id='bitcoin',date='14-5-2024')=>({
                url:`https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}`,
                method:'get',
            })
        }),
        getCoinChart: builder.query({
            query:(vs_currency="usd",days=1)=>({
                url:`https:api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${vs_currency}&days=${days}`,
                method:'get',
            })
        }),
        getNftList: builder.query({
            query:()=>({
                url:`https://api.coingecko.com/api/v3/nfts/list`,
                method:'get',
            })
        }),
        getNftById:builder.query({
            query: (id)=>({
                url:`https://api.coingecko.com/api/v3/nfts/${id}`,
                method:'get',
            })
        }),
        search:builder.query({
            query:(query)=>({
                url:`https://api.coingecko.com/api/v3/search?query=${query}`,
                method:'get',
            })
        }),
        global:builder.query({
            query:()=>({
                url:`https://api.coingecko.com/api/v3/search?query=btc`,
                method:'get',
            })
        })
    })
})

export const {
    useGetCoinsListQuery,
    useGetUserByIdQuery,
    useGetCoinHistoryQuery,
    useGetCoinChartQuery,
    useGetNftListQuery,
    useGetNftByIdQuery,
    useSearchQuery,
    useGlobalQuery,
} = apiSlice