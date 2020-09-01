import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TableHead, TableCell, TableRow } from '@material-ui/core';

const StyledTableCell = withStyles({
    root: {
        height: '32px',
        backgroundColor: '#f0f0f0',
        fontSize: '14px',
        lineHeight: 1,
        color: '#999',
        fontWeight: 'normal'
    }
})(TableCell);

const TableHeader = ({ headers }) => {  
    return (
        <TableHead>
            <TableRow>
                {headers.map(row => (
                    <StyledTableCell
                        className='datatable-header-cell'
                        { ...row }
                        key={ row.id }>
                        { row.label ? row.label : ' ' }
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

TableHeader.propTypes = {
    headers: PropTypes.instanceOf(Array).isRequired
};

export default TableHeader;
