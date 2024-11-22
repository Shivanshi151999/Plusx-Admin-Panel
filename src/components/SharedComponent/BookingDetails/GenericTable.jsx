import React from 'react';
import PropTypes from 'prop-types';
import styles from './history.module.css';

const GenericTable = ({ columns, data, actions }) => {
    return (
        <table className={`table ${styles.customTable}`}>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.label}</th>
                    ))}
                    {actions && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex}>
                                {col.render ? col.render(row[col.field], row) : row[col.field]}
                            </td>
                        ))}
                        {actions && (
                            <td>
                                {actions.map((action, actionIndex) => (
                                    <button
                                        key={actionIndex}
                                        onClick={() => action.onClick(row)}
                                        className={styles.actionButton}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

GenericTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            field: PropTypes.string.isRequired,
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        })
    ),
};

export default GenericTable;
