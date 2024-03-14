import React, {useContext} from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {TracingContext} from "@/app/context/tracingContext";
import {Skeleton} from "antd";


const ChartByTime = () => {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    return (
        <>
        {state.isLoading ? (<Skeleton active />): (
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        data={state.chartByTime}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend payload={[
                            { value: 'Time employee', type: 'square', id: 't_spent', color: '#144dfa' },
                            { value: 'Time remaining', type: 'square', id: 't_remaining', color: '#82ca9d' },
                            { value: 'Time affectation', type: 'square', id: 't_affectation', color: '#fa4614' }
                        ]}/>
                        <Bar dataKey="t_spent" stackId="a" fill="#144dfa" />
                        <Bar dataKey="t_remaining" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="t_affectation" fill="#fa4614" />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </>
    )
};

export default ChartByTime;
