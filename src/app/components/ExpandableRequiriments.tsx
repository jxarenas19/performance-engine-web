import React, {useContext} from 'react';
import {Button, Descriptions, Skeleton, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {DataForm, Person, Requirement} from "@/app/utils/types";
import {TracingContext} from "@/app/context/tracingContext";

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
        }
    ];
    const setIsModalOpen = () => {
        dispatch({type: 'SET_MODAL_OPEN', payload: true});
    };
    const onRowClick = (person: any) => ({
        onClick: () => {
            if(state.selectedPerson){
                const dataForm:DataForm = {
                    id:state.selectedPerson.id,
                    team:'',
                    title:person.title,
                    detail:person.detail,
                    t_spent:person.t_spent,
                    t_remaining:person.t_remaining,
                    t_affectation:person.t_affectation,
                    affectation:person.affectation || [],
                    amount:person.amount || 1,
                    amount_error:person.amount || 0,
                    people_attended: person.people_attended || 0,
                    people_entered_to_system: person.people_entered_to_system || 0,
                    incoming_calls: person.incoming_calls || 0,
                    calls_made: person.calls_made || 0,
                    activities: person.activities || []
                }
                dispatch({type: 'SET_SELECTED_TASK', payload: dataForm});
            }

            console.log(person)
            console.log(state.selectedPerson)

        },
    });
    return (
        <div>
            <div style={{ marginBottom: 16, textAlign: 'left' }}>
                <Button type="primary" disabled={state.selectedTask==null} onClick={setIsModalOpen}>
                    Edit
                </Button>
            </div>
            {state.selectedPerson ? (
                <Table
                    loading={state.isLoading}
                    columns={columnsRequirements}
                    dataSource={state.selectedPerson.requirements}
                    pagination={{ pageSize: 2 }}
                    expandable={{ expandedRowRender }}
                    onRow={onRowClick}
                />
            ) : (
                <Skeleton />
            )}
        </div>
    );

};

export default ExpandableRequiriments;
