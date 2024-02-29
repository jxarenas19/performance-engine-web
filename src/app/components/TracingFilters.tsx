import {Button, DatePicker, Select} from "antd";
import {useContext, useState} from "react";
import {TracingContext} from "@/app/context/tracingContext";
import {Filters} from "@/app/utils/types";
import {DeleteOutlined} from "@ant-design/icons";


const TracingFilters: React.FC = () => {

    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;
    const [date, setDate] = useState(null);
    const [group, setGroup] = useState('Daily');
    const setIsModalOpen = () => {
        dispatch({type: 'SET_MODAL_OPEN', payload: true});
    };

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
            <Button type="primary" onClick={setIsModalOpen}>
                Add tracing
            </Button>
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
                clearFilters(['dateStart', 'dateEnd','group'])

            }}>
            </Button>
        </div>
    );
};

export default TracingFilters;
