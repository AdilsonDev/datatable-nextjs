import styles from '../../static/css/Datatable.module.css';

import { useReducer, useState } from "react";
import { Table } from "react-bootstrap";
import _debounce from 'lodash/debounce';
import axios from 'axios';

import Search from './datatableSearch';
import Entries from './datatableEntries';
import TablePagination from './datatablePagination';
import DatatableReducer from './datatableReducers';
import { EntryRange, DatatableProps, DatatableState, sortType } from './datatableTypes';
import Alert from '../errors/alert';
import DatatableBody from './datatableBody';

export default function Datatable({
  columns, dataValues, entries = 10, columnOrder, sortOrder,
  mutipleDeleteReq, showPagination = false, showHeaderOptions = false,
  isSelectable = false
}: DatatableProps) {
  const [entry, setEntry] = useState<EntryRange>(entries);

  const dataKeys = Object.keys(columns);
  const columnsHeader = Object.values(columns);

  if(!dataKeys || !columnsHeader || !dataKeys.length || !columnsHeader.length) {
    console.error('You must enter valid values ​​for the columns.');
    return <Alert alertType="danger" 
      tagStrong='Error' 
      errorsArr={['Component Error. Open the console to see more information.']} 
    />
  }

  const initialState: DatatableState = {
    currentPage: 1,
    pagesQuantity: Math.ceil(dataValues.length/entry),
    origData: dataValues,
    data: dataValues,
    selectedRows: [],
    columnOrder,
    sortOrder: sortOrder ? sortOrder.toLowerCase() as sortType : undefined
  };
  const [state, dispatch] = useReducer(DatatableReducer, initialState);

  const renderTableHeader = (): JSX.Element | false => {    
    const handleChangeOrder = (index: number, sortOpt: sortType) => {
      dispatch({
        type: 'CHANGED_ORDER',
        payload: {columnOrder: index, sortOrder: sortOpt}
      });
    };

    const getSortOrder = state.sortOrder ? state.sortOrder : '';
    return (
      <thead>
        <tr>
          {columnsHeader.map((name: string, index: number) => (
            <th key={name} scope="col">
              <div className='d-flex align-items-center flex-nowrap'>
                {name}
                {state.columnOrder === index ? (
                  <button 
                    onClick={
                      () => handleChangeOrder(
                        index as number, 
                        (getSortOrder === 'asc' ? 'desc' : 'asc') as sortType
                      )
                    } className={`${styles.btnSort} btn btn-sm px-1 py-0 my-0`} role="Column Sort"
                  >
                    <i 
                      className={`fa fa-sort${getSortOrder !== '' ? (('-' + getSortOrder) + ' text-primary') : ''}`} 
                      aria-hidden="true"
                    ></i>
                  </button>
                ) : (
                  <button 
                    onClick={
                      () => handleChangeOrder(
                        index as number, 
                        'desc' as sortType
                      )
                    } className='btn btn-sm px-1 py-0 my-0' role="Column Sort"
                  >
                    <i className="fa fa-sort" style={{color: "rgba(0,0,0,0.3)"}} aria-hidden="true"></i>
                  </button>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const removeSelectedRows = (): void => {
    if(!mutipleDeleteReq?.url)
      return;
    const method = mutipleDeleteReq?.method || 'delete';
    axios({
      method: method,
      url: mutipleDeleteReq.url,
      data: state.selectedRows
    }).then((res) => {
      let newOrigData = state.origData;
      let newData = state.data;
      state.selectedRows.forEach((id: number) => {
        newOrigData = newOrigData.filter((data: any) => data.id !== id);
        newData = newData.filter((data: any) => data.id !== id);
      });
      dispatch({
        type: "REMOVED_ROWS",
        payload: {origData: newOrigData, data: newData, currentPage: 1, pagesQuantity: Math.ceil(newData.length/entry), selectedRows: []}
      });
    }).catch((err) => {
      alert(err);
    });
  };

  return (
    <>
      {showHeaderOptions ? (
        <div className="d-flex justify-content-between align-items-center">
          <Entries entry={entry} dataLenght={state.data.length} 
            dispatch={dispatch} setEntry={setEntry} 
          />
          <div style={{maxWidth: "25rem", padding: "0.3rem"}}>
            <Search data={state.origData} entry={entry} dispatch={dispatch} />
          </div>
        </div>
      ): false}
      <div className="px-1">
        <Table striped bordered hover size="sm">
          {renderTableHeader()}
          <DatatableBody state={state} styles={styles} entry={entry} dataKeys={dataKeys} selectedRows={state.selectedRows} dispatch={dispatch} isSelectable={isSelectable} />
        </Table>
      </div>
      {showPagination ? (
        <div className="d-flex justify-content-between mx-1">
          <div>
            <span className='small mr-1'>
              Showing {state.currentPage == 1 ? Math.min(1, state.data.length) : ((state.currentPage - 1) * entry) + 1}
            </span>
            <span className='small mr-1'>
              to {Math.min((entry * state.currentPage), state.data.length)}
            </span>
            <span className='small'>of {state.data.length} entries.</span>
            {state.selectedRows.length > 0 && mutipleDeleteReq ? (
              <button className='btn btn-sm btn-danger px-2 py- ml-2' onClick={() => removeSelectedRows()}>
                <i className='fa fa-trash' aria-labelledby='hidden'></i>
                <span className='ml-1'>Remove All Selected</span>
              </button>
            ) : false}
          </div>
          <TablePagination 
            currentPage={state.currentPage} 
            totalPages={state.pagesQuantity} dispatch={dispatch} 
          />
        </div>
      ): false}
    </>
  );
};
