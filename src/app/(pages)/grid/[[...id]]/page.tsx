"use client";

import React, {useState} from "react";
import {DatePicker, Select, Button, Col, Modal, Row, Table, TableColumnsType, Tabs, Skeleton, Form} from "antd";
import type {ColumnsType} from "antd/es/table";
import {DataType, DayGroup, Person, Requirement} from "@/app/utils/types";
import {teamGroupData, teamsData} from "@/app/utils/data";
import {CheckboxValueType} from "antd/lib/checkbox/Group";
import TracingForm from "@/app/components/TracingForm";
import TimeWorked from "@/app/components/TimeWorked";
import {HeartOutlined, SmileOutlined} from "@ant-design/icons";
import {RangePickerProps} from 'antd/es/date-picker';

const {RangePicker} = DatePicker;
const {Option} = Select;

export default function Page({params}: { params: { id: string } }) {
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupBy, setGroupBy] = useState<string>('Diario');
    const [filteredData, setFilteredData] = useState<Person[]>([]);


    const personId = params.id;
    const [selectedValues, setSelectedValues] = useState<CheckboxValueType[]>([]);

    const columnsPeople: TableColumnsType<Person> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Plus",
            key: "plus",
            render: () => (
                <div className="icon-column">
                    <SmileOutlined/>
                    <>&ensp;</>
                    <HeartOutlined/>
                </div>
            ),
        },
        {
            title: 'Advance',
            dataIndex: 'hoursWorked',
            key: 'hoursWorked',
            render: (hoursWorked) => <TimeWorked hoursWorked={hoursWorked}/>,
        },
    ];

    const columnsRequirements: ColumnsType<Requirement> = [
        {title: "ID", dataIndex: "id", key: "id"},
        {
            title: "T-spent",
            dataIndex: "t_spent",
            key: "t_spent",
        },
        {
            title: "T-remaining",
            dataIndex: "t_remaining",
            key: "t_remaining",
        },
        {
            title: "Affectation",
            dataIndex: "affectation",
            key: "affectation",
        },
        {
            title: "T-Affectation",
            dataIndex: "t_affectation",
            key: "t_affectation",
        },
    ];

    const onRowClick = (person: Person) => ({
        onClick: () => {
            setSelectedPerson(person);
        },
    });


    const filterPersonById = (persons: Person[]) => {
        if (personId != undefined) return persons.filter((person) => person.id === personId[0]);
        else return persons;
    };
    const expandedRowRender = (record: DayGroup) => (
        <Table
            columns={columnsPeople}
            dataSource={filterPersonById(record.people)}
            pagination={false}
            onRow={onRowClick}
        />
    );

    const columnsDayGroups: ColumnsType<DayGroup> = [
        {title: "Date", dataIndex: "date", key: "date"},
    ];

    const addData = (values: DataType) => {
        console.log(values);
        form.resetFields();
        setIsModalOpen(false);
    };

    const filterDataByTeam = (team: string) => {
        return teamGroupData.filter((group) => group.team === team);
    };
    const handleTabChange = (key: string) => {
        setSelectedPerson(null);
    };

    const groupData = (data: Person[], groupBy: string) => {
        // Implementa tu lógica de agrupación aquí
        // Esto es solo un esqueleto de la función
        return data; // Devuelve los datos agrupados
    };
    const handleDateChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
        // if (dates) {
        //     const [start, end] = dates.map(date => new Date(date.valueOf()));
        //     const filtered = data.filter(d =>
        //         d.date >= start && d.date <= end
        //     );
        //     setFilteredData(groupData(filtered, groupBy));
        // }
    };

    // Manejador del selector de agrupación
    const handleGroupByChange = (value: string) => {
        setGroupBy(value);
        setFilteredData(groupData(filteredData, value)); // Actualiza los datos filtrados según el nuevo agrupamiento
    };

    const tabsItems = teamsData.map((team) => ({
        label: team,
        key: team,
        children: (
            <Row gutter={16}>
                <Col span={12}>
                    <Table
                        columns={columnsDayGroups}
                        dataSource={filterDataByTeam(team)}
                        pagination={{
                            pageSize: 2, // Número de elementos por página
                        }}
                        expandable={{expandedRowRender}} // Usar la función existente expandedRowRender para manejar el siguiente nivel
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

                        <Skeleton></Skeleton>
                    )}
                </Col>
            </Row>
        ), // Aquí puedes renderizar componentes más complejos basados en tu data
    }));

    const [form] = Form.useForm();
    return (
        <>
            <div className="button-container">
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Add tracing
                </Button>
                <RangePicker onChange={handleDateChange}/>
                <Select defaultValue="Diario" style={{width: 120}} onChange={handleGroupByChange}>
                    <Option value="Diario">Daily</Option>
                    <Option value="Semanal">Weekly</Option>
                    <Option value="Quincenal">Biweekly</Option>
                    <Option value="Mensual">Monthly</Option>
                    <Option value="Trimestral">Quarterly</Option>
                    <Option value="Semestral">Biannual</Option>
                    <Option value="Anual">Annual</Option>
                </Select>
            </div>
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
                <TracingForm
                    addData={addData}
                    form={form}
                    setSelectedValues={setSelectedValues}>

                </TracingForm>
            </Modal>
        </>
    );
}

