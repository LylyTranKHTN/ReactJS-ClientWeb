import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

const ForgotPassword = (props) => {
    const { t } = useTranslation();
    console.log(props);
    return (
        <div id="hdt-sign-up">
            {t('title:login.signUp')}
        </div>
    );
};

ForgotPassword.propTypes = {

};

ForgotPassword.defaultProps = {

};

export default ForgotPassword;
