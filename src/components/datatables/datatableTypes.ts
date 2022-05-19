export type EntryRange = 5 | 10 | 15 | 20 | 25;
export type sortType = 'ASC' | 'DESC' | 'asc' | 'desc' | undefined;

export interface DatatableProps {
  columns: Object;
  dataValues: Object[];
  entries?: EntryRange;
  showPagination?: boolean;
  showHeaderOptions?: boolean;
  columnOrder?: number | undefined;
  sortOrder?: sortType;
  isSelectable?: boolean;
  mutipleDeleteReq?: {url: string, method: string};
};

export interface RowType {
  [key: string]: any;
};

export interface DatatableState {
  currentPage: number;
  pagesQuantity: number;
  origData: Object[];
  data: Object[];
  selectedRows: number[];
  columnOrder: number | undefined;
  sortOrder?: sortType;
};

export interface DatatableAction {
  type: string;
  payload?: any;
};
