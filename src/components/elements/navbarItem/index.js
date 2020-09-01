import React from 'react';
import PropTypes, { string } from 'prop-types'
import Button from '@material-ui/core/Button';
import './styles.scss';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
 

const NavbarItem = ({listMenu, item, index, parentID}) => {
  let subMenu = null, cssItem ="is-shown ";
  let childTree = [], id=item.menu_id, id0 = item.menu_id0;
  for (let i = index; i < listMenu.length; i++) {
    const element = listMenu[i];
    if(element.menu_id0 == id){
      childTree.push(element)
    }    
  }

  subMenu = childTree.map((e, i)=>{    
    let link = e.link;
    if (link == '' || link == '.')link = 'javascript:void(0)'
    if(e.description == '-'){
      cssItem = "dropdown-divider"
      return(
        <li className="dropdown-divider"/>
      )
    }
    if(e.child == 1){
      let subID = "hdt" + e.menu_id.replace(/\./g,""),
      cssItem = "is-shown has-sub";
      return(
        <li className="is-shown has-sub">
          <a id={"header" + subID} className="menu-item collapsed" data-toggle="collapse" data-target={"#" + subID} aria-expanded="false" aria-controls={subID} href={link}>
            { ReactHtmlParser(e.html_before) }
            <span title={e.description}>{e.description}</span>
            { ReactHtmlParser(e.html_after) }
          </a>
            <NavbarItem item={e} index={i} listMenu={listMenu} parentID={id}>
            </NavbarItem>
      </li>
      )
    } 
    return (
    <li className="is-shown">
      <a href={link} data-parent={"#hdt" + id.replace(/\./g,"")}>
        { ReactHtmlParser(e.html_before) }
        <span title={e.description}>{e.description}</span>
        { ReactHtmlParser(e.html_after) }
      </a>
    </li>
    )
});
  return(
    <ul id={"hdt" + id.replace(/\./g,"")} className="menu-content collapse" aria-labelledby={"header" + id.replace(/\./g,"")} data-parent={"#" + parentID.replace(/\./g,"")}>
        {subMenu}
    </ul>  
  )
}

NavbarItem.propTypes = {
  listMenu: PropTypes.arrayOf({}),
  item: PropTypes.arrayOf({}),
  index: PropTypes.number = 0,
  parentID: PropTypes.string = "menuMain",
};

NavbarItem.defaultProps = {
    className: "",
    children: "",
};

export default NavbarItem;
