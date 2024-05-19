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
        }),
        CoinSummary:builder.query({
            query:(id="bitcoin",vs_currency="usd",include_market_cap=true,include_24hr_vol=true,include_24hr_change=true,include_last_updated_at=true)=>({
                url:`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${vs_currency}&include_market_cap=${include_market_cap}&include_24hr_vol=${include_24hr_vol}&include_24hr_change=${include_24hr_change}&include_last_updated_at=${include_last_updated_at}`,
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
    useCoinSummaryQuery,
} = apiSlice