import {Button, DatePicker, Modal, Select} from "antd";
import {useContext, useState} from "react";
import {TracingContext} from "@/app/context/tracingContext";
import {DataForm, Filters} from "@/app/utils/types";
import {BarChartOutlined, DeleteOutlined, ReloadOutlined} from "@ant-design/icons";
import DashboardPage from "@/app/(pages)/dashboard/page";


const TracingFilters: React.FC = () => {

    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;
    const [date, setDate] = useState(null);
    const [group, setGroup] = useState('Daily');
    const setIsModalOpen = () => {
        dispatch({type: 'SET_MODAL_OPEN', payload: true});
        if (state.selectedTeam){
            const team_id = state.teams.find(item => item.name === state.selectedTeam)?.id;
            const dataForm:DataForm = {
                team:team_id
            }
            dispatch({type: 'SET_SELECTED_TASK', payload: dataForm});
        }
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
        dispatch({type: 'SET_SELECTED_PERSON', payload: null});

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
    const reloadTable = () => {
        dispatch({ type: 'RELOAD_DATA' });
        dispatch({type: 'SET_SELECTED_PERSON', payload: null});
    }
    const loadDashboard = () => {
        dispatch({type: 'SET_MODAL_DASHBOARD_OPEN', payload: true});
        console.log(state.isModalDashboardOpen)
    }
    const handleCancel = () => {
        dispatch({type: 'SET_MODAL_DASHBOARD_OPEN', payload: false});
    };
    return (
        <div className="button-container">
            <Button type="primary"
                    style={{height:'24px'}}
                    onClick={setIsModalOpen}>
                Add tracing
            </Button>
            <DatePicker.RangePicker  size="small" value={date} onChange={rangeDateFilter}/>
            <Select  value={group} defaultValue="Daily" style={{width: 120,height:24}} onChange={groupFilter}>
                <Select.Option key="Daily" value="Daily">Daily</Select.Option>
                <Select.Option key="Weekly" value="Weekly">Weekly</Select.Option>
                <Select.Option key="Biweekly" value="Biweekly">Biweekly</Select.Option>
                <Select.Option key="Monthly" value="Monthly">Monthly</Select.Option>
                <Select.Option key="Quarterly" value="Quarterly">Quarterly</Select.Option>
                <Select.Option key="Biannual" value="Biannual">Biannual</Select.Option>
                <Select.Option key="Annual" value="Annual">Annual</Select.Option>
            </Select>
            <Button style={{height:'24px'}} icon={<DeleteOutlined />} type="primary" onClick={() => {
                clearFilters(['dateStart', 'dateEnd','group'])

            }}>
            </Button>
            <Button style={{height:'24px'}} icon={<ReloadOutlined />} type="primary" onClick={reloadTable}>
            </Button>
            <Button  style={{height:'24px'}} icon={<BarChartOutlined />} type="primary" onClick={loadDashboard}>
            </Button>
            <Modal
                title="Chart Dashboard"
                open={state.isModalDashboardOpen}
                onCancel={handleCancel}
                width="90%"  // Ajusta el ancho según necesites
                footer={null}  // Elimina el pie del modal si no necesitas botones de acción
            >
                <DashboardPage />
            </Modal>
        </div>
    );
};

export default TracingFilters;
