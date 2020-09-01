import React from 'react';
import Select from 'react-select';
import './styles.scss';

const SelectComponent = ({ ...rest }) => {
    return (
        <Select
            className="select-field-component"
            classNamePrefix="select-field"
            {...rest}
        />
    )
}

export default SelectComponent;
