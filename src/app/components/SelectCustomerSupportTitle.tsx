import {Col, Form, InputNumber, Row, Select} from "antd";
import React from "react";
import {CustomerSupportTitle} from "@/app/utils/data";
import CustomTable from "@/app/components/CustomeTable";

const SelectCustomerSupportTitle = () => {

    return (
        <>
        <Row gutter={24} style={{display: 'flex', alignItems: 'center'}}>
            <Col span={18} style={{width: '100%'}}>
                <Form.Item name="title" label="Title" className="customFormItem">
                    <Select placeholder="Select a title" allowClear style={{flex: 3}}>
                        {CustomerSupportTitle.map((option) => (
                            <Select.Option key={option.name} value={option.name}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>

            <Form.Item name="amount" label="Amount" className="customFormItem">
                <InputNumber min={1} max={10} defaultValue={1} style={{flex: 1}}/>
            </Form.Item>
        </Row>
        <CustomTable />
        </>
    );
};

export default SelectCustomerSupportTitle;
