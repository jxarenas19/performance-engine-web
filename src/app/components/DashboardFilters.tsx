import {Button, DatePicker, Select} from "antd";
import React, {useContext, useState} from "react";
import {Filters} from "@/app/utils/types";
import {DeleteOutlined} from "@ant-design/icons";
import {useDasboard} from "@/app/context/DashboardContext";
import {TracingContext} from "@/app/context/tracingContext";

interface DashboardFiltersProps {
    fetchDashboardData: () => Promise<void>;
}
const DashboardFilters: React.FC<DashboardFiltersProps> = ({ fetchDashboardData }) => {

    const context = useDasboard()
    if (!context) throw new Error('DashboardContext must be used within DashboardProvider');
    const {stateDashboard, dispatchDashboard} = context;
    const [date, setDate] = useState(null);
    const [group, setGroup] = useState('Daily');
    const [team, setTeam] = useState(null);

    const contextGlobal = useContext(TracingContext);
    if (!contextGlobal) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = contextGlobal;

    const updateFilter = (key: keyof Filters, value: string) => {
        dispatchDashboard({ type: 'SET_FILTER', key, value });
    };
    const rangeDateFilter = (dateRange: any) => {
        setDate(dateRange);
        const startDate = dateRange[0].format('YYYY-MM-DD');
        const endDate = dateRange[1].format('YYYY-MM-DD');
        updateFilter('dateStart',startDate)
        updateFilter('dateEnd',endDate)

    }
    const clearFilters = (keys: (keyof Filters)[]) => {
        dispatchDashboard({ type: 'REMOVE_FILTER', keys });
        setDate(null);
        setTeam(null);
        setGroup('Daily');
    };
    const groupFilter = (value: string) => {
        setGroup(value)
        updateFilter('group',value)
    }
    const handleClick = (value: any) => {
        setTeam(value)
        updateFilter('team',value)

    };
    return (
        <div className="button-container">
            <Select value={team}
                loading={state.isLoading} placeholder="Select a team" allowClear onChange={handleClick}>
                {state.teams.map((option) => (
                    <Select.Option
                        key={option.id}
                        value={option.id}
                    >
                        {option.name}
                    </Select.Option>
                ))}
            </Select>
            <DatePicker.RangePicker value={date} onChange={rangeDateFilter}/>
            <Select  value={group} defaultValue="Daily" style={{width: 120}} onChange={groupFilter}>
                <Select.Option key="Daily" value="Daily">Daily</Select.Option>
                <Select.Option key="Weekly" value="Weekly">Weekly</Select.Option>
                <Select.Option key="Biweekly" value="Biweekly">Biweekly</Select.Option>
                <Select.Option key="Monthly" value="Monthly">Monthly</Select.Option>
                <Select.Option key="Quarterly" value="Quarterly">Quarterly</Select.Option>
                <Select.Option key="Biannual" value="Biannual">Biannual</Select.Option>
                <Select.Option key="Annual" value="Annual">Annual</Select.Option>
            </Select>
            <Button  icon={<DeleteOutlined />} type="primary" onClick={() => {
                clearFilters(['dateStart', 'dateEnd','group','team'])

            }}>
            </Button>
        </div>
    );
};

export default DashboardFilters;
