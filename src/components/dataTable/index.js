import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import MBATableHeader from './header.js';
import Pagination from './pagination';
import './style.scss';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto'
    },
    table: {
        minWidth: 650
    },
    body: {
    }
}));

/**
 * Format Cell
 * @param {Object} row 
 * @param {Object} cell 
 */
const DataCellFormat = (row, header) => {
    if (header.formattedvalue){
        return header.formattedvalue(header.id, row);
    }
    return row[header.id] || '';
};

/**
 * index of first record in page
 * @param {Number} page
 * @param {Number} sizePerPage
 */
const numOfFirstRecord = (page, sizePerPage) => ((page - 1) * sizePerPage);

/**
 * index of last record in page
 * @param {Number} page
 * @param {Number} sizePerPage
 */
const numOfLastRecord = (page, sizePerPage, totalRecords) => {
    const lastRecord = page * sizePerPage;
    return lastRecord > totalRecords ? totalRecords : lastRecord;
};

/**
 * Get data per page
 * @param {Number} page 
 * @param {Number} sizePerPage 
 * @param {Number} data 
 */
const getDataPerPage = (page, sizePerPage, data) => {
    const firstRecord = numOfFirstRecord(page, sizePerPage);
    const lastRecord = numOfLastRecord(page, sizePerPage, data.size);
    return data.slice(firstRecord, lastRecord);
};

const DataTable = ({ headers, data, page, sizePerPage, isPaging, onChangePage,
    defaultMessageNoData, pages, ...customRow }) => {
    const classes = useStyles();

    const handleChangePage = (page) => {
        onChangePage(page);
    };

    const _pages = data && isPaging && sizePerPage ? Math.ceil(data.length / sizePerPage) : pages;
    const _data = sizePerPage && data ? getDataPerPage(page, sizePerPage, data): data;

    return (
        <div className='hdt-tables-datatable'>
            <Table className={ classes.table }>
                <MBATableHeader headers={ headers } />
                <TableBody className={ classes.body }>
                    {_data && _data.map(row => (
                        <TableRow { ...customRow } key={ row.id }>
                            {headers.map(cell => (
                                <TableCell
                                    { ...cell.customdatacell }
                                    key={ cell.id }>
                                    { DataCellFormat(row, cell) }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            { !_data && <div className='content-no-data'>
                { defaultMessageNoData }
            </div> }
            { isPaging && _data 
                && <div className='datatable-paging'>
                    <Pagination
                        pages={ _pages }
                        page={ page }
                        onChangePage={ handleChangePage }
                    />
                </div> }
        </div>
    );
};

DataTable.propTypes = {
    headers: PropTypes.instanceOf(Array).isRequired,
    data: PropTypes.instanceOf(List),
    pages: PropTypes.number,
    page: PropTypes.number,
    sizePerPage: PropTypes.number,
    isPaging: PropTypes.bool,
    onChangePage: PropTypes.func,
    defaultMessageNoData: PropTypes.string
};

DataTable.defaultProps = {
    data: new List(),
    pages: 1,
    page: 1,
    sizePerPage: 10,
    isPaging: false,
    onChangePage: () => {},
    defaultMessageNoData: ''
};

export default DataTable;
