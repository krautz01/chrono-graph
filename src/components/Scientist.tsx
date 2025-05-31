import React from 'react';

interface ScientistProps {
    name: string;
    field: string;
    notableWork: string;
}

const Scientist: React.FC<ScientistProps> = ({ name, field, notableWork }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
            <h2>{name}</h2>
            <p><strong>Field:</strong> {field}</p>
            <p><strong>Notable Work:</strong> {notableWork}</p>
        </div>
    );
};

export default Scientist;