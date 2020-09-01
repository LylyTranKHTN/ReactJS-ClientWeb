import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Constants from 'constants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as navActions from './actions'; 
import { Spinner } from 'components';
import './styles.scss';

const { Paths } = Constants;
let a = 1;

const Navbar = ({ actions, menuList }) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (!menuList) {
            actions.getMenu();
        }
    }, []);

    if (!menuList) {
        return (
            <Spinner />
        );
    }

    return (
        <div className='side-bar'>
        <ul className='navigation-main'>
            {menuList.map(menu => (
                <NavLink exact activeClassName={ 'active' } to={menu.link || '/'}>
                    <li className='nav-item'>
                        {menu.description}
                    </li>
                </NavLink>
            ))}
        </ul>
    </div>
    );
};

Navbar.propTypes = {
    actions: PropTypes.shape({
		getMenu: PropTypes.func.isRequired,
	}).isRequired,
	menuList: PropTypes.arrayOf({}),
};

Navbar.defaultProps = {
	responseError: null,
	menuList: null,
};

const mapStateToProps = state => ({
    menuList: state.NavBar.get('menu'),
  });
  
  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(navActions, dispatch)
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Navbar);
