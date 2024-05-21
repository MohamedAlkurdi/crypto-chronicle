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

const CoinChart = ({coinIdProp}) => {
    const vs_currency = useSelector(state => state.generalData.vs_currency);
    const chartTimeSlice = useSelector(state => state.chartSlice.chartTimeSlice)
    const [requestParameters, setRequestParameters] = useState({coinId:'bitcoin', vs_currency: vs_currency, days: 30 });
    const [chartData, setChartData] = useState(fakeChartsData);
    const chartDivision = useSelector(state => state.chartSlice.chartDetails)

    useEffect(() => {
        setRequestParameters(prev => ({ ...prev,coinId:coinIdProp, vs_currency: vs_currency,days:chartTimeSlice }));
    }, [vs_currency,chartTimeSlice]);

    const { data, error, isLoading, isSuccess } = useGetCoinChartQuery(requestParameters);

    useEffect(() => {
        if (isSuccess) {
            setChartData(prepareChartData(data.prices,chartDivision));
        }
    }, [isSuccess, data,chartDivision]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={300}
                height={300}
                data={chartData}
                margin={{ right: 60, left: 60 }}
            >
                <YAxis />
                <XAxis dataKey="date" />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#34495E"
                    fill="#34495E"
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

export default CoinChart;
