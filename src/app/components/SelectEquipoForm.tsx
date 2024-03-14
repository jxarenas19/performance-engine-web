import {Form, Select} from "antd";
import {useContext} from "react";
import {TracingContext} from "@/app/context/tracingContext";
import {FormInstance} from "antd/es/form/hooks/useForm";

interface ChildComponentProps {
    form: FormInstance<any>;
}
const SelectEquipoForm = (form:any ) => {
    const context = useContext(TracingContext);
    if (!context) throw new Error('TracingContext must be used within TracingProvider');
    const {state, dispatch} = context;

    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [newItem, setNewItem] = useState('');

    // const fetchTeam = async (value:string) => {
    //     return await createTeam(value)
    // }
    // const handleAddNewItem = () => {
    //
    //     if (newItem) {
    //         const response = fetchTeam(newItem);
    //         response.then(value => {
    //             console.log(value)
    //             dispatch({type: 'SET_TEAMS', payload: [...state.teams,
    //                     {'id':value.data.id,"name":value.data.name}]});
    //             setNewItem('');
    //             setIsModalOpen(false);
    //         });
    //     }
    // };
    const handleClick = (value: string) => {
        const selectedOption = state.teams.find(option => option.id === value);
        if(selectedOption){
            console.log(form)
            form.form.resetFields(['title'])
            dispatch({type: 'SET_SELECTED_TEAM', payload: selectedOption.name});
        }

    };
    return (
        <div>
            <Form.Item name="team" label="Team" hidden={!state.authenticatedUser?.is_admin} className="customFormItem" rules={[{ required: true }]}>
                <Select
                        loading={state.isLoading} placeholder="Select a project" allowClear onSelect={handleClick}>
                    {state.teams.map((option) => (
                        <Select.Option
                            key={option.id}
                            value={option.id}
                        >
                            {option.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {/*<Button*/}
            {/*    type="primary"*/}
            {/*    icon={<PlusOutlined/>}*/}
            {/*    onClick={() => setIsModalOpen(true)}*/}
            {/*    style={{marginLeft: '8px' ,marginTop:'22px'}}*/}
            {/*>*/}
            {/*</Button>*/}

            {/*<Modal*/}
            {/*    title="Add team"*/}
            {/*    open={isModalOpen}*/}
            {/*    onOk={handleAddNewItem}*/}
            {/*    onCancel={() => setIsModalOpen(false)}*/}
            {/*>*/}
            {/*    <Form>*/}
            {/*        <Form.Item label="New team">*/}
            {/*            <Input value={newItem} onChange={(e) => setNewItem(e.target.value)}/>*/}
            {/*        </Form.Item>*/}
            {/*    </Form>*/}
            {/*</Modal>*/}
        </div>
    );
};

export default SelectEquipoForm;
