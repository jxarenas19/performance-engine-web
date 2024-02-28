import React, {useContext} from 'react';
import {Table, TableColumnsType} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {DayGroup, Person} from "@/app/utils/types";
import {TracingContext} from "@/app/context/tracingContext";
import {HeartOutlined, SmileOutlined} from "@ant-design/icons";
import TimeWorked from "@/app/components/TimeWorked";
import {TablePaginationConfig} from "antd/lib";

const ExpandableDayGroups = () => {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;
    const personId = undefined;
    const filterPersonById = (persons: Person[]) => {
        if (personId != undefined) return persons.filter((person) => person.id === personId);
        else return persons;
    };
    const onRowClick = (person: Person) => ({
        onClick: () => {
            dispatch({type: 'SET_SELECTED_PERSON', payload: person});
        },
    });
    const handleTableChange = (pagination:TablePaginationConfig) => {
        const page = pagination.current ?? 1;
        const limit = pagination.pageSize ?? state.limit;

        dispatch({ type: 'SET_PAGE', payload: page });
        dispatch({ type: 'SET_PAGE_SIZE', payload: limit });
    };
    const columnsDayGroups: ColumnsType<DayGroup> = [
        {title: "Date", dataIndex: "date", key: "date"},
    ];

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
    const expandedRowRender = (record: DayGroup) => (
        <Table
            columns={columnsPeople}
            dataSource={filterPersonById(record.people)}
            pagination={false}
            onRow={onRowClick}
        />
    );

    return state.isLoading ? <p>Cargando...</p> :
        (<Table
            columns={columnsDayGroups}
            dataSource={state.tracings}
            pagination={{
                current: state.page,
                pageSize: state.limit,
                total: state.total,
            }}
            onChange={handleTableChange}
            expandable={{expandedRowRender}}
        />)

};

export default ExpandableDayGroups;
