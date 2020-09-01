import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function NumberComponent({options}) {
    const [value, setValue] = React.useState("");

    const handleChangeValue = (e) => {
        console.log(e.target.value);
        if (e.target.value !== '2') {
            setValue(e.target.value);
        } 
    }
    return (
        <div className="number-component">
            <input type="number" value={value}  onChange={handleChangeValue}/>
        </div>
    );
}

NumberComponent.propTypes = {

}
  
NumberComponent.defaultProps = {
};

export default NumberComponent;
