import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import ResetForm from './resetForm';
import * as resetActions from './actions';
import i18n from '../../i18n';
import { Link } from 'components';

const ForgotPassword = ({ responseError, infomations, actions }) => {
    const { t } = useTranslation();

    const submit = async () => {
        await actions.resetAction(infomations.username);
    };

    const changeLanguage = async () => {
        if (i18n.language == 'e') {
            i18n.changeLanguage('v');
        }
        else {
            i18n.changeLanguage('e');
        }
    }

    return (
        <div id="hdt-forgot-password">
            <ResetForm
                onSubmit={submit}
            />
            {responseError && (<div className="error-box">
                <div className="login-error-message">{responseError}</div>
            </div>)}
            <div className="login-actions">
                <Link href="/login">{t('title:login.signIn')}</Link>
                <Link onClick={changeLanguage}>{t('title:main.languageName')}</Link>
            </div>
        </div>
    );
};

ForgotPassword.propTypes = {

};

ForgotPassword.defaultProps = {

};

export default ForgotPassword;
