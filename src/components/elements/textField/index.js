import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import './styles.scss';
import '../../../styles/mainStyle.scss';

const TextFieldComponent = ({
    label,
    input,
    meta: { touched, invalid, error },
    className,
    ...custom
  }) => {
    return (
    <div className={`hdt-text-field ${className}`}>
      <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
      />
    </div>
  );
};

TextFieldComponent.propTypes = {
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string,
        invalid: PropTypes.bool,
    }).isRequired,
    label: PropTypes.string,
    input: PropTypes.shape({}).isRequired,
    className: PropTypes.string,
}
TextFieldComponent.defaultProps = {
    label: "",
    className: "",
}

export default TextFieldComponent;
