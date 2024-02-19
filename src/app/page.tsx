'use client'

import {useState} from 'react';
import {Button, Checkbox, Col, Form, Input, Modal, Row, Select, Table, Tag} from 'antd';
import {initialData} from '@/app/utils/data';
import {DataType} from '@/app/utils/types';
import TextArea from 'antd/es/input/TextArea';
import {CheckboxValueType} from "antd/lib/checkbox/Group";

const IndexPage = () => {
    const [data, setData] = useState<DataType[]>(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addData = (values: DataType) => {
        console.log(values)
        setData([...data, {...values, key: Date.now().toString()}]);
        setIsModalOpen(false);
    };
    const [selectedValues, setSelectedValues] =
        useState<CheckboxValueType[]>([]);

    const columns = [
        {
            title: 'Equipo',
            dataIndex: 'equipo',
            key: 'equipo',
        },
        {
            title: 'Trabajador',
            dataIndex: 'trabajador',
            key: 'trabajador',
        },
        {
            title: 'T-empleado',
            dataIndex: 't_empleado',
            key: 't_empleado',
        },
        {
            title: 'T-restante',
            dataIndex: 't_restante',
            key: 't_restante',
        },
        {
            title: 'Afectación',
            dataIndex: 'afectacion',
            key: 'afectacion',
        },
        {
            title: 'T-Afectación',
            dataIndex: 't_afectacion',
            key: 't_afectacion',
        },
        {
            title: 'Bonos',
            dataIndex: 'bonos',
            key: 'bonos',
            render: (_: any, {bonos}: any) => (
                <>
                    {bonos.map((bono: any) => {
                        let color = bono.length > 5 ? 'geekblue' : 'green';
                        if (bono === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={bono}>
                                {bono.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            )
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Add New Data
            </Button>
            <Table dataSource={data} columns={columns}/>
            <Modal title="Seguimiento de tiempo" open={isModalOpen} onCancel={() => setIsModalOpen(false)}
                   footer={null}>
                <Form
                    layout='vertical'
                    onFinish={addData}>
                    <Form.Item name="equipo" label="Equipo" rules={[{required: true}]}>
                        <Select
                            placeholder="Seleccione un proyecto"
                            allowClear
                        >
                            <Select value="1">Desarrollo</Select>
                            <Select value="2">Marqueting</Select>
                            <Select value="3">Ventas</Select>
                            <Select value="4">otros</Select>
                        </Select>
                    </Form.Item>
                    <Form.Item name="trabajador" label="Trabajador" rules={[{required: true}]}>
                        <Select
                            placeholder="Seleccione un trabajador"
                            allowClear
                        >
                            <Select value="1">Messi</Select>
                            <Select value="2">Maradona</Select>
                            <Select value="3">Cristiano</Select>
                            <Select value="4">Beckham</Select>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <TextArea
                            placeholder="Descripción de la tarea"
                            rows={4}/>
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="tiempo_empleado" label="Tiempo empleado" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="tiempo_restante" label="Tiempo restante" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="afectacion" label="Afectación" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="tiempo_afectado" label="Tiempo afectado" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="bonos">
                        <Checkbox.Group onChange={values => setSelectedValues(values)}>
                            <Row>
                                <Col span={8}>
                                    <Checkbox value="cumplimiento" style={{lineHeight: '32px'}}>
                                        Cumplimiento
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="creatividad" style={{lineHeight: '32px'}} disabled>
                                        Creatividad
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="extras" style={{lineHeight: '32px'}}>
                                        Extras
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="rendimiento" style={{lineHeight: '32px'}}>
                                        Rendimiento
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="liderazgo" style={{lineHeight: '32px'}}>
                                        Liderazgo
                                    </Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="rapidez" style={{lineHeight: '32px'}}>
                                        Rápidez
                                    </Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Guardar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default IndexPage;
