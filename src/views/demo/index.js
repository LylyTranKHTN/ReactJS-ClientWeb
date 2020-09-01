import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
// import * as aboutActions from './actions';
import * as demoActions from './actions';

const Demo = (props) => {
    const { t } = useTranslation();
    useEffect(() => {
        props.actions.getName();
        props.actions.getName2();
    }, []);
    function test (){
        alert(123);
    } 
    console.log(props);
    return (
    <div>
        <div>Demo {props.data}</div>
        <div>Demo {props.data}</div>
        <div>Demo {props.data}</div>
        <button onClick={test} >Demo {props.data}</button>
        <div>{props.action1.data}</div>
        <div>{props.action2.data}</div>
    </div>
    );
};

Demo.propTypes = {
    data: PropTypes.string,
    actions: PropTypes.shape({
		getName: PropTypes.func.isRequired,
		getName2: PropTypes.func.isRequired,
    }).isRequired,
    action1: PropTypes.shape({
        data: PropTypes.string,
    }),
    action2: PropTypes.shape({
        data: PropTypes.string,
    }),
};

Demo.defaultProps = {
    data: "Hello",
    action1: {},
    action2: {},
};

const mapStateToProps = state => ({
    action1: state.Demo.get('action1'),
    action2: state.Demo.get('action2'),
});
  
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...demoActions }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Demo);