import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const GROUPS_NUMBER = 10;

const TablePaging = ({ pages, page, onChangePage }) => {
    const [ groupPage, setGroupPage ] = useState(0);
    const onClickPrePageButton = () => {
        setGroupPage(groupPage - 1);
    };

    const onClickNextPageButton = () => {
        setGroupPage(groupPage + 1);
    };

    const onClickPageButton = (e) => {
        onChangePage(parseFloat(e.target.innerText));
    };

    const renderPageButton = () => {
        let listPage=[];
        const lastPage = groupPage * GROUPS_NUMBER + GROUPS_NUMBER < pages
            ? groupPage * GROUPS_NUMBER + GROUPS_NUMBER
            : pages;
        for (let i = groupPage * GROUPS_NUMBER + 1; i <= lastPage; i ++) {
            listPage.push(i);
        }
        return listPage.map((p, index) => p === page
            ? (<Button key={ index } className='active'>{ p }</Button>)
            : (<Button key={ index } className='normal' onClick={ onClickPageButton } >{ p }</Button>));
    };

    return (
        <div className='datatable-pagination'>
            { groupPage > 0 && <IconButton>
                <KeyboardArrowLeft onClick={ onClickPrePageButton } />
            </IconButton>}
            { renderPageButton() }
            { groupPage < pages / GROUPS_NUMBER - 1 && <IconButton>
                <KeyboardArrowRight onClick={ onClickNextPageButton } />
            </IconButton> }
        </div>
    );
};

TablePaging.propTypes = {
    pages: PropTypes.number,
    page: PropTypes.number,
    onChangePage: PropTypes.func
};

TablePaging.defaultProps = {
    pages: 1,
    page: 1,
    onChangePage: () => {}
};

export default TablePaging;
