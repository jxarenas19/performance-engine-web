import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import { ClockCircleOutlined, HourglassOutlined, FrownOutlined, SmileOutlined } from '@ant-design/icons';

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

    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <Card bordered={false} className="criclebox ">
                        <Statistic title={statistics[0].title} value={statistics[0].value} prefix={statistics[0].icon} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} className="criclebox ">
                        <Statistic title={statistics[1].title} value={statistics[1].value} prefix={statistics[1].icon} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} className="criclebox ">
                        <Statistic title={statistics[4].title} value={statistics[4].value} prefix={statistics[4].icon} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={8}>
                    <Card bordered={false} className="criclebox ">
                        <Statistic title={statistics[2].title} value={statistics[2].value} prefix={statistics[2].icon} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} className="criclebox ">
                        <Statistic title={statistics[3].title} value={statistics[3].value} prefix={statistics[3].icon} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false} className="criclebox ">
                        <Statistic title={statistics[5].title} value={statistics[5].value} prefix={statistics[5].icon} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StatisticsCard;
