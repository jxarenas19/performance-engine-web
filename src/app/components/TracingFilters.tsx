import {Button, DatePicker, Select} from "antd";
import {useContext} from "react";
import {TracingContext} from "@/app/context/tracingContext";
import {getTeams} from "@/app/hooks/useTracingApi";


const TracingFilters: React.FC = () => {

    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    const fetchTeamData = async () => {
        dispatch({type: 'LOADING_TRACINGS', isLoading: true});
        const response = await getTeams();
        console.log(response)
        if (response) dispatch({type: 'SET_TEAMS', payload: response.data});
        else dispatch({type: 'SET_TEAMS', payload: []});
    };
    const setIsModalOpen = () => {
        dispatch({type: 'SET_MODAL_OPEN', payload: true});
    };
    const rangeDateFilter = (dateRange: any) => {
        const startDate = dateRange[0].format('YYYY-MM-DD');
        const endDate = dateRange[1].format('YYYY-MM-DD');
        dispatch({type: 'SET_FILTER', payload: {key: 'range', value: startDate + '-' + endDate}});
    }
    const groupFilter = (value: string) => {
        dispatch({type: 'SET_FILTER', payload: {key: 'group', value: value}});
    }
    return (
        <div className="button-container">
            <Button type="primary" onClick={setIsModalOpen}>
                Add tracing
            </Button>
            <DatePicker.RangePicker onChange={rangeDateFilter}/>
            <Select defaultValue="Diario" style={{width: 120}} onChange={groupFilter}>
                <Select.Option key="Diario" value="Diario">Daily</Select.Option>
                <Select.Option key="Weekly" value="Semanal">Weekly</Select.Option>
                <Select.Option key="Biweekly" value="Quincenal">Biweekly</Select.Option>
                <Select.Option key="Monthly" value="Mensual">Monthly</Select.Option>
                <Select.Option key="Quarterly" value="Trimestral">Quarterly</Select.Option>
                <Select.Option key="Biannual" value="Semestral">Biannual</Select.Option>
                <Select.Option key="Annual" value="Anual">Annual</Select.Option>
            </Select>
        </div>
    );
};

export default TracingFilters;
