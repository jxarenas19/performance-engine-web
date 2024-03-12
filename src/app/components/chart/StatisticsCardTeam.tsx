import React, { useContext } from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import {FieldTimeOutlined, StarOutlined, TeamOutlined, WarningOutlined} from '@ant-design/icons';
import { TracingContext } from "@/app/context/tracingContext";

interface TeamStatistics {
    name: string;
    t_spent: number;
    t_remaining: number;
    t_afectation: number;
    score: number;
}

const StatisticsCardTeam: React.FC = () => {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const { state } = context;

    // Suposición de cómo podrían estructurarse los datos de los equipos.
    // Necesitarás ajustar esto para que coincida con la estructura real de tus datos.
    const teamStatistics: TeamStatistics[] = [
        { name: 'Customer Support', t_spent: 10,t_remaining: 50, t_afectation: 20, score: 75 },
        { name: 'Editors', t_spent: 12,t_remaining: 60, t_afectation: 25, score: 80 },
        { name: 'Developers', t_spent: 8, t_remaining: 40, t_afectation: 15, score: 70 },
        { name: 'Designers', t_spent: 15, t_remaining: 75, t_afectation: 30, score: 85 },
    ];

    return (
        <div>
            <Row gutter={16}>
                {teamStatistics.map(team => (
                    <Col span={6} key={team.name}>
                        <Card bordered={false}>
                            <Statistic title={team.name} value={`Trabajadores: ${team.t_spent}`}
                                       prefix={<TeamOutlined/>}
                                       valueStyle={{fontSize: '10px'}}/>
                            <Statistic value={`Horas por trabajar: ${team.t_remaining}`}
                                       prefix={<FieldTimeOutlined/>}
                                       valueStyle={{fontSize: '10px'}}/>
                            <Statistic value={`Horas afectadas: ${team.t_afectation}`}
                                       prefix={<WarningOutlined/>}
                                       valueStyle={{fontSize: '10px'}}/>
                            <Statistic value={`Score: ${team.score}`}
                                       prefix={<StarOutlined/>}
                                       valueStyle={{fontSize: '10px'}}/>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default StatisticsCardTeam;