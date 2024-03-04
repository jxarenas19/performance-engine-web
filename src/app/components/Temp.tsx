"use client";

import React, {useContext, useEffect} from "react";
import {Col, Modal, notification, Row, Tabs} from "antd";
import TracingForm from "@/app/components/TracingForm";
import TracingFilters from "@/app/components/TracingFilters";
import {TracingContext} from "@/app/context/tracingContext";
import {getActivities, getAffectations, getTeams, getTracings, getUsers} from "@/app/hooks/useTracingApi";
import ExpandableRequiriments from "@/app/components/ExpandableRequiriments";
import ExpandableDayGroups from "@/app/components/ExpandableDayGroups";
import eventEmitter from "../utils/eventEmitter";
import {Filters} from "@/app/utils/types";
import {TableProvider} from "@/app/context/TableContext";

export default function Temp() {

    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    const fetchFilteredData = async () => {
        dispatch({type: 'LOADING_TRACINGS', isLoading: true});
        const response = await getTracings(
            {page: state.page,
                limit: state.limit,
                filters: [state.filters]});
        if (response) {
            dispatch({type: 'SET_TRACINGS', payload: response.data});
            dispatch({type: 'SET_TOTAL', payload: response.total});
        }
        else dispatch({type: 'SET_TRACINGS', payload: []});
    };
    const updateFilter = (key: keyof Filters, value: string) => {
        dispatch({ type: 'SET_FILTER', key, value });
    };
    const fetchTeamsData = async () => {
        dispatch({type: 'LOADING_TRACINGS', isLoading: true});
        const response = await getTeams({page: 1, limit: 0});
        dispatch({type: 'SET_TEAMS', payload: response});
        if (response.length > 0) {
            updateFilter('team',response[0].id)
        }

        dispatch({type: 'LOADING_TRACINGS', isLoading: false});

    }
    const fetchUsersData = async () => {
        const response = await getUsers();
        dispatch({type: 'SET_USERS', payload: response});
    }
    const fetchActivitiesData = async () => {
        const response = await getActivities({page: 1, limit: 0});
        dispatch({type: 'SET_ACTIVITIES', payload: response});
    }
    const fetchAffectationsData = async () => {
        const response = await getAffectations({page: 1, limit: 0});
        dispatch({type: 'SET_AFFECTATIONS', payload: response});
    }

    useEffect(() => {
        console.log(state.filters)
        fetchFilteredData();
    }, [state.filters.team,state.filters.dateEnd,state.filters.group, state.limit,state.page]);

    useEffect(() => {
        fetchTeamsData();
        fetchUsersData();
        fetchActivitiesData();
        fetchAffectationsData();
    }, []);

    useEffect(() => {
        const handleApiError = (message: string) => {
            notification.error({
                message: 'API error',
                description: message,
                duration: 2.5,
            });
        };
        eventEmitter.on<string>('apiError', handleApiError);
        return () => {
            eventEmitter.removeListener<string>('apiError', handleApiError);
        };
    }, [dispatch]);

    const handleTabChange = (key: string) => {
        dispatch({type: 'SET_SELECTED_PERSON', payload: null});
        updateFilter('team',key)

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
        <TableProvider>
            <TracingFilters></TracingFilters>
            {state.teams.length > 0 && (
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
        </TableProvider>
    );
}

