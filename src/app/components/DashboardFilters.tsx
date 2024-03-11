import {Button, DatePicker, Select} from "antd";
import {useState} from "react";
import {Filters} from "@/app/utils/types";
import {DeleteOutlined} from "@ant-design/icons";
import {useDasboard} from "@/app/context/DashboardContext";


const DashboardFilters: React.FC = () => {

    const context = useDasboard()
    if (!context) throw new Error('DashboardContext must be used within DashboardProvider');
    const {state, dispatch} = context;
    const [date, setDate] = useState(null);
    const [group, setGroup] = useState('Daily');


    const updateFilter = (key: keyof Filters, value: string) => {
        dispatch({ type: 'SET_FILTER', key, value });
    };
    const rangeDateFilter = (dateRange: any) => {
        setDate(dateRange);
        const startDate = dateRange[0].format('YYYY-MM-DD');
        const endDate = dateRange[1].format('YYYY-MM-DD');
        updateFilter('dateStart',startDate)
        updateFilter('dateEnd',endDate)

    }
    const clearFilters = (keys: (keyof Filters)[]) => {
        dispatch({ type: 'REMOVE_FILTER', keys });
        setDate(null);
        setGroup('Daily');
    };
    const groupFilter = (value: string) => {
        setGroup(value)
        updateFilter('group',value)
    }

    return (
        <div className="button-container">
            <DatePicker.RangePicker value={date} onChange={rangeDateFilter}/>
            <Select  value={group} defaultValue="Daily" style={{width: 120}} onChange={groupFilter}>
                <Select.Option key="Daily" value="Daily">Daily</Select.Option>
                <Select.Option disabled key="Weekly" value="Weekly">Weekly</Select.Option>
                <Select.Option disabled key="Biweekly" value="Biweekly">Biweekly</Select.Option>
                <Select.Option disabled key="Monthly" value="Monthly">Monthly</Select.Option>
                <Select.Option disabled key="Quarterly" value="Quarterly">Quarterly</Select.Option>
                <Select.Option disabled key="Biannual" value="Biannual">Biannual</Select.Option>
                <Select.Option disabled key="Annual" value="Annual">Annual</Select.Option>
            </Select>
            <Button  icon={<DeleteOutlined />} type="primary" onClick={() => {
                clearFilters(['dateStart', 'dateEnd','group'])

            }}>
            </Button>
        </div>
    );
};

export default DashboardFilters;
