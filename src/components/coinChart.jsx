'use client';

import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { useGetCoinChartQuery } from '../redux/API/apiSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const productSales = [
    {
        name: 'Jan',
        product1: 4000,
    },
    {
        name: 'Feb',
        product1: 3000,
    },
    {
        name: 'Mar',
        product1: 2000,
    },
    {
        name: 'Apr',
        product1: 2780,
    },
    {
        name: 'May',
        product1: 1890,
    },
    {
        name: 'Jun',
        product1: 2390,
    },
];

const AreaChartComponent = () => {
    const selector = useSelector(state => state.generalData.vs_currency);
    const [requestParameters, setRequestParameters] = useState({
        vs_currency: selector,
        days: 30,
    });
    const [chartData, setChartData] = useState([
        [
            "1",
            "5000",
        ],
        [
            "5",
            "6000",
        ],
        [
            "10",
            "7000",
        ],
        [
            "15",
            "3000",
        ],
        [
            "20",
            "4000",
        ],
        [
            "25",
            "5500",
        ],
        [
            "30",
            "5000",
        ],
    ])

    useEffect(() => {
        const updaterObject = requestParameters;
        updaterObject.vs_currency = selector;
        setRequestParameters(updaterObject)
    }, [selector])

    const fetchingChartData = useGetCoinChartQuery(requestParameters.vs_currency, requestParameters.days);

    useEffect(() => {
        // if(fetchingChartData.isSuccess){
        //     setChartData(fetchingChartData.data)
        if (fetchingChartData.isSuccess) {
            let length = fetchingChartData.data.prices.length;
            const gap = Math.ceil(length/10)
            let indecies = []
            for(let i=0;i<length;i+=gap){
                indecies.push(i);
            }
            indecies.push(length-1)
            const chartData = indecies.map((el)=>{
                return [moment(moment(fetchingChartData.data.prices[el][0]).format('YYYY-MM-DD HH:mm:ss')).format('MM-DD'),fetchingChartData.data.prices[el][1]];
            })
            console.log("chart data",chartData)
            // console.log("gap",gap)
            // console.log(fetchingChartData.data.prices)
            // console.log(moment(fetchingChartData.data.prices[0][0]).format('YYYY-MM-DD HH:mm:ss'))
            // console.log(moment(fetchingChartData.data.prices[10][0]).format('YYYY-MM-DD HH:mm:ss'))
            // console.log(moment(fetchingChartData.data.prices[50][0]).format('YYYY-MM-DD HH:mm:ss'))
            // console.log(moment(fetchingChartData.data.prices[100][0]).format('YYYY-MM-DD HH:mm:ss'))
            // console.log(moment(fetchingChartData.data.prices[150][0]).format('YYYY-MM-DD HH:mm:ss'))
            // console.log(moment(fetchingChartData.data.prices[200][0]).format('YYYY-MM-DD HH:mm:ss'))
            // console.log(moment(fetchingChartData.data.prices[length-1][0]).format('YYYY-MM-DD HH:mm:ss'))
            console.log('indecies:',indecies)
        }
    }, [fetchingChartData])

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={productSales}
                margin={{ right: 30 }}
            >
                <YAxis />
                <XAxis dataKey="name" />
                <CartesianGrid strokeDasharray="5 5" />
                {/* <Tooltip content={<CustomTooltip />} /> */}
                <Legend />
                <Area
                    type="monotone"
                    dataKey="product1"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    stackId="1"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">{label}</p>
                <p className="text-sm text-blue-400">
                    Product 1:
                    <span className="ml-2">${payload[0].value}</span>
                </p>
            </div>
        );
    }
};

export default AreaChartComponent;