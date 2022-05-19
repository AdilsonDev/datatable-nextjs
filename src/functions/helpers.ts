export const getPaginationData = (
  data: Object[], page: number, entry: number
): Object[] => {
  const valInitial = entry * (page - 1);
  const valFinal = entry * page;
  return data.slice(valInitial, valFinal);
};

export const searchDataValue = (
  Arr: Object[], 
  inputValue: string
): Object[] => {
  return Arr.filter(data => JSON.stringify(data)
    .toLowerCase().includes(inputValue.toLocaleLowerCase()));
};

export const sortDataValue = (Arr: Object[], columnName: string, sortOrder: 'DESC' | 'desc' | 'asc' | 'ASC') => {
  const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
  const sortedArr =  Arr.sort((a: any, b: any) => collator.compare(a[columnName], b[columnName]));
  return sortOrder === 'asc' ? sortedArr : sortedArr.reverse();
};
