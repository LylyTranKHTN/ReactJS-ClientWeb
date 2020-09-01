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
import './func.js';
import NavbarItem from './../elements/navbarItem/index';
import HDTButton from './../elements/button/index';

const { Paths } = Constants;
let a = 1;
function processMenu(){
    var _body = document.getElementsByTagName("BODY");
    var objs = document.querySelectorAll('*[data-action="Collapsed"]');
}
const Navbar = ({ actions, menuList }) => {
    const { t } = useTranslation();
    useEffect(() => {
        if (!menuList) {
            actions.getMenu();
        } else{
            processMenu();
            console.log(menuList)
        }
    }, []);

    if (!menuList) {
        return (
            <Spinner />
        );
    }

    return (
        <div id='ok' className='side-bar'>
        <ul className='navigation-main'>
            {menuList.map(menu => (function(){
                <NavbarItem item={menu}>
                </NavbarItem>
             }         
            ))}
        </ul>
    </div>
    );
};
        //  {/* <NavLink exact activeClassName={ 'active' } to={menu.link || '/'}>
        //             <li className='nav-item'>
        //                 {menu.description}
        //             </li>
        //         </NavLink> */}
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
