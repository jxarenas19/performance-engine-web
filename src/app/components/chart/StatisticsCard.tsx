import React, {useContext} from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import {
    ClockCircleOutlined,
    HourglassOutlined,
    SmileOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined, MinusOutlined, ExclamationCircleOutlined, SyncOutlined
} from '@ant-design/icons';
import {TracingContext} from "@/app/context/tracingContext";

interface StatisticItem {
    title: string;
    value: number | string | undefined;
    icon?: React.ReactNode;
}

const StatisticsCard: React.FC = () => {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;


    const statistics: StatisticItem[] = [
        { title: 'Time employee', value: state.score?.t_spent, icon: <ClockCircleOutlined style={{ color: 'green' }} /> },
        { title: 'Time remaining', value: state.score?.t_remaining, icon: <HourglassOutlined style={{ color: 'blue' }} /> },
        { title: 'Time affectation', value: state.score?.t_affectation, icon: <ExclamationCircleOutlined style={{ color: 'red' }} /> },
        { title: 'Time restant', value: state.score?.t_restant, icon: <SyncOutlined style={{ color: 'yellow' }} /> },
        { title: 'Previuos score', value: state.score?.previous_score, icon: <SmileOutlined /> },
        { title: 'Score', value: state.score?.actual_score }
    ];

    class ScoreIcon extends React.Component<{ score: number | undefined, previousScore: number | undefined }> {
        render() {
            let {score, previousScore} = this.props;
            if(score && previousScore)
            if (score > previousScore) {
                return <ArrowUpOutlined style={{color: 'green'}}/>;
            } else if (score < previousScore) {
                return <ArrowDownOutlined style={{color: 'red'}}/>;
            } else {
                return <MinusOutlined/>;
            }
        }
    }

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
                        <Statistic title={statistics[5].title} value={statistics[5].value}
                                   prefix={<ScoreIcon score={state.score?.actual_score} previousScore={state.score?.previous_score} />}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StatisticsCard;
