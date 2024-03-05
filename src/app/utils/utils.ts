import {DataForm} from "@/app/utils/types";

export const extractKeyValuePairs = (inputText: string): Record<string, string> =>{
    const record: Record<string, string> = {};
    const lines = inputText.split("\n");
    lines.forEach(line => {
        if (line.trim()) { // Asegura que no procesa líneas vacías
            const [key, value] = line.split(": ");
            if (key && value) {
                // Elimina las comillas de los valores y trim los espacios en blanco
                record[key.trim()] = value.replace(/^"|"$/g, '').trim();
            }
        }
    });
    return record;
}

export const convertKeyValueToFormData = (data:Record<string, string>): DataForm =>{
    const keys: string[] = Object.keys(data);
    const formData: Record<string, string> = {
        team: "",
        title: "",
        sub: "",
        detail: "",
        t_spent: "",
        t_remaining: "",
        affectation: "",
        t_affectation: ""
    };
    keys.forEach(key => {
        formData[convertKey[key]] = data[key]
    });
    return formData as DataForm;
}

const convertKey:Record<string, string> = {
    "Team":'team',
    "Employee":'sub',
    "Title":'title',
    "Detail":'detail',
    "Time employee":'t_spent',
    "Time remaining":'t_remaining',
    "Time affectation":'t_affectation'
}
