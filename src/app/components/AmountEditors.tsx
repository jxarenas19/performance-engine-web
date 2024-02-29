import {Col, Form, InputNumber, Row} from "antd";
import React from "react";

const AmountEditors = () => {

    return (
        <Row gutter={24} style={{ display: 'flex', alignItems: 'center' }}>
            <Col span={12} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Form.Item name="amount" label="Amount" className="customFormItem">
                    <InputNumber min={1} max={10} defaultValue={1}/>
                </Form.Item>
            </Col>
            <Form.Item name="amount_error" label="Amount error" className="customFormItem">
                <InputNumber min={0} max={10} defaultValue={0}/>
            </Form.Item>
        </Row>
    );
};

export default AmountEditors;
