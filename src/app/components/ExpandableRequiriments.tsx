import React, {useContext} from 'react';
import {Badge, Button, Descriptions, Skeleton, Table, Tooltip} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {DataForm, Requirement} from "@/app/utils/types";
import {TracingContext} from "@/app/context/tracingContext";
import {
    BookOutlined, CarOutlined,
    CheckCircleOutlined,
    DingdingOutlined,
    EditOutlined,
    PlusOutlined,
    SmileOutlined
} from "@ant-design/icons";
import {StatusData} from "@/app/utils/data";

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
            width: '40%'
        },
        {
            title: "Plus",
            width: '30%',
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
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            width: '20%',
            render: (text) => {
                if (typeof text === 'number'){
                    text = StatusData.find(item => item.id_two === text)?.name;
                }
                let color = '';
                switch (text) {
                    case 'Pending':
                        color = 'green';
                        break;
                    case 'Approved':
                        color = 'blue';
                        break;
                    case 'Refused':
                        color = 'red';
                        break;
                    default:
                        color = 'default';
                }

                return (
                    <Badge color={color} text={text} />
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            render: (record) => (
                <Button type="link" onClick={() => setIsModalOpen(record)}>
                    <EditOutlined />
                </Button>
            ),
        },
    ];
    const setIsModalOpen = (person: any) => {
        console.log(person)
        dispatch({type: 'SET_MODAL_OPEN', payload: true});
        if(state.selectedPerson){
            if (typeof person.status === 'string'){
                person.status = StatusData.find(item => item.name === person.status)?.id_two;
            }
            const dataForm:DataForm = {
                id:person.id,
                status:person.status,
                team:state.selectedPerson.team,
                sub:state.authenticatedUser?.user_id,
                title:person.title,
                detail:person.detail,
                t_spent:person.t_spent,
                t_remaining:person.t_remaining,
                t_affectation:person.t_affectation,
                affectation:person.affectation || [],
                amount:person.amount || 0,
                amount_error:person.amount_error || 0,
                people_attended: person.people_attended || 0,
                people_entered_to_system: person.people_entered_to_system || 0,
                incoming_calls: person.incoming_calls || 0,
                calls_made: person.calls_made || 0,
                activities: person.activities || [],
                plus: person.plus || []
            }
            dispatch({type: 'SET_SELECTED_TASK', payload: dataForm});
        }
    };
    // const onRowClick = (person: any) => ({
    //     onClick: () => {
    //         if(state.selectedPerson){
    //             const dataForm:DataForm = {
    //                 id:state.selectedPerson.id,
    //                 team:state.selectedPerson.team,
    //                 title:person.title,
    //                 detail:person.detail,
    //                 sub:state.authenticatedUser?.user_id,
    //                 t_spent:person.t_spent,
    //                 t_remaining:person.t_remaining,
    //                 t_affectation:person.t_affectation,
    //                 affectation:person.affectation || [],
    //                 amount:person.amount || 1,
    //                 amount_error:person.amount || 0,
    //                 people_attended: person.people_attended || 0,
    //                 people_entered_to_system: person.people_entered_to_system || 0,
    //                 incoming_calls: person.incoming_calls || 0,
    //                 calls_made: person.calls_made || 0,
    //                 activities: person.activities || []
    //             }
    //             dispatch({type: 'SET_SELECTED_TASK', payload: dataForm});
    //         }
    //
    //         console.log(person)
    //         console.log(state.selectedPerson)
    //
    //     },
    // });
    return (
        <div>
            {/*<div style={{ marginBottom: 16, textAlign: 'left' }}>*/}
            {/*    <Button type="primary" disabled={state.selectedTask==null} onClick={setIsModalOpen}>*/}
            {/*        Edit*/}
            {/*    </Button>*/}
            {/*</div>*/}
            {state.selectedPerson ? (
                <Table
                    loading={state.isLoading}
                    columns={columnsRequirements}
                    dataSource={state.selectedPerson.requirements}
                    pagination={{ pageSize: 2 }}
                    expandable={{ expandedRowRender }}
                    // onRow={onRowClick}
                />
            ) : (
                <Skeleton />
            )}
        </div>
    );

};

export default ExpandableRequiriments;
