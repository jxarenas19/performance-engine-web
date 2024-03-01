// CustomTable.tsx
import React from 'react';
import { Table, Select, InputNumber } from 'antd';
import { useTable } from '@/app/context/TableContext';

const { Option } = Select;

const CustomTable: React.FC = () => {
    const { state, dispatch } = useTable();

    const handleAddItem = () => {
        const newItem = {
            key: `new_${Date.now()}`,
            selectValue: 'value1', // Valor por defecto
            numericValue: 0, // Valor por defecto
        };
        dispatch({ type: 'ADD_ITEM', payload: newItem });
    };

    const columns = [
        {
            title: 'Select',
            dataIndex: 'selectValue',
            render: (_, record) => (
                <Select defaultValue={record.selectValue} style={{ width: 120 }}>
                    <Option value="people_attended">PEOPLE ATTENDED</Option>
                    <Option value="value2">PEOPLE_ENTERED_TO_SYSTEM</Option>
                </Select>
            ),
        },
        {
            title: 'Número',
            dataIndex: 'numericValue',
            render: (_, record) => (
                <InputNumber defaultValue={record.numericValue} />
            ),
        },
    ];

    return (
        <>
            <Table dataSource={state} columns={columns} pagination={false} scroll={{ y: 100 }} />
            <button onClick={handleAddItem}>Añadir elemento</button>
        </>
    );
};

export default CustomTable;
