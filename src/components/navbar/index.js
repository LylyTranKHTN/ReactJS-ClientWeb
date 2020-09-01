import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Constants from 'constants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import * as navActions from './actions'; 
import { Spinner } from 'components';
import './styles.scss';
import NavbarItem from './../elements/navbarItem/index';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
 
const { Paths } = Constants;

let idMenu = "menuMain";
const Navbar = ({ actions, menuList }) => {
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
    let child = null, id = null;
    child = menuList.map((e, i)=>{
        if(e.zlevel== 0){
            if(e.description == '-'){
                return(
                    <li className="dropdown-divider"></li>
                )
            }
            if (e.child ==1) {
                id = "hdt" + e.menu_id.replace(/\./g,"")
                return(
                    <li className="nav-item has-sub">
                        <a id={'header' + id} href="javascript:void(0)" className="collapsed" data-toggle="collapse" data-target={"#" + id} aria-expanded="false" aria-controls={id}>
                            <i className="fa fa-th-list" aria-hidden="true" />
                            <span>{e.description}</span>
                        </a>
                        <NavbarItem item={e} index={i} listMenu={menuList} parentID={idMenu}>
                        </NavbarItem>
                    </li>
               ) 
            }
            return(
                <li className="nav-item navigation-header">
                { ReactHtmlParser(e.html_before) }
                {e.link !=null ? <a href={e.link}><span>{e.description}</span></a>:<span>{e.description}</span>} 
                <span>{e.description}</span>
                { ReactHtmlParser(e.html_after) }
                </li>
            )
        }       
    })
    return (
        <div id={idMenu} className='side-bar main-menu border-top menu-fixed menu-light menu-shadow menu-accordion accordion custom-scrollbar-css'>
            <ul className='navigation-main'>
                {child}
            </ul>
        </div>
    );
};

Navbar.propTypes = {
    actions: PropTypes.shape({
		getMenu: PropTypes.func.isRequired,
	}).isRequired,
    menuList: PropTypes.arrayOf({}),
    index: PropTypes.string = 0,
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
