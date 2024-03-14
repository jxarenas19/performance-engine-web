import {Col, Form, InputNumber, Row, Select} from "antd";
import React from "react";
import {DesignersTitle} from "@/app/utils/data";
import {InfoCircleOutlined} from "@ant-design/icons";

const SelectDesignersTitle = () => {

    return (
        <Row gutter={12}>
            <Col span={18} style={{ width: '100%' }}>
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

            <Form.Item
                       tooltip={{title: 'Number of errors detected', icon: <InfoCircleOutlined/>}}
                       label="Amount error" name="amount_error" className="customFormItem">
                <InputNumber min={0} max={10} defaultValue={0}/>
            </Form.Item>
        </Row>
    );
};

export default SelectDesignersTitle;
