"use client";

import React, {useContext, useEffect, useState} from "react";
import {Card, Col, Modal, notification, Row, Tabs, Typography} from "antd";
import TracingForm from "@/app/components/TracingForm";
import TracingFilters from "@/app/components/TracingFilters";
import {TracingContext} from "@/app/context/tracingContext";
import {
    getActivities,
    getAffectations,
    getChartByTime,
    getScore,
    getTeams,
    getTracings,
    getUsers
} from "@/app/hooks/useTracingApi";
import ExpandableRequiriments from "@/app/components/ExpandableRequiriments";
import ExpandableDayGroups from "@/app/components/ExpandableDayGroups";
import eventEmitter from "../utils/eventEmitter";
import {Filters, UserData} from "@/app/utils/types";
import ChartByTime from "@/app/components/chart/ChartByTime";
import StatisticsCardUser from "@/app/components/chart/StatisticsCardUser";

export default function Temp() {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;
    const [initialized, setInitialized] = useState(false);
    const [loadedTeam, setloadedTeam] = useState(false);

    const { Title, Text } = Typography;

    const fetchFilteredData = async () => {
        let filters_temp= filterTemp()
        if (loadedTeam) {
            dispatch({type: 'LOADING_TRACINGS', isLoading: true});
            console.log('entro datos trabajdo')
            const response = await getTracings(
                {
                    page: state.page,
                    limit: state.limit,
                    filters: [filters_temp]
                });
            if (response) {
                dispatch({type: 'SET_TRACINGS', payload: response.data});
                dispatch({type: 'SET_TOTAL', payload: response.total});
            } else dispatch({type: 'SET_TRACINGS', payload: []});
        }

    };
    const updateFilter = (key: keyof Filters, value: string) => {
        dispatch({type: 'SET_FILTER', key, value});
    };
    const fetchTeamsData = async () => {
        dispatch({type: 'LOADING_TRACINGS', isLoading: true});
        if (state.filters.user_id) {
            let filters_temp: Filters = {};
            filters_temp.user_id = state.filters.user_id;

            const response = await getTeams({page: 1, limit: 0, filters: [filters_temp]});
            dispatch({type: 'SET_TEAMS', payload: response});
            if (response.length > 0) {
                setloadedTeam(true)
                updateFilter('team', response[0].id)
            }
        } else {
            const response = await getTeams({page: 1, limit: 0,filters: []});
            dispatch({type: 'SET_TEAMS', payload: response});
            if (response.length > 0) {
                setloadedTeam(true)
                updateFilter('team', response[0].id)
            }
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
    const filterTemp = () => {
        let filters_temp: Filters = {};
        if(state.filters.type=='team' && !state.filters.userIdScore){
            filters_temp.type = state.filters.type
        }
        filters_temp.dateStart = state.filters.dateStart
        filters_temp.dateEnd = state.filters.dateEnd
        filters_temp.user_id = state.filters.userIdScore
        filters_temp.group = state.filters.groupScore ? state.filters.groupScore : "Daily"
        return filters_temp
    }

    const filterTemp2 = () => {
        let filters_temp: Filters = {};
        filters_temp.dateStart = state.filters.dateStart
        filters_temp.dateEnd = state.filters.dateEnd
        filters_temp.user_id = state.filters.user_id
        filters_temp.group = state.filters.group
        return filters_temp
    }
    const fetchScoreData = async () => {
        let filters_temp= filterTemp()
        const response = await getScore({
            page: 1,
            limit: 10,
            filters: [filters_temp]});
        console.log(response)
        dispatch({type: 'SET_SCORE', payload: response});
    }
    const fetchChartByTimeData = async () => {
        let filters_temp= filterTemp()
        const response = await getChartByTime({
            page: 0,
            limit: 0,
            filters: [filters_temp]});
        console.log(response)
        dispatch({type: 'SET_CHART_BY_TIME', payload: response});
    }

    useEffect(() => {
        const user: UserData = {
            user_id: '2458e4c8-80e1-70a8-e6e4-4d57fa2e5061',
            name: 'Messi',
            is_admin: true
        }
        if (!user.is_admin) {
            updateFilter('user_id', user.user_id)
            updateFilter('type', 'user')
        }
        else{
            updateFilter('type', 'team')
        }
        dispatch({type: 'SET_USER_AUTHENTICATED', payload: user});
        setInitialized(true);

    }, []);

    useEffect(() => {
        if (initialized) {
            fetchTeamsData();
            fetchUsersData();
            fetchActivitiesData();
            fetchAffectationsData();
            fetchChartByTimeData();
        }
    }, [initialized,state.lastUpdated]);

    useEffect(() => {
        if (initialized && state.filters.userIdScore && state.filters.userIdScore) {
            fetchScoreData();
        }
    }, [state.filters.groupScore,state.filters.userIdScore]);

    useEffect(() => {
        fetchFilteredData();
    }, [state.lastUpdated,initialized, state.filters.team, state.filters.dateEnd, state.filters.group, state.limit, state.page]);


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
        const selectedTeam = tabsItems.find(item => item.key === key);
        const teamName = selectedTeam?.label || key;
        dispatch({type: 'SET_SELECTED_PERSON', payload: null});
        dispatch({type: 'SET_SELECTED_TEAM', payload: teamName});
        updateFilter('team', key)
        console.log(key)
    };

    const tabsItems = state.teams.map((team) => ({
        label: team.name,
        key: team.id,
        children: (
            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                    <Card bordered={false} className="criclebox cardbody h-full">
                        <div className="ant-list-box table-responsive">
                            <ExpandableDayGroups></ExpandableDayGroups>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                    <Card bordered={false} className="criclebox cardbody h-full">
                        <div className="ant-list-box table-responsive">
                            <ExpandableRequiriments></ExpandableRequiriments>
                        </div>
                    </Card>
                </Col>
            </Row>
        ),
    }));


    return (
        <>
            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                    <Card bordered={false} className="criclebox h-full">
                        <ChartByTime />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                    <StatisticsCardUser></StatisticsCardUser>
                </Col>
            </Row>
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card bordered={false} className="criclebox tablespace mb-24">
                        <TracingFilters></TracingFilters>
                        {state.teams.length > 0 && (
                            <Tabs
                                defaultActiveKey="1"
                                onTabClick={handleTabChange}
                                items={tabsItems}
                            ></Tabs>
                        )}
                    </Card>
                </Col>
            </Row>
            <Modal
                title="Tracing time"
                open={state.isModalOpen}
                onCancel={() => {
                    dispatch({type: 'SET_MODAL_OPEN', payload: !state.isModalOpen});
                    dispatch({type: 'SET_SELECTED_TASK', payload: null});
                }}
                footer={null}
            >

                <TracingForm>
                </TracingForm>
            </Modal>
        </>
    );
}

