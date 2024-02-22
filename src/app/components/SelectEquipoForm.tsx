import {Button, Form, Input, Modal, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useContext, useState} from "react";
import {TracingContext} from "@/app/context/tracingContext";

const SelectEquipoForm = () => {

    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    const [items, setItems] = useState(['Opción 1', 'Opción 2']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState('');

    const handleAddNewItem = () => {
        // Aquí podrías también implementar la lógica para añadir el nuevo item a tu backend
        if (newItem) {
            setItems([...items, newItem]);
            setNewItem('');
            setIsModalOpen(false);
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Form.Item name="team" label="Team" rules={[{required: true}]}>
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
                style={{marginLeft: '8px'}}
            >
                Añadir
            </Button>

            <Modal
                title="Añadir Nuevo Elemento"
                open={isModalOpen}
                onOk={handleAddNewItem}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form>
                    <Form.Item label="Nuevo Elemento">
                        <Input value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SelectEquipoForm;
