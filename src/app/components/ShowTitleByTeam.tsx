import {Form, Input} from "antd";
import React, {useContext} from "react";
import {TracingContext} from "@/app/context/tracingContext";
import SelectDesignersTitle from "@/app/components/SelectDesignersTitle";
import SelectCustomerSupportTitle from "@/app/components/SelectCustomerSupportTitle";
import AmountEditors from "@/app/components/AmountEditors";

const ShowTitleByTeam = () => {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;
    console.log(state)
    if (state.selectedTeam == 'Designers') {
        return (<SelectDesignersTitle></SelectDesignersTitle>)
    } else if (state.selectedTeam == 'Editors') {
        return (<AmountEditors></AmountEditors>)
    } else if (state.selectedTeam == 'Customer Support') {
        return (<SelectCustomerSupportTitle></SelectCustomerSupportTitle>)
    } else {
        return (

            <Form.Item
                className="customFormItem"
                name="title"
                label="Title"
                rules={[{required: true}]}
            >
                <Input placeholder="CODE:TITLE"/>
            </Form.Item>

        );
    }

};

export default ShowTitleByTeam;
