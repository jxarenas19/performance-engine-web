import React, {useContext, useEffect, useState} from 'react';
import {Button, Checkbox, Col, Form, Input, Row, Select, Spin} from 'antd';
import {DataForm, Filters} from '../utils/types';
import {createTracing, updateTracing} from "@/app/hooks/useTracingApi";
import {TracingContext} from "@/app/context/tracingContext";
import {CheckboxValueType} from "antd/lib/checkbox/Group";
import SelectEquipoForm from "@/app/components/SelectEquipoForm";
import SelectAffectationForm from "@/app/components/SelectAffectationForm";
import {
    AliwangwangOutlined,
    BookOutlined,
    CarOutlined,
    CheckCircleOutlined,
    DingdingOutlined,
    InfoCircleOutlined,
    PlusOutlined
} from "@ant-design/icons";
import {regexTime} from "@/app/utils/variables";
import {convertKeyValueToFormData, extractKeyValuePairs} from "@/app/utils/utils";
import ShowTitleByTeam from "@/app/components/ShowTitleByTeam";
import {StatusData} from "@/app/utils/data";
import JoditEditorComponent from "@/app/components/JoditEditorComponent";


const TracingForm = () => {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;
    const [showTextArea, setShowTextArea] = useState<boolean>(false);
    const [detail, setDetail] = useState('');
    const [form] = Form.useForm();

    const handleDetailChange = (newDetail:string) => {
        setDetail(newDetail);
    };
    const fetchTracing = async (values: DataForm) => {

        if(!values.id) return await createTracing(values)
        else return await updateTracing(values)
    }
    const updateFilter = (key: keyof Filters, value: string) => {
        dispatch({ type: 'SET_FILTER', key, value });
    };
    const completeField = (values: DataForm) => {
        values.user_id = values.sub;
        values.detail = detail;
        if (!values.amount) values.amount = 0;
        if (!values.amount_error) values.amount_error = 0;
        if (!values.people_attended) values.people_attended = 0;
        if (!values.people_entered_to_system) values.people_entered_to_system = 0;
        if (!values.incoming_calls) values.incoming_calls = 0;
        if (!values.calls_made) values.calls_made = 0;
        if (!values.activities) values.activities = [];
        if (!values.affectation) values.affectation = [];
        if (!values.plus) values.plus = [];
        if (!values.title) values.title = ' ';
        if (!values.t_affectation ) values.t_affectation  = '0h';

        return values
    }
    const addData = (values: DataForm) => {
        console.log(values);
        values = completeField(values)
        dispatch({type: 'LOADING_TRACINGS', isLoading: true});
        form.resetFields();
        const response = fetchTracing(values);
        response.then(value => {
            dispatch({type: 'LOADING_TRACINGS', isLoading: false});
            dispatch({type: 'SET_MODAL_OPEN', payload: !state.isModalOpen});
            dispatch({type: 'SET_SELECTED_PERSON', payload: null});
            dispatch({ type: 'RELOAD_DATA' });

        }).catch(reason => {
            dispatch({type: 'LOADING_TRACINGS', isLoading: false});
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

            if(state.selectedTask?.detail){
                handleDetailChange(state.selectedTask?.detail)
            }

            if(!state.authenticatedUser?.is_admin){
                form.setFieldValue('sub',state.authenticatedUser?.user_id)
                form.setFieldValue('team',state.teams[0].id)
            }
        }
    }, [state.isModalOpen, form]);

    return (
        <Spin spinning={state.isLoading}>
        <Form form={form}
              layout="vertical"
              onFinish={addData}
              size='small'
              initialValues={{
                  ...state.selectedTask,
                  size: 'small'
              }}
        >
            <Form.Item
                name="id"
                hidden={true}
            >
                <Input placeholder="CODE:TITLE"/>
            </Form.Item>
            <Row gutter={12}>
                <Col span={9}>
                    <SelectEquipoForm
                        form={form}
                    />
                </Col>
                <Col span={15} >
                    <Form.Item
                        className="customFormItem"
                        name="sub"
                        label="Employee"
                        hidden={!state.authenticatedUser?.is_admin}
                        rules={[{required: true}]}
                    >
                        <Select placeholder="Select an employee" allowClear
                                >
                            {state.persons.map((option) => (
                                <Select.Option key={option.sub} value={option.sub}>
                                    {option.email}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <ShowTitleByTeam></ShowTitleByTeam>
                <Form.Item
                    className="customFormItem"
                    name="detail"
                    label="Detail"
                >
                    <JoditEditorComponent onDetailChange={handleDetailChange}/>
                </Form.Item>
                <Row gutter={24}>
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
                <Row >
                    <Col span={14} >
                        <SelectAffectationForm></SelectAffectationForm>
                    </Col>
                    <Col span={8} >
                        <Form.Item
                            className="customFormItem"
                            tooltip={{title: '(ej. 2w, 5d, 3h, 4m)', icon: <InfoCircleOutlined/>}}
                            name="t_affectation"
                            label="Time affectation"
                        >
                            <Input
                                placeholder="Enter a value"
                            />
                        </Form.Item>
                    </Col>

                </Row>
            {state.authenticatedUser?.is_admin && (
                <Form.Item name="plus" label="Plus">
                    <Checkbox.Group onChange={(values) => setSelectedValues(values)}>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="compliance" style={{lineHeight: "32px"}}>
                                    Compliance
                                    <CheckCircleOutlined style={{ marginLeft: 8 }} />
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    value="creativity"
                                    style={{lineHeight: "32px"}}

                                >
                                    Creativity
                                    <AliwangwangOutlined style={{ marginLeft: 8 }} />
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="plus" style={{lineHeight: "32px"}}>
                                    Plus
                                    <PlusOutlined style={{ marginLeft: 8 }} />
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="performance" style={{lineHeight: "32px"}}>
                                    Performance
                                    <DingdingOutlined style={{ marginLeft: 8 }} />
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="leadership" style={{lineHeight: "32px"}}>
                                    Leadership
                                    <BookOutlined style={{ marginLeft: 8 }} />
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="speed" style={{lineHeight: "32px"}}>
                                    Speed
                                    <CarOutlined style={{ marginLeft: 8 }} />
                                </Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

            )}
            {state.authenticatedUser?.is_admin && (
                <Form.Item name="status" label="Status" className="customFormItem"
                >
                    <Select placeholder="Select a status" allowClear>
                        {StatusData.map((option) => (
                            <Select.Option key={option.id_two} value={option.id_two}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>

                </Form.Item>

            )}
                <Form.Item>
                    <Button style={{ marginTop:'10px',height:'24px'}} type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
        </Form>
        </Spin>
);
};

export default TracingForm;
