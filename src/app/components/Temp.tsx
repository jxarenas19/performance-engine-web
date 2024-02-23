"use client";

import React, {useContext, useEffect} from "react";
import {Col, Modal, Row, Skeleton, Table, TableColumnsType, Tabs} from "antd";
import type {ColumnsType} from "antd/es/table";
import {DayGroup, Person, Requirement} from "@/app/utils/types";
import TracingForm from "@/app/components/TracingForm";
import TimeWorked from "@/app/components/TimeWorked";
import {HeartOutlined, SmileOutlined} from "@ant-design/icons";
import TracingFilters from "@/app/components/TracingFilters";
import {TracingContext} from "@/app/context/tracingContext";
import {getAffectations, getTeams, getTracings, getUsers} from "@/app/hooks/useTracingApi";


export default function Temp() {

    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    const fetchFilteredData = async () => {
        const response = await getTracings({page: 1, limit: 10, filters: state.filters});
        if (response) dispatch({type: 'SET_TRACINGS', payload: response});
        else dispatch({type: 'SET_TRACINGS', payload: []});
    };
    const fetchTeamsData = async () => {
        dispatch({type: 'LOADING_TRACINGS', isLoading: true});
        const response =  await getTeams();
        console.log(response)
        dispatch({type: 'SET_TEAMS', payload: response});
    }
    const fetchUsersData = async () => {
        const response =  await getUsers();
        dispatch({type: 'SET_USERS', payload: response});
    }
    const fetchAffectationsData = async () => {
        const response =  await getAffectations();
        dispatch({type: 'SET_AFFECTATIONS', payload: response});
    }
    useEffect(() => {
        fetchFilteredData();
    }, [state.filters]);

    useEffect(() => {
        fetchTeamsData();
        fetchUsersData();
        fetchAffectationsData();
    }, []);


    const personId = undefined;

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

    const handleTabChange = (key: string) => {
        dispatch({type: 'SET_SELECTED_PERSON', payload: null});
        dispatch({type: 'SET_FILTER', payload: {key: 'team', value: key}});

    };

    const tabsItems = state.teams.map((team) => ({
        label: team.name,
        key: team.id,
        children: (
            <Row gutter={16}>
                <Col span={12}>
                    {state.isLoading ? <p>Cargando...</p> :
                        <Table
                            columns={columnsDayGroups}
                            dataSource={state.tracings}
                            pagination={{
                                pageSize: 2,
                            }}
                            expandable={{expandedRowRender}} // Usar la función existente expandedRowRender para manejar el siguiente nivel
                        />}
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
        ),
    }));


    return (
        <>
            <TracingFilters></TracingFilters>
            {state.isLoading && <Skeleton/>}
            {!state.isLoading && state.teams.length > 0 && (
                <Tabs
                    defaultActiveKey="1"
                    onTabClick={handleTabChange}
                    items={tabsItems}
                ></Tabs>
            )}
            <Modal
                title="Tracing time"
                open={state.isModalOpen}
                onCancel={() => dispatch({type: 'SET_MODAL_OPEN', payload: !state.isModalOpen})}
                footer={null}
            >
                <TracingForm>
                </TracingForm>
            </Modal>
        </>
    );
}

