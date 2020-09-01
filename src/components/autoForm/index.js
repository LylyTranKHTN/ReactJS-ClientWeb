import React from 'react';
import Form from '@rjsf/material-ui';
import PropTypes from 'prop-types';
import PhoneInput from './components/phoneInput';
import Lookup from './components/lookup';

const fields = { lookup: Lookup };
const widgets = { phone: PhoneInput };

const validate = (formData, errors) => {
    if (formData.pass1 !== formData.pass2) {
      errors.pass2.addError("Passwords don't match");
    }
    return errors;
}

const transformErrors = (errors) => {
    return errors.map(error => {
      if (error.name === "pattern") {
        error.message = "Only digits are allowed"
      }
      return error;
    });
  }

const AutoForm = ({ schema, liveValidate, className,
    ErrorList, ...rest }) => {
    return (
        <Form
            className={`auto-form-component ${className}`}
            schema={schema}
            fields={fields}
            widgets={widgets}
            liveValidate={liveValidate}
            validate={validate}
            transformErrors={transformErrors}
            ErrorList={ErrorList}
            {...rest}
        />
    );
};

AutoForm.propTypes = {
    schema: PropTypes.shape({}).isRequired,
    uiSchema: PropTypes.shape({}).isRequired,
    liveValidate: PropTypes.bool,
    className: PropTypes.string,
    ErrorList: PropTypes.func,
};

AutoForm.defaultProps = {
    liveValidate: true,
    className: '',
    ErrorList: () => null,
};

export default AutoForm;