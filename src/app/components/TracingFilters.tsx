import {Button, DatePicker, Select} from "antd";
import {useContext} from "react";
import {TracingContext} from "@/app/context/tracingContext";


const TracingFilters: React.FC = () => {

    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    const setIsModalOpen = () => {
        dispatch({type: 'SET_MODAL_OPEN', payload: true});
    };
    const rangeDateFilter = (dateRange: any) => {
        const startDate = dateRange[0].format('YYYY-MM-DD');
        const endDate = dateRange[1].format('YYYY-MM-DD');
        dispatch({type: 'SET_FILTER', payload: {key: 'dateStart', value: startDate}});
        dispatch({type: 'SET_FILTER', payload: {key: 'dateEnd', value: endDate}});
    }
    const groupFilter = (value: string) => {
        //dispatch({type: 'SET_FILTER', payload: {key: 'group', value: value}});
    }
    return (
        <div className="button-container">
            <Button type="primary" onClick={setIsModalOpen}>
                Add tracing
            </Button>
            <DatePicker.RangePicker onChange={rangeDateFilter}/>
            <Select defaultValue="Daily" style={{width: 120}} onChange={groupFilter}>
                <Select.Option key="Daily" value="Daily">Daily</Select.Option>
                <Select.Option key="Weekly" value="Weekly">Weekly</Select.Option>
                <Select.Option key="Biweekly" value="Biweekly">Biweekly</Select.Option>
                <Select.Option key="Monthly" value="Monthly">Monthly</Select.Option>
                <Select.Option key="Quarterly" value="Quarterly">Quarterly</Select.Option>
                <Select.Option key="Biannual" value="Biannual">Biannual</Select.Option>
                <Select.Option key="Annual" value="Annual">Annual</Select.Option>
            </Select>
        </div>
    );
};

export default TracingFilters;
