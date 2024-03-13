import React, {useContext} from 'react';
import {Table, TableColumnsType, Tooltip} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {DayGroup, Person} from "@/app/utils/types";
import {TracingContext} from "@/app/context/tracingContext";
import {
    BookOutlined,
    CarOutlined,
    CheckCircleOutlined,
    DingdingOutlined,
    PlusOutlined,
    SmileOutlined
} from "@ant-design/icons";
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
            console.log(person)
            dispatch({type: 'SET_SELECTED_PERSON', payload: person});
            dispatch({type: 'SET_SELECTED_TASK', payload: null});
        },
    });
    const handleTableChange = (pagination:TablePaginationConfig) => {
        const page = pagination.current ?? 1;
        const limit = pagination.pageSize ?? state.limit;

        dispatch({ type: 'SET_PAGE', payload: page });
        dispatch({ type: 'SET_PAGE_SIZE', payload: limit });
        dispatch({type: 'SET_SELECTED_PERSON', payload: null});
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
            dataIndex: "plus",
            render: (values) => (
                <div className="icon-column">
                    {values?.map((value:string, index:number) => {
                        let icon = null;

                        switch (value) {
                            case 'compliance':
                                icon = (
                                    <Tooltip title="Compliance" key={`compliance-${index}`}>
                                        <CheckCircleOutlined className="icon-margin" />
                                    </Tooltip>
                                );
                                break;
                            case 'creativity':
                                icon = (
                                    <Tooltip title="Creativity" key={`creativity-${index}`}>
                                        <SmileOutlined className="icon-margin" />
                                    </Tooltip>
                                );
                                break;
                            case 'plus':
                                icon = (
                                    <Tooltip title="Plus" key={`plus-${index}`}>
                                        <PlusOutlined className="icon-margin" />
                                    </Tooltip>
                                );
                                break;
                            case 'performance':
                                icon = (
                                    <Tooltip title="Performance" key={`performance-${index}`}>
                                        <DingdingOutlined className="icon-margin" />
                                    </Tooltip>
                                );
                                break;
                            case 'leadership':
                                icon = (
                                    <Tooltip title="Leadership" key={`leadership-${index}`}>
                                        <BookOutlined className="icon-margin" />
                                    </Tooltip>
                                );
                                break;
                            case 'speed':
                                icon = (
                                    <Tooltip title="Speed" key={`speed-${index}`}>
                                        <CarOutlined className="icon-margin" />
                                    </Tooltip>
                                );
                                break;
                            default:
                                icon = null;
                        }

                        return icon;
                    })}
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
            rowKey="id"

        />
    );

    return (
        <Table
            className="width-100"
            loading={state.isLoading}
            columns={columnsDayGroups}
            dataSource={state.tracings}
            pagination={{
                current: state.page,
                pageSize: state.limit,
                total: state.total,
            }}
            onChange={handleTableChange}
            expandable={{expandedRowRender}}
        />
    )

};

export default ExpandableDayGroups;
