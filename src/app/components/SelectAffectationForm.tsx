import {Button, Col, Form, Input, Modal, Row, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useContext, useState} from "react";
import {TracingContext} from "@/app/context/tracingContext";
import {createAffectation} from "@/app/hooks/useTracingApi";

const SelectAffectationForm = () => {

    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState('');

    const fetchAffectation = async (value:string) => {
        return await createAffectation(value)
    }
    const handleAddNewItem = () => {

        if (newItem) {
            const response = fetchAffectation(newItem);
            response.then(value => {
                console.log(value)
                dispatch({type: 'SET_AFFECTATIONS', payload: [...state.affectations,
                        {'id':value.data.id,"name":value.data.name}]});
                setNewItem('');
                setIsModalOpen(false);
            });

        }
    };

    return (
<>
    <Row gutter={24}>
        <Col span={20}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Form.Item name="affectation" label="Affectation" className="customFormItem" style={{ flex: 1, marginRight: 8 }}>
                    <Select mode="multiple" loading={state.isLoading} placeholder="Select an affectation" allowClear>
                        {state.affectations.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {state.authenticatedUser?.is_admin && (
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalOpen(true)}
                        style={{marginTop:'26px',width:'24px',height:'24px'}}
                    >
                    </Button>
                )}
            </div>
        </Col>
    </Row>

    <Modal
        title="Add affectation"
        open={isModalOpen}
        onOk={handleAddNewItem}
        onCancel={() => setIsModalOpen(false)}
    >
        <Form>
            <Form.Item label="New affectation">
                <Input value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
            </Form.Item>
        </Form>
    </Modal>

</>
    );
};

export default SelectAffectationForm;
