import {Button, Form, Input, Modal, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useContext, useState} from "react";
import {TracingContext} from "@/app/context/tracingContext";
import {createAffectation, createTeam} from "@/app/hooks/useTracingApi";

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
            dispatch({type: 'SET_AFFECTATIONS', payload: [...state.teams,{'id':"2","name":newItem}]});
            setNewItem('');
            setIsModalOpen(false);
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Form.Item name="affectation" label="Affectation" className="customFormItem">
                <Select placeholder="Select an affectation" allowClear>
                    {state.affectations.map((option) => (
                        <Select.Option key={option.id} value={option.name}>
                            {option.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Button
                type="primary"
                icon={<PlusOutlined/>}
                onClick={() => setIsModalOpen(true)}
                style={{marginLeft: '4px' ,marginTop:'22px'}}
            >
            </Button>

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
        </div>
    );
};

export default SelectAffectationForm;
