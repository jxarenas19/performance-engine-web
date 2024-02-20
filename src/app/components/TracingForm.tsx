import React from 'react';
import {Button, Checkbox, Col, Form, Input, Row, Select} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {DataType} from '../utils/types';

const TracingForm = ({ addData, setSelectedValues }) => {
  const [form] = Form.useForm();
  
  const handlePaste = (event: any) => {
    const pasteText = event.clipboardData.getData("text");
    const formData: DataType = {
      team: "",
      employee: "",
      description: "",
      t_spent: "",
      t_remaining: "",
      affectation: "",
      t_affectation: "",
      plus: [],
    };

    pasteText.split(",").forEach((part: string) => {
      const [key, value] = part.trim().split(":");
      if (key.toLowerCase() === "team") formData["team"] = value.trim();
      if (key.toLowerCase() === "employee")
        formData["employee"] = value.trim();
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
              <Select value="1">Development</Select>
              <Select value="2">Marketing</Select>
              <Select value="3">Sales</Select>
              <Select value="4">Others</Select>
            </Select>
          </Form.Item>
          <Form.Item
            name="employee"
            label="Employee"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select an employee" allowClear>
              <Select value="1">Messi</Select>
              <Select value="2">Maradona</Select>
              <Select value="3">Cristiano</Select>
              <Select value="4">Beckham</Select>
            </Select>
          </Form.Item>
          <Form.Item>
            <TextArea placeholder="Description" rows={4} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="t_spent"
                label="Time employee"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="t_remaining"
                label="Time remaining"
                rules={[{ required: true }]}
              >
                <Input />
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
                <Input />
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
