import {Col, Form, InputNumber, Row, Select} from "antd";
import React from "react";
import {DesignersTitle} from "@/app/utils/data";
import {InfoCircleOutlined} from "@ant-design/icons";

const SelectDesignersTitle = () => {

    return (
        <Row gutter={24} style={{ display: 'flex', alignItems: 'center' }}>
            <Col span={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Form.Item name="title" label="Title" className="customFormItem"
                >
                    <Select placeholder="Select a title" allowClear>
                        {DesignersTitle.map((option) => (
                            <Select.Option key={option.name} value={option.name}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>

                </Form.Item>
            </Col>

            <Form.Item name="amount_error"
                       tooltip={{title: 'Number of errors detected', icon: <InfoCircleOutlined/>}}
                       label="Amount error" className="customFormItem">
                <InputNumber min={0} max={10} defaultValue={0}/>
            </Form.Item>
        </Row>
    );
};

export default SelectDesignersTitle;
