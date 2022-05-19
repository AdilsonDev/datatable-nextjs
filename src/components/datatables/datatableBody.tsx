import { getPaginationData, sortDataValue } from "../../functions/helpers";
import { DatatableState, EntryRange, RowType } from "./datatableTypes";

interface DatatableBodyProps {
  state: DatatableState;
  styles: {[className: string]: string};
  entry: number;
  dataKeys: Array<string>;
  selectedRows: number[];
  dispatch: (action: {type: string, payload: Object}) => void;
  isSelectable: boolean;
};

export default function DatatableBody({state, styles, entry, dataKeys, selectedRows, dispatch, isSelectable}: DatatableBodyProps) {

  const handleSelectRows = (dataId: number): void => {
    if(!isSelectable) return;
    const selectedRowsArr = selectedRows;
    const elIndex = selectedRows.indexOf(dataId);
    if(elIndex !== -1)
      selectedRowsArr.splice(elIndex, 1);
    else
      selectedRowsArr.push(dataId as number);
    
    dispatch({type: "SELECTED_ROW", payload: {selectedRows: selectedRowsArr}});
  };

  const renderTableBody = (): JSX.Element[] => {
    const columnName: string | undefined = typeof(state.columnOrder) === 'number' ? dataKeys[state.columnOrder] : undefined;
    const sortedData = columnName && state.sortOrder ? sortDataValue(state.data, columnName as string, state.sortOrder) : state.data;

    const dataCurrentPage = getPaginationData(sortedData as Object[], state.currentPage as number, entry as EntryRange);
    return dataCurrentPage.map((row: RowType) => renderRows(row));
  };

  const renderRows = (row: RowType): JSX.Element => {
    return (
      <tr key={row.id} className={selectedRows.includes(row.id) ? styles.selected : ''} onClick={() => handleSelectRows(row.id as number)}>
        {dataKeys.map((columnName: string, id: number) => <td key={id}>{row[columnName]}</td>)}
      </tr>
    );
  };

  return (
    <tbody>
      {state.data.length > 0 ? renderTableBody() : (
        <tr>
          <td colSpan={100}>No data found.</td>
        </tr>
      )}
    </tbody>
  );
};
