import React, {useState} from 'react';
import JoditEditor from "jodit-react";

interface JoditEditorComponentProps {
    onDetailChange: (detail: string) => void;
}
const JoditEditorComponent: React.FC<JoditEditorComponentProps> = ({ onDetailChange }) => {
    const [detail, setDetail] = useState('');

    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        height: 400,
    };

    return (
        <JoditEditor
            value={detail}
            config={config}
            onBlur={onDetailChange}
            onChange={newDetail => {}}
        />
    );
};

export default JoditEditorComponent;
