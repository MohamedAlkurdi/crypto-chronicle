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
import { prepareChartData } from '../modules/calculations';
import { fakeChartsData } from '../staticData';

const AreaChartComponent = () => {
    const selector = useSelector(state => state.generalData.vs_currency);
    const [requestParameters, setRequestParameters] = useState({vs_currency: selector,days: 30,});
    const [chartData, setChartData] = useState(fakeChartsData)

    useEffect(() => {
        const updaterObject = requestParameters;
        updaterObject.vs_currency = selector;
        setRequestParameters(updaterObject)
    }, [selector])

    const fetchingChartData = useGetCoinChartQuery(requestParameters.vs_currency, requestParameters.days);

    useEffect(() => {
        if (fetchingChartData.isSuccess) {
            setChartData(prepareChartData(fetchingChartData.data.prices));
        }
    }, [fetchingChartData])

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={300}
                height={300}
                data={chartData}
                margin={{ right: 60,left:60 }}
            >
                <YAxis />
                <XAxis dataKey="date" />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="price"
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
            <div className="p-4 bg-main flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">{label}</p>
                <p className="text-sm text-blue-400">
                    Price:
                    <span className="ml-2">${payload[0].value}</span>
                </p>
            </div>
        );
    }
};

export default AreaChartComponent;