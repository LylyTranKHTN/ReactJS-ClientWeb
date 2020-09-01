import React from 'react';
import PropTypes from 'prop-types';

function PhoneInput(props) {
    const {options} = props;
    const {color, backgroundColor} = options;
    return <input type="number" style={{color, backgroundColor}}  />;
}

PhoneInput.propTypes = {
    options: PropTypes.shape({}),
}
  
PhoneInput.defaultProps = {
    options: {
        color: "red"
    }
};

export default PhoneInput;
