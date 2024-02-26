"use client";

import React, {useContext, useEffect} from "react";
import {Col, Modal, Row, Skeleton, Tabs} from "antd";
import TracingForm from "@/app/components/TracingForm";
import TracingFilters from "@/app/components/TracingFilters";
import {TracingContext} from "@/app/context/tracingContext";
import {getAffectations, getTeams, getTracings, getUsers} from "@/app/hooks/useTracingApi";
import ExpandableRequiriments from "@/app/components/ExpandableRequiriments";
import ExpandableDayGroups from "@/app/components/ExpandableDayGroups";


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
        const response =  await getTeams({page: 1, limit: 0});
        console.log(response)
        dispatch({type: 'SET_TEAMS', payload: response});
    }
    const fetchUsersData = async () => {
        const response =  await getUsers();
        dispatch({type: 'SET_USERS', payload: response});
    }
    const fetchAffectationsData = async () => {
        const response =  await getAffectations({page: 1, limit: 0});
        dispatch({type: 'SET_AFFECTATIONS', payload: response});
    }
    useEffect(() => {
        fetchFilteredData();
    }, [state.filters]);

    useEffect(() => {
        dispatch({type: 'LOADING_TRACINGS', isLoading: true});
        fetchTeamsData();
        fetchUsersData();
        fetchAffectationsData();
        dispatch({type: 'LOADING_TRACINGS', isLoading: false});
    }, []);


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
                    <ExpandableDayGroups></ExpandableDayGroups>
                </Col>
                <Col span={12}>
                    <ExpandableRequiriments></ExpandableRequiriments>
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

