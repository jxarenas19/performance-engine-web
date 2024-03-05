'use client'

import {Card, Col, Row, Tooltip} from "antd";
import React from "react";
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

const dataTimeSpentRemaining = [
    { name: 'January', t_spent: 400, t_remaining: 240 },
    { name: 'February', t_spent: 300, t_remaining: 139 },
    { name: 'March', t_spent: 200, t_remaining: 980 },
    { name: 'April', t_spent: 278, t_remaining: 390 },
];

const dataCreationUpdate = [
    { name: 'January', createdAt: 30, updatedAt: 20 },
    { name: 'February', createdAt: 20, updatedAt: 25 },
    { name: 'March', createdAt: 27, updatedAt: 23 },
    { name: 'April', createdAt: 18, updatedAt: 20 },
];

const dataAmount = [
    { name: 'Range 1', amount: 300 },
    { name: 'Range 2', amount: 100 },
    { name: 'Range 3', amount: 80 },
    { name: 'Range 4', amount: 160 },
];

const dataUserActivity = [
    { name: 'Usuario 1', activities: 400 },
    { name: 'Usuario 2', activities: 300 },
    { name: 'Usuario 3', activities: 300 },
    { name: 'Usuario 4', activities: 200 },
];

const dataTeamActivity = [
    { name: 'Equipo 1', activities: 1200 },
    { name: 'Equipo 2', activities: 1100 },
    { name: 'Equipo 3', activities: 600 },
];

const dataTimeVsImpact = [
    { t_spent: 100, t_affectation: 200, index: 1 },
    { t_spent: 300, t_affectation: 300, index: 2 },
    { t_spent: 500, t_affectation: 400, index: 3 },
    { t_spent: 700, t_affectation: 500, index: 4 },
];

export default function DashboardPage() {
    return (
        <div style={{ padding: '20px' }}>
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
                    <Card title="Creation and Update of Records">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dataCreationUpdate}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="createdAt" fill="#8884d8" />
                                <Bar dataKey="updatedAt" fill="#82ca9d" />
                            </BarChart>
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
                                <Pie dataKey="activities" isAnimationActive={false} data={dataUserActivity} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

        </div>
    );
};

