import React from 'react';
import {Button, Checkbox, Col, Form, Input, Row, Select} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {DataType} from '../utils/types';

const TracingForm = ({ addData,form }) => {


  const handlePaste = (event: any) => {
    const pasteText = event.clipboardData.getData("text");
    const formData: DataType = {
      team: "",
      user_id: "",
      detail: "",
      t_spent: "",
      t_remaining: "",
      affectation: "",
      t_affectation: "",
      plus: [],
    };

    pasteText.split(",").forEach((text: string) => {
      // const [key, value] = part.trim().split(":");
      // if (key.toLowerCase() === "team") formData["team"] = value.trim();
      // if (key.toLowerCase() === "employee")
      //   formData["employee"] = value.trim();
      const textFormated = text.split('\n');
      console.log(textFormated)
    });

    form.setFieldsValue(formData);
  };

  return (
        <Form form={form} layout="vertical" onFinish={addData}>
          <Input.TextArea
            placeholder="Paste the text here"
            onPaste={handlePaste}
          />
          <Form.Item name="team" label="Team" rules={[{ required: true }]}>
            <Select placeholder="Select a project" allowClear>
              <Select.Option value="1">Development</Select.Option>
              <Select.Option value="2">Marketing</Select.Option>
              <Select.Option value="3">Sales</Select.Option>
              <Select.Option value="4">Others</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="user_id"
            label="Employee"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select an employee" allowClear>
              <Select.Option value="a4s854e8-a081-7079-17cf-b15b1cde6a9f">Messi</Select.Option>
              <Select.Option value="ad2854e8-a081-7079-17cf-b15b1cde6a9f">Maradona</Select.Option>
              <Select.Option value="ad2854e8-a081-7079-17cf-b15b1cde6a9f">Cristiano</Select.Option>
              <Select.Option value="a42854ed-a081-7079-17cf-b15b1cde6a9f">Beckham</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true }]}
          >
            <Input placeholder="CODE:TITLE"/>
          </Form.Item>
          <Form.Item
              name="detail"
          >
            <TextArea placeholder="Detail" rows={4} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="t_spent"
                label="Time employee"
                rules={[{ required: true }]}
              >
                <Input
                    placeholder="Enter a value (ej. 2w, 5d, 3h, 4m)"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="t_remaining"
                label="Time remaining"
                rules={[{ required: true }]}
              >
                <Input
                    placeholder="Enter a value (ej. 2w, 5d, 3h, 4m)"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="affectation"
                label="Affectation"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="t_affectation"
                label="Time affectation"
                rules={[{ required: true }]}
              >
                <Input
                    placeholder="Enter a value (ej. 2w, 5d, 3h, 4m)"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="plus">
            <Checkbox.Group onChange={(values) => setSelectedValues(values)}>
              <Row>
                <Col span={8}>
                  <Checkbox value="compliance" style={{ lineHeight: "32px" }}>
                    Compliance
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="creativity"
                    style={{ lineHeight: "32px" }}
                    disabled
                  >
                    Creativity
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="plus" style={{ lineHeight: "32px" }}>
                    Plus
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="performance" style={{ lineHeight: "32px" }}>
                    Performance
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="leadership" style={{ lineHeight: "32px" }}>
                    Leadership
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="speed" style={{ lineHeight: "32px" }}>
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
