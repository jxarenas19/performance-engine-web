// CustomTable.tsx
import React, {useContext, useState} from 'react';
import {Button, Col, Form, Input, InputNumber, Modal, Row, Select} from 'antd';
import {InfoCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {TracingContext} from "@/app/context/tracingContext";
import {createActivity, createAffectation} from "@/app/hooks/useTracingApi";

const { Option } = Select;

const CustomTable: React.FC = () => {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState('');

    const fetchActivity = async (value:string) => {
        return await createActivity(value)
    }
    const handleAddNewItem = () => {

        if (newItem) {
            const response = fetchActivity(newItem);
            response.then(value => {
                dispatch({type: 'SET_ACTIVITIES', payload: [...state.activities,
                        {'id':value.data.id,"name":value.data.name}]});
                setNewItem('');
                setIsModalOpen(false);
            });

        }
    };
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
            <Row gutter={8} wrap={false}> {/* Asegura un espacio entre los elementos y no los envuelve */}
                <Col flex="auto"> {/* Ocupa el espacio disponible */}
                    <Form.Item name="activities" label="Activities" className="customFormItem">
                        <Select
                            mode="multiple"
                            placeholder="Select activities"
                            allowClear
                        >
                            {state.activities.map((option) => (
                                <Select.Option key={option.name} value={option.id}>
                                    {option.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                {state.authenticatedUser?.is_admin && (
                    <Col> {/* Ocupa el espacio necesario para el botón */}
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsModalOpen(true)}
                            style={{ marginTop: '32px' }} // Ajusta para alinear con el Select
                        >
                        </Button>
                    </Col>
                )}
            </Row>
            <Modal
                title="Add activity"
                open={isModalOpen}
                onOk={handleAddNewItem}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form>
                    <Form.Item label="New activity">
                        <Input value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CustomTable;
