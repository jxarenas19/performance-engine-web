import {Col, Form, InputNumber, Row} from "antd";
import React from "react";

const AmountEditors = () => {

    return (
        <Row gutter={12}>
            <Col span={9}>
                <Form.Item name="amount" label="Amount" className="customFormItem">
                    <InputNumber min={1} max={10} defaultValue={1}/>
                </Form.Item>
            </Col>
            <Col span={15} >
                <Form.Item name="amount_error" label="Amount error" className="customFormItem">
                    <InputNumber min={0} max={10} defaultValue={0}/>
                </Form.Item>
            </Col>
        </Row>
    );
};

export default AmountEditors;
