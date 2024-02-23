import {Button, Form, Input, Modal, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useContext, useState} from "react";
import {TracingContext} from "@/app/context/tracingContext";
import {createAffectation, createTeam} from "@/app/hooks/useTracingApi";

const SelectEquipoForm = () => {

    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState('');

    const fetchTeam = async (value:string) => {
        return await createAffectation(value)
    }
    const handleAddNewItem = () => {

        if (newItem) {
            const response = fetchTeam(newItem);
            dispatch({type: 'SET_TEAMS', payload: [...state.teams,{'id':"2","name":newItem}]});
            setNewItem('');
            setIsModalOpen(false);
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
            <Form.Item name="team" label="Team" className="customFormItem" rules={[{ required: true }]}>
                <Select placeholder="Select a project" allowClear>
                    {state.teams.map((option) => (
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
                style={{marginLeft: '8px' ,marginTop:'22px'}}
            >
            </Button>

            <Modal
                title="Add team"
                open={isModalOpen}
                onOk={handleAddNewItem}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form>
                    <Form.Item label="New team">
                        <Input value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SelectEquipoForm;
