import {Form, Select} from "antd";
import React from "react";
import {DesignersTitle} from "@/app/utils/data";

const SelectDesignersTitle = () => {

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Form.Item name="affectation" label="Affectation" className="customFormItem">
                <Select placeholder="Select an affectation" allowClear>
                    {DesignersTitle.map((option) => (
                        <Select.Option key={option.name} value={option.name}>
                            {option.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </div>
    );
};

export default SelectDesignersTitle;
