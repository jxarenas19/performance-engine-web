// CustomTable.tsx
import React, {useContext} from 'react';
import {Col, Form, InputNumber, Row, Select} from 'antd';
import {InfoCircleOutlined} from "@ant-design/icons";
import {TracingContext} from "@/app/context/tracingContext";

const { Option } = Select;

const CustomTable: React.FC = () => {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        className="customFormItem"
                        tooltip={{title: 'Number of people served', icon: <InfoCircleOutlined/>}}
                        name="people_attended"
                        label="People Attended"
                    >
                        <InputNumber min={0} max={10} defaultValue={0}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className="customFormItem"
                        name="people_entered_to_system"
                        label="People entered to system"
                    >
                        <InputNumber min={0} max={10} defaultValue={0}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        className="customFormItem"
                        tooltip={{title: '(ej. 2w, 5d, 3h, 4m)', icon: <InfoCircleOutlined/>}}
                        name="incoming_calls"
                        label="Incoming calls"
                    >
                        <InputNumber min={0} max={10} defaultValue={0}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className="customFormItem"
                        name="calls_made"
                        label="Calls made"
                    >
                        <InputNumber min={0} max={10} defaultValue={0}/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="activities" label="Activities" className="customFormItem">
                <Select mode="multiple" placeholder="Select activities" allowClear style={{flex: 3}}>
                    {state.activities.map((option) => (
                        <Select.Option key={option.name} value={option.id}>
                            {option.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </>
    );
};

export default CustomTable;
