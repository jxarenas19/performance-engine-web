import React from 'react';
import {Button, Checkbox, Col, Form, Input, Row, Select} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {DataType} from '../utils/types';

const SeguimientoForm = ({ addData, setSelectedValues }) => {
  const [form] = Form.useForm();
  
  const handlePaste = (event: any) => {
    const pasteText = event.clipboardData.getData("text");
    const formData: DataType = {
      equipo: "",
      trabajador: "",
      descripcion: "",
      t_empleado: "",
      t_restante: "",
      afectacion: "",
      t_afectacion: "",
      bonos: [],
    };

    // Supongamos que el texto pegado sigue el formato "Nombre: valor, Email: valor"
    pasteText.split(",").forEach((part: string) => {
      const [key, value] = part.trim().split(":");
      if (key.toLowerCase() === "equipo") formData["equipo"] = value.trim();
      if (key.toLowerCase() === "trabajador")
        formData["trabajador"] = value.trim();
    });

    form.setFieldsValue(formData);
  };
  return (
        <Form form={form} layout="vertical" onFinish={addData}>
          <Input.TextArea
            placeholder="Pega el texto aquí"
            onPaste={handlePaste}
          />
          <Form.Item name="equipo" label="Equipo" rules={[{ required: true }]}>
            <Select placeholder="Seleccione un proyecto" allowClear>
              <Select value="1">Desarrollo</Select>
              <Select value="2">Marqueting</Select>
              <Select value="3">Ventas</Select>
              <Select value="4">otros</Select>
            </Select>
          </Form.Item>
          <Form.Item
            name="trabajador"
            label="Trabajador"
            rules={[{ required: true }]}
          >
            <Select placeholder="Seleccione un trabajador" allowClear>
              <Select value="1">Messi</Select>
              <Select value="2">Maradona</Select>
              <Select value="3">Cristiano</Select>
              <Select value="4">Beckham</Select>
            </Select>
          </Form.Item>
          <Form.Item>
            <TextArea placeholder="Descripción de la tarea" rows={4} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="tiempo_empleado"
                label="Tiempo empleado"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tiempo_restante"
                label="Tiempo restante"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="afectacion"
                label="Afectación"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tiempo_afectado"
                label="Tiempo afectado"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="bonos">
            <Checkbox.Group onChange={(values) => setSelectedValues(values)}>
              <Row>
                <Col span={8}>
                  <Checkbox value="cumplimiento" style={{ lineHeight: "32px" }}>
                    Cumplimiento
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="creatividad"
                    style={{ lineHeight: "32px" }}
                    disabled
                  >
                    Creatividad
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="extras" style={{ lineHeight: "32px" }}>
                    Extras
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="rendimiento" style={{ lineHeight: "32px" }}>
                    Rendimiento
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="liderazgo" style={{ lineHeight: "32px" }}>
                    Liderazgo
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="rapidez" style={{ lineHeight: "32px" }}>
                    Rápidez
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
  );
};

export default SeguimientoForm;
