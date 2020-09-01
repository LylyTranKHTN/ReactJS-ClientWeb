import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { useTranslation } from 'react-i18next';
import Constants from 'constants';
import { Link } from 'components';
import * as loginActions from './actions';
import LoginForm from './loginForm';
import './styles.scss';
import i18n from '../../i18n';

const Login = ({ responseError, infomations, actions }) => {
	const { t } = useTranslation();
	useEffect(() => {
		actions.checkUserAuthenticationAction();
	}, []);

	const submit = async () => {
		await actions.loginAction(infomations.email, infomations.password);
		actions.checkUserAuthenticationAction();
	};

	const changeLanguage = async () => {
		if (i18n.language == 'e') {
			i18n.changeLanguage('v');
		}
		else {
			i18n.changeLanguage('e');
		}
	}

	return (<div id='hdt-login-page'>
		<LoginForm
			onSubmit={submit}
		/>
		{responseError && (<div className="error-box">
			<div className="login-error-message">{responseError}</div>
		</div>)}
		<div className="login-actions">
			<Link href="/forgotpassword">{t('title:login.forgotPassword')}</Link>
			<Link onClick={changeLanguage}>{t('title:main.languageName')}</Link>
		</div>
	</div>);
};

Login.propTypes = {
	actions: PropTypes.shape({
		checkUserAuthenticationAction: PropTypes.func.isRequired,
		loginAction: PropTypes.func.isRequired,
	}).isRequired,
	responseError: PropTypes.string,
	infomations: PropTypes.objectOf({
		email: PropTypes.string,
		password: PropTypes.string,
		isRemember: PropTypes.boolean
	}),
};

Login.defaultProps = {
	responseError: null,
	infomations: {},
};

const mapStateToProps = state => ({
	responseError: state.Login.get('error'),
	infomations: getFormValues(Constants.Form.Login)(state),
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(loginActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Login);
