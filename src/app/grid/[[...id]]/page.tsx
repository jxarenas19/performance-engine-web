"use client";

import React, {useState} from "react";
import {Button, Col, Modal, Row, Table, TableColumnsType, Tabs} from "antd";
import type {ColumnsType} from "antd/es/table";
import {DataType, DayGroup, Person, Requirement} from "@/app/utils/types";
import {equipoGroupData, equiposData} from "@/app/utils/data";
import {CheckboxValueType} from "antd/lib/checkbox/Group";
import SeguimientoForm from "@/app/components/SeguimientoForm";
import TimeWorked from "@/app/components/TimeWorked";
import {SmileOutlined,HeartOutlined} from "@ant-design/icons";


const App: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const [selectedValues, setSelectedValues] = useState<CheckboxValueType[]>([]);

  const columnsPeople: TableColumnsType<Person> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Logros",
      key: "achievements",
      render: () => (
        <div className="icon-column">
          <SmileOutlined />
          <>&ensp;</>
          <HeartOutlined />
        </div>
      ),
    },
    {
      title: 'Avance',
      dataIndex: 'hoursWorked',
      key: 'hoursWorked',
      render: (hoursWorked) => <TimeWorked hoursWorked={hoursWorked} />,
    },
  ];

  const columnsRequirements: ColumnsType<Requirement> = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "T-empleado",
      dataIndex: "t_empleado",
      key: "t_empleado",
    },
    {
      title: "T-restante",
      dataIndex: "t_restante",
      key: "t_restante",
    },
    {
      title: "Afectación",
      dataIndex: "afectacion",
      key: "afectacion",
    },
    {
      title: "T-Afectación",
      dataIndex: "t_afectacion",
      key: "t_afectacion",
    },
  ];

  const onRowClick = (person: Person) => ({
    onClick: () => {
      setSelectedPerson(person);
    },
  });

  const expandedRowRender = (record: DayGroup) => (
    <Table
      columns={columnsPeople}
      dataSource={record.people}
      pagination={false}
      onRow={onRowClick}
    />
  );

  const columnsDayGroups: ColumnsType<DayGroup> = [
    { title: "Fecha", dataIndex: "date", key: "date" },
  ];

  const addData = (values: DataType) => {
    console.log(values);

    setIsModalOpen(false);
  };

  const filtrarDatosPorEquipo = (equipo: string) => {
    return equipoGroupData.filter((group) => group.equipo === equipo);
  };
  const handleTabChange = (key: string) => {
    setSelectedPerson(null);
  };

  const tabsItems = equiposData.map((equipo) => ({
    label: equipo,
    key: equipo,
    children: (
      <Row gutter={16}>
        <Col span={12}>
          <Table
            columns={columnsDayGroups}
            dataSource={filtrarDatosPorEquipo(equipo)}
            pagination={{
              pageSize: 2, // Número de elementos por página
            }}
            expandable={{ expandedRowRender }} // Usar la función existente expandedRowRender para manejar el siguiente nivel
          />
        </Col>
        <Col span={12}>
          {selectedPerson ? (
            <Table
              columns={columnsRequirements}
              dataSource={selectedPerson.requirements}
              pagination={{
                pageSize: 2, // Número de elementos por página
              }}
            />
          ) : (
            <div>Seleccione una persona para ver sus requisitos.</div>
          )}
        </Col>
      </Row>
    ), // Aquí puedes renderizar componentes más complejos basados en tu data
  }));
  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Adicionar seguimiento
      </Button>
      <Tabs
        defaultActiveKey="1"
        onChange={handleTabChange}
        items={tabsItems}
      ></Tabs>
      <Modal
        title="Seguimiento de tiempo"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <SeguimientoForm
            addData={addData}
            setSelectedValues={selectedValues}>

        </SeguimientoForm>
      </Modal>
    </>
  );
};

export default App;

