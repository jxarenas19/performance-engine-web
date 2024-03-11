import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { ClockCircleOutlined, HourglassOutlined, FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface StatisticItem {
    title: string;
    value: number | string;
    icon: React.ReactNode;
}

const StatisticsCard: React.FC = () => {
    const statistics: StatisticItem[] = [
        { title: 'Tiempo Trabajado', value: '8h', icon: <ClockCircleOutlined /> },
        { title: 'Tiempo por Trabajar', value: '2h', icon: <HourglassOutlined /> },
        { title: 'Tiempo Afectado', value: '1h', icon: <FrownOutlined /> },
        { title: 'Tiempo Perdido', value: '0.5h', icon: <SmileOutlined /> },
        { title: 'Tiempo Perdido2', value: '0.7h', icon: <SmileOutlined /> },
        { title: 'Tiempo Perdido3', value: '0.9h', icon: <SmileOutlined /> }
    ];
    const data = [
        { semana: 'Semana 1', score: 400 },
        { semana: 'Semana 2', score: 300 },
        { semana: 'Semana 3', score: 500 },
        { semana: 'Semana 4', score: 200 },
    ];
    return (
        <div>
            <Row gutter={16}>
                <Col span={16}>
                    <Card bordered={false} className="criclebox">
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={data}>
                                <XAxis dataKey="semana"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="score" fill="#8884d8"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col span={8}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Card bordered={false} className="criclebox">
                                <Statistic title={statistics[2].title} value={statistics[2].value}
                                           prefix={statistics[2].icon}/>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card bordered={false} className="criclebox">
                                <Statistic title={statistics[3].title} value={statistics[3].value}
                                           prefix={statistics[3].icon}/>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default StatisticsCard;
