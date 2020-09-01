import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import Select from '../elements/select';
import i18n from '../../i18n';
import { withNamespaces } from 'react-i18next';
import { ArrowDropDownCircle } from '@material-ui/icons'
import PropTypes from 'prop-types';
import './styles.scss';
import { AuthService, ExecuteCommand, LocalDataService } from 'services';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../../coreModules/app/actions';
import { Utility } from 'utils';
import { AlertDialog } from 'components';

const LANGUAGE = [
    {
        value: 'e',
        label: 'English',
    },
    {
        value: 'v',
        label: 'Viet Nam',
    },
];

async function RefreshToken() {
    try {
        var r = await AuthService.refreshToken();
        if (r.success) {
            return true;
        };
    }
    catch (err) {
        return err;
    }
}

async function Logout(actions) {
    try {
        await AuthService.logout();
        actions.routeTo('/login');
    }
    catch (err) {
        console.log(err);
    }
}

async function Test(actions) {
    var m = await ExecuteCommand.Invoke('dmsp', 'Loading', 0, null);
    if (m.success == 1) {
        console.log(m);
    }
    else {
        Utility.InvokeError(m, () => {
            LocalDataService.clearUser();
            actions.routeTo('/login');
        });
    }
}

const Header = (props) => {
    const [isShowDialog, setIsShowDialog] = React.useState(false);
    console.log(props);
    const changeLanguage = (e) => {
        i18n.changeLanguage(e.value);
    }
    return (
        <div className="hdt-header" >
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={'menu-button'} color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" className={'title'}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit" onClick={() => Logout(props.actions)}>Logout</Button>
                    <Button color="inherit" onClick={RefreshToken}>RefreshToken</Button>
                    <Button color="inherit" onClick={() => Test(props.actions)}>ExecuteCommand</Button>
                    <Select
                        options={LANGUAGE}
                        onChange={changeLanguage}
                        defaultValue={i18n.language}
                    />
                </Toolbar>
            </AppBar>
            {isShowDialog && <AlertDialog type={1}
                title="title"
                message={133}
                accept='accept'
                cancel='cancel'
                onClose={() => setIsShowDialog(false)} />}
        </div>
    );
};

Header.propTypes = {
    actions: PropTypes.shape({
        routeTo: PropTypes.func.isRequired,
    }).isRequired,
};

Header.defaultProps = {

};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...appActions }, dispatch)
});

export default connect(
    null,
    mapDispatchToProps,
)(Header);
