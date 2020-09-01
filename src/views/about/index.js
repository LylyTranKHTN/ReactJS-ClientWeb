import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as loginActions from '../login/actions';
import { Search, Tab, Radio, Number, Lookup, Checkbox, Combobox } from 'components';

const tabOptions = {
    label: "Test",
    content: 2,
};

const About = (props) => {
    const { t } = useTranslation();
    console.log(props);
    return (
    <div>{t('title:about.about')}
        {props.companyData}
        <Search/>
        <div>
            <Tab options={tabOptions} />
            <Radio />
            <Number />
            <Lookup />
            <Combobox />
            <Checkbox />
        </div>
    </div>
    );
};

About.propTypes = {
    isProcessing: PropTypes.bool.isRequired,
};

About.defaultProps = {
};

const mapStateToProps = state => ({
    isProcessing: state.Login.get('isProcessing'),
  });
  
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...loginActions }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(About);
