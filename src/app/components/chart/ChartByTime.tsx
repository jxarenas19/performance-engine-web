import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {dataChart} from "@/app/utils/data";


const ChartByTime = () => {

    return (
        <BarChart
            width={750}
            height={400}
            data={dataChart}
            margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 5,
            }}
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
    )
};

export default ChartByTime;
