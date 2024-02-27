import React, {useContext, useEffect, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, Row, Select} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {DataTask, DataType} from '../utils/types';
import {createTracing} from "@/app/hooks/useTracingApi";
import {TracingContext} from "@/app/context/tracingContext";
import {CheckboxValueType} from "antd/lib/checkbox/Group";
import SelectEquipoForm from "@/app/components/SelectEquipoForm";
import SelectAffectationForm from "@/app/components/SelectAffectationForm";
import {InfoCircleOutlined} from "@ant-design/icons";
import {regexTime, TEXT_AREA_TOOLTIP} from "@/app/utils/variables";
import {convertKeyValueToFormData, extractKeyValuePairs} from "@/app/utils/utils";

const TracingForm = () => {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;
    const [showTextArea, setShowTextArea] = useState<boolean>(true);
    const [form] = Form.useForm();

    const fetchTracing = async (values: DataType) => {
        const data: DataTask = {
            user_id:values.sub,
            team:values.team,
            title:values.title,
            detail:values.detail,
            t_spent:values.t_spent,
            t_remaining:values.t_remaining,
            t_affectation:values.t_affectation,
            affectation:values.affectation
        }
        return await createTracing(data)
    }
    const addData = (values: DataType) => {
        console.log(values);
        form.resetFields();
        const response = fetchTracing(values);
        response.then(value => {
            dispatch({type: 'SET_MODAL_OPEN', payload: !state.isModalOpen});
        });

    };
    const handlePaste = (event: any) => {
        const pasteText = event.clipboardData.getData("text");

        const values = extractKeyValuePairs(pasteText);
        const formData = convertKeyValueToFormData(values);

        form.setFieldsValue(formData);
        form.setFieldsValue({ myTextArea: '' });
        setShowTextArea(false);
    };

    const setSelectedValues = (values: CheckboxValueType[]) => {
        dispatch({type: 'SET_SELECTED_VALUES', payload: values});
    };

    useEffect(() => {
        if (state.isModalOpen) {
            form.resetFields();
            setShowTextArea(true);
        }
    }, [state.isModalOpen, form]);

    return (
        <Form form={form}
              layout="vertical"
              onFinish={addData}
              size='small'
              initialValues={{
                  size: 'small',
              }}>
            {showTextArea && (
                <Form.Item name="myTextArea" label="Introduce text here!"
                           tooltip={{title: TEXT_AREA_TOOLTIP, icon: <InfoCircleOutlined/>}}>
                    <Input.TextArea
                        className="customFormItem"
                        placeholder="Paste the text here"
                        onPaste={handlePaste}
                    />
                </Form.Item>
            )}
            <Row>
                <Col span={12}>
                    <SelectEquipoForm/>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className="customFormItem"
                        name="sub"
                        label="Employee"
                        rules={[{required: true}]}
                    >
                        <Select placeholder="Select an employee" allowClear>
                            {state.persons.map((option) => (
                                <Select.Option key={option.sub} value={option.sub}>
                                    {option.email}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                className="customFormItem"
                name="title"
                label="Title"
                rules={[{required: true}]}
            >
                <Input placeholder="CODE:TITLE"/>
            </Form.Item>
            <Form.Item
                className="customFormItem"
                name="detail"
                label="Detail"
            >
                <TextArea placeholder="Detail" rows={4}/>
            </Form.Item>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        className="customFormItem"
                        tooltip={{title: '(ej. 2w, 5d, 3h, 4m)', icon: <InfoCircleOutlined/>}}
                        name="t_spent"
                        label="Time employee"
                        rules={[{
                            validator: (_, value) => {
                                if (!regexTime.test(value)) {
                                    return Promise.reject(new Error("invalid format. Must be 2h, 3w, 4d o 2m"));
                                }
                                return Promise.resolve();
                            },
                        }]}
                    >
                        <Input
                            placeholder="Enter a value"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className="customFormItem"
                        tooltip={{title: '(ej. 2w, 5d, 3h, 4m)', icon: <InfoCircleOutlined/>}}
                        name="t_remaining"
                        label="Time remaining"
                        rules={[{required: true}]}
                    >
                        <Input
                            placeholder="Enter a value"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <SelectAffectationForm></SelectAffectationForm>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className="customFormItem"
                        tooltip={{title: '(ej. 2w, 5d, 3h, 4m)', icon: <InfoCircleOutlined/>}}
                        name="t_affectation"
                        label="Time affectation"
                        rules={[{required: true}]}
                    >
                        <Input
                            placeholder="Enter a value"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="plus">
                <Checkbox.Group onChange={(values) => setSelectedValues(values)}>
                    <Row>
                        <Col span={8}>
                            <Checkbox value="compliance" style={{lineHeight: "32px"}}>
                                Compliance
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox
                                value="creativity"
                                style={{lineHeight: "32px"}}
                                disabled
                            >
                                Creativity
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="plus" style={{lineHeight: "32px"}}>
                                Plus
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="performance" style={{lineHeight: "32px"}}>
                                Performance
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="leadership" style={{lineHeight: "32px"}}>
                                Leadership
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="speed" style={{lineHeight: "32px"}}>
                                Speed
                            </Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TracingForm;
