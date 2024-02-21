"use client";

import React, {useContext} from "react";
import {Col, Form, Modal, Row, Skeleton, Table, TableColumnsType, Tabs} from "antd";
import type {ColumnsType} from "antd/es/table";
import {DataType, DayGroup, Person, Requirement} from "@/app/utils/types";
import {teamGroupData, teamsData} from "@/app/utils/data";
import TracingForm from "@/app/components/TracingForm";
import TimeWorked from "@/app/components/TimeWorked";
import {HeartOutlined, SmileOutlined} from "@ant-design/icons";
import {RangePickerProps} from 'antd/es/date-picker';
import {createTracing} from "@/app/hooks/useTracingApi";
import TracingFilters from "@/app/components/TracingFilters";
import {TracingContext} from "@/app/context/tracingContext";


export default function Temp() {

    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    const personId = state.personId;

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
            dispatch({type: 'SET_SELECTED_PERSON', payload: person});
        },
    });

    const filterPersonById = (persons: Person[]) => {
        if (personId != undefined) return persons.filter((person) => person.id === personId);
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
    const fetchTracing = async (values: DataType) => {
        return await createTracing(values)
    }
    const addData = (values: DataType) => {
        console.log(values);
        form.resetFields();
        const response = fetchTracing(values);
        console.log(response)
        dispatch({type: 'SET_MODAL_OPEN', payload: !state.isModalOpen});
    };

    const filterDataByTeam = (team: string) => {
        return teamGroupData.filter((group) => group.team === team);
    };
    const handleTabChange = (key: string) => {
        dispatch({type: 'SET_SELECTED_PERSON', payload: null});
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

    const handleGroupByChange = (value: string) => {
        dispatch({type: 'SET_GROUP_BY', payload: value});
        dispatch({type: 'SET_FILTERED_DATA', payload: groupData(state.filteredData, value)});
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
                    {state.selectedPerson ? (
                        <Table
                            columns={columnsRequirements}
                            dataSource={state.selectedPerson.requirements}
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
            <TracingFilters></TracingFilters>
            <Tabs
                defaultActiveKey="1"
                onChange={handleTabChange}
                items={tabsItems}
            ></Tabs>
            <Modal
                title="Tracing time"
                open={state.isModalOpen}
                onCancel={() => dispatch({type: 'SET_MODAL_OPEN', payload: !state.isModalOpen})}
                footer={null}
            >
                <TracingForm
                    addData={addData}
                    form={form}
                >
                </TracingForm>
            </Modal>
        </>
    );
}

