'use client'

import {Card, Col, Row, Skeleton, Tooltip} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from "recharts";
import {getDashboard} from "@/app/hooks/useTracingApi";
import {DashboardData} from "@/app/utils/types";
import {TracingContext} from "@/app/context/tracingContext";
import {useDasboard} from "@/app/context/DashboardContext";
import DashboardFilters from "@/app/components/DashboardFilters";


// const dataCreationUpdate = [
//     { name: 'January', createdAt: 30, updatedAt: 20 },
//     { name: 'February', createdAt: 20, updatedAt: 25 },
//     { name: 'March', createdAt: 27, updatedAt: 23 },
//     { name: 'April', createdAt: 18, updatedAt: 20 },
// ];
//
// const dataTeamActivity = [
//     { name: 'Equipo 1', activities: 1200 },
//     { name: 'Equipo 2', activities: 1100 },
//     { name: 'Equipo 3', activities: 600 },
// ];
//
// const dataTimeVsImpact = [
//     { t_spent: 100, t_affectation: 200, index: 1 },
//     { t_spent: 300, t_affectation: 300, index: 2 },
//     { t_spent: 500, t_affectation: 400, index: 3 },
//     { t_spent: 700, t_affectation: 500, index: 4 },
// ];

export default function DashboardPage() {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    const contextDashboard = useDasboard()
    if (!contextDashboard) throw new Error('DashboardContext must be used within DashboardProvider');
    const {stateDashboard, dispatchDashboard} = contextDashboard;

    const [dataAmount, setdataAmount] = useState([]);
    const [dataTimeSpentRemaining, setDataTimeSpentRemaining] = useState([]);
    const [dataTimeSpentRemainingByTeam, setDataTimeSpentRemainingByTeam] = useState([]);
    const [dataUserActivity, setDataUserActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDashboardData = async (): Promise<void> => {
        setIsLoading(true);
        const response:DashboardData = await getDashboard({
            page: 0,
            limit: 0,
            filters: [stateDashboard.filters]
        });
        setdataAmount(response.dataAmount)
        setDataTimeSpentRemaining(response.dataTimeSpentRemaining)
        setDataTimeSpentRemainingByTeam(response.dataTimeSpentRemainingByTeam)
        setDataUserActivity(response.dataUserActivity)
        setIsLoading(false);
    }
    useEffect(() => {
        if (state.isModalDashboardOpen) {

            fetchDashboardData();
        }
    }, [state.isModalDashboardOpen,stateDashboard.filters]);

    return (
        <>
            <DashboardFilters fetchDashboardData={fetchDashboardData}></DashboardFilters>
            <div style={{ padding: '20px' }}>
        {isLoading ? (<Skeleton active />): (
                <>
                <Row gutter={16}>
                <Col span={12}>
                    <Card title="Temporal Evolution: Time Spent vs Time Remaining">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={dataTimeSpentRemaining} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="t_spent" stroke="#8884d8" />
                                <Line type="monotone" dataKey="t_remaining" stroke="#82ca9d" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Time spent vs Remaining by team">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={dataTimeSpentRemainingByTeam} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="t_spent" stroke="#8884d8" />
                                <Line type="monotone" dataKey="t_remaining" stroke="#82ca9d" />
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Quantity Distribution">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dataAmount}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="amount" fill="#413ea0" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Activities per User">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie nameKey="name" dataKey="t_affectation" isAnimationActive={false} data={dataUserActivity} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
                </>
        )}
            

        </div>
        </>
    );
};

