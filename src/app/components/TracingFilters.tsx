import { Button, DatePicker, Select } from "antd";
import {useContext} from "react";
import {TracingContext} from "@/app/context/tracingContext";


const TracingFilters: React.FC = () => {

    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;
    const setIsModalOpen = () => {
        dispatch({type: 'SET_MODAL_OPEN', payload: true});
    };
    return (
        <div className="button-container">
                <Button type="primary" onClick={setIsModalOpen}>
                    Add tracing
                </Button>
                <DatePicker onChange={() => ''}/>
                <Select defaultValue="Diario" style={{width: 120}} onChange={() => ''}>
                    <Select.Option value="Diario">Daily</Select.Option>
                    <Select.Option value="Semanal">Weekly</Select.Option>
                    <Select.Option value="Quincenal">Biweekly</Select.Option>
                    <Select.Option value="Mensual">Monthly</Select.Option>
                    <Select.Option value="Trimestral">Quarterly</Select.Option>
                    <Select.Option value="Semestral">Biannual</Select.Option>
                    <Select.Option value="Anual">Annual</Select.Option>
                </Select>
            </div>
    );
};

export default TracingFilters;
