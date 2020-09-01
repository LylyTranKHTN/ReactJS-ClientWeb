import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import Constants from 'constants';
import { TextField, Button } from 'components';
import { ReCaptcha } from 'react-recaptcha-v3'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'username'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '';
    }
  })
  return errors;
}

const ResetForm = ({ onSubmit, isInvalid }) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState('receivedNewPassword');
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onResolved = ()=>{
    this.setState({resetSent: true});
    console.log(this.state);
  }

  return (<form onSubmit={onSubmit}>
    <div className="container-content">
      <h2 className="login-title">{t('title:login.title')}</h2>
      <p className="hdt-label">{t('title:login.resetTitle')}</p>
      <Field
        component={TextField}
        name="username"
        type="text"
        label={t('title:login.id')}
      />
      <ReCaptcha
        // ref={ref => this.recaptcha = ref}
        sitekey="6LcQL6oZAAAAANL336ruH6lVB2xS6zGfzCS3vWb9"
        onResolved={onResolved}
      />
      <FormControl component="fieldset"
        className="hdt-login-checkbox hdt-checkbox">
        <RadioGroup aria-label="gender" name="usingEmail" value={value} onChange={handleChange}>
          <FormControlLabel value="0" control={<Radio />} label={t('title:login.phoneReceived')} />
          <FormControlLabel value="1" control={<Radio />} label={t('title:login.mailReceived')} />
        </RadioGroup>
      </FormControl>

      <div className="row center-block">
        <Button type="submit" btnType="Submit" disabled={isInvalid}>
          {t('title:button.accept')}
        </Button>
      </div>
    </div>
  </form>);
}

ResetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool.isRequired
};

export default reduxForm({
  form: Constants.Form.Login,
  validate,
})(ResetForm);
