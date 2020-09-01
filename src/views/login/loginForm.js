import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import Constants from 'constants';
import { TextField, Button } from 'components';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '';
    }
  })
  return errors;
}

const LoginForm = ({ onSubmit, isInvalid }) => {
  const { t } = useTranslation();
  return (<form onSubmit={onSubmit}>
    <div className="container-content">
      <h2 className="login-title">{t('title:login.title')}</h2>
      <Field
        component={TextField}
        name="email"
        type="text"
        label={t('title:login.id')}
      />
      <Field
        component={TextField}
        name="password"
        type="password"
        label={t('title:login.password')}
      />

      <FormControlLabel
        className="hdt-login-checkbox hdt-checkbox"
        control={<Checkbox name="isRemember" color="default" />}
        label={t('title:login.rememberPassword')}
      />

      <div className="row center-block">
        <Button type="submit" btnType="Submit" disabled={isInvalid}>
          {t('title:login.signIn')}
        </Button>
      </div>
    </div>
  </form>);
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool.isRequired
};

export default reduxForm({
  form: Constants.Form.Login,
  validate,
})(LoginForm);
