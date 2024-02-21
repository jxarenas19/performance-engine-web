import { Button, DatePicker, Select } from "antd";


const TracingFilters: React.FC<{}> = () => {
    
    return (
        <div className="button-container">
                <Button type="primary" onClick={() => /*setIsModalOpen(true)*/''}>
                    Add tracing
                </Button>
                <DatePicker onChange={() => ''}/>
                <Select defaultValue="Diario" style={{width: 120}} onChange={() => ''}>
                    <Select value="Diario">Daily</Select>
                    <Select value="Semanal">Weekly</Select>
                    <Select value="Quincenal">Biweekly</Select>
                    <Select value="Mensual">Monthly</Select>
                    <Select value="Trimestral">Quarterly</Select>
                    <Select value="Semestral">Biannual</Select>
                    <Select value="Anual">Annual</Select>
                </Select>
            </div>
    );
};

export default TracingFilters;
