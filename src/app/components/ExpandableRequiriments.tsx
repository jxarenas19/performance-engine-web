import React, {useContext} from 'react';
import {Button, Descriptions, Skeleton, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {Requirement} from "@/app/utils/types";
import {TracingContext} from "@/app/context/tracingContext";
import {EditOutlined} from "@ant-design/icons";

const ExpandableRequiriments = () => {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;


    const renderFields = (record: Requirement) => {
        return (
            <Descriptions title="Others data" bordered column={2}>
                <Descriptions.Item label="Spent">{record.t_spent}</Descriptions.Item>
                <Descriptions.Item label="Time affectation">{record.t_affectation}</Descriptions.Item>
                <Descriptions.Item label="Detail">{record.detail}</Descriptions.Item>


            </Descriptions>
        );
    };
    const setIsModalOpen = () => {
        dispatch({type: 'SET_MODAL_OPEN', payload: true});
    };
    const expandedRowRender = (record: Requirement) => {
        return (
            <>
                {renderFields(record)}
            </>
        );
    };

    const columnsRequirements: ColumnsType<Requirement> = [
        //{title: "ID", dataIndex: "id", key: "id"},
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            width: '90%'
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (record) => (
                <Button type="link" onClick={setIsModalOpen}>
                    <EditOutlined />
                </Button>
            ),
        },
    ];

    return state.selectedPerson ? (
        <Table
            loading={state.isLoading}
            columns={columnsRequirements}
            dataSource={state.selectedPerson.requirements}
            pagination={{pageSize: 2}}
            expandable={{
                expandedRowRender
            }}
        />
    ) : (
        <Skeleton/>
    )

};

export default ExpandableRequiriments;
