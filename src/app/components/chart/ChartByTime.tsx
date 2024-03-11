import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {dataChart} from "@/app/utils/data";


const ChartByTime = () => {

    return (
        <ResponsiveContainer width="100%" height={200}>
        <BarChart
            data={dataChart}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="t_spent" stackId="a" fill="#144dfa" />
            <Bar dataKey="t_remaining" stackId="a" fill="#82ca9d" />
            <Bar dataKey="t_affectation" fill="#fa4614" />
        </BarChart>
        </ResponsiveContainer>
    )
};

export default ChartByTime;
