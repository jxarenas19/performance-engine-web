import React, {useContext, useState} from 'react';
import {Card, Col, Row, Select, Skeleton, Statistic} from 'antd';
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    HourglassOutlined,
    MinusOutlined,
    SmileOutlined,
    SyncOutlined
} from '@ant-design/icons';
import {TracingContext} from "@/app/context/tracingContext";
import {Filters} from "@/app/utils/types";

interface StatisticItem {
    title: string;
    value: number | string | undefined;
    icon?: React.ReactNode;
}

const StatisticsCardUser: React.FC = () => {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;
    const [group, setGroup] = useState('Daily');


    const statistics: StatisticItem[] = [
        { title: 'Time employee', value: state.score?.result_current?.t_spent, icon: <ClockCircleOutlined style={{ color: 'green' }} /> },
        { title: 'Time remaining', value: state.score?.result_current?.t_remaining, icon: <HourglassOutlined style={{ color: 'blue' }} /> },
        { title: 'Time affectation', value: state.score?.result_current?.t_affectation, icon: <ExclamationCircleOutlined style={{ color: 'red' }} /> },
        { title: 'Time restant', value: state.score?.result_current?.t_restant, icon: <SyncOutlined style={{ color: 'yellow' }} /> },
        { title: 'Previuos score', value: state.score?.result_previous?.score, icon: <SmileOutlined /> },
        { title: 'Score', value: state.score?.result_current?.score }
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
    const updateFilter = (key: keyof Filters, value: string) => {
        dispatch({type: 'SET_FILTER', key, value});
    };
    const groupFilter = (value: string) => {
        setGroup(value)
        updateFilter('groupScore',value)
    }
    const userSelected = (value: string) => {
        updateFilter('userIdScore', value);
        dispatch({ type: 'RELOAD_DATA_STATISTIC_CARD' });
    }
    return (
        <>
            <div className="button-container">
                <Select value={group} defaultValue="Daily" style={{width: 120}} onChange={groupFilter}>
                    <Select.Option key="Daily" value="Daily">Daily</Select.Option>
                    <Select.Option key="Weekly" value="Weekly">Weekly</Select.Option>
                    <Select.Option key="Biweekly" value="Biweekly">Biweekly</Select.Option>
                    <Select.Option key="Monthly" value="Monthly">Monthly</Select.Option>
                    <Select.Option key="Quarterly" value="Quarterly">Quarterly</Select.Option>
                    <Select.Option key="Biannual" value="Biannual">Biannual</Select.Option>
                    <Select.Option key="Annual" value="Annual">Annual</Select.Option>
                </Select>
                <Select placeholder="Select an employee" allowClear
                        onSelect={userSelected}
                        disabled={!state.authenticatedUser?.is_admin}>
                    {state.persons.map((option) => (
                        <Select.Option key={option.sub} value={option.sub}>
                            {option.email}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            {state.isLoading2 ? (<Skeleton active/>) : (
                <div>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Card bordered={false} className="criclebox ">
                                <Statistic title={statistics[0].title} value={statistics[0].value}
                                           prefix={statistics[0].icon}
                                           valueStyle={{fontSize: '14px'}}  // Ajustar según sea necesario
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card bordered={false} className="criclebox ">
                                <Statistic title={statistics[1].title} value={statistics[1].value}
                                           prefix={statistics[1].icon}
                                           valueStyle={{fontSize: '14px'}}  // Ajustar según sea necesario
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card bordered={false} className="criclebox ">
                                <Statistic title={statistics[4].title} value={statistics[4].value}
                                           prefix={statistics[4].icon}
                                           valueStyle={{fontSize: '14px'}}  // Ajustar según sea necesario
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{marginTop: 16}}>
                        <Col span={8}>
                            <Card bordered={false} className="criclebox">
                                <Statistic
                                    title={statistics[2].title}
                                    value={statistics[2].value}
                                    prefix={statistics[2].icon}
                                    valueStyle={{fontSize: '14px'}}  // Ajustar según sea necesario
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card bordered={false} className="criclebox">
                                <Statistic
                                    title={statistics[3].title}
                                    value={statistics[3].value}
                                    prefix={statistics[3].icon}
                                    valueStyle={{fontSize: '14px'}}  // Ajustar según sea necesario
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card bordered={false} className="criclebox">
                                <Statistic
                                    title={statistics[5].title}
                                    value={statistics[5].value}
                                    prefix={<ScoreIcon score={state.score?.result_current?.score}
                                                       previousScore={state.score?.result_previous?.score}/>}
                                    valueStyle={{fontSize: '14px'}}  // Ajustar según sea necesario
                                />
                            </Card>
                        </Col>
                    </Row>

                </div>
            )}
        </>
    );
};

export default StatisticsCardUser;
