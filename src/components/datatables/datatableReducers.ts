import { DatatableState, DatatableAction } from './datatableTypes';

const DatatableReducer = (state: DatatableState, action: DatatableAction) => {
  switch(action.type) {
    case 'SEARCHED_DATA':
      return {...state, ...action.payload};
    case 'CHANGED_ENTRY':
      return {...state, ...action.payload};
    case 'CHANGED_PAGE':
      return {...state, currentPage: action.payload?.currentPage}
    case 'CHANGED_ORDER':
      return {...state, ...action.payload}
    case 'REMOVED_ROWS':
      return {...state, ...action.payload}
    case 'SELECTED_ROW':
      return {...state, ...action.payload}
    default:
      console.error('[WARNING] Action without reducer: ', action.type);
      return state;
  };
};

export default DatatableReducer;
