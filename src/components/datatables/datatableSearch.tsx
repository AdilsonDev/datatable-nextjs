import _debounce from 'lodash/debounce';

import { useCallback } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { searchDataValue } from '../../functions/helpers';

interface SearchProps {
  dispatch: (action: {type: string, payload: Object}) => void;
  entry: number;
  data: Object[];
};

const Search = ({data, entry, dispatch}: SearchProps) => {
  const handleSearchData = (val: string): void => {
    const callDispatch = (dData: Object[]) => {
      dispatch({
        type: 'SEARCHED_DATA', 
        payload: { 
          currentPage: 1,
          pagesQuantity: Math.ceil(dData.length/entry),
          data: dData
        } 
      });
    };

    if(val === '')
      return callDispatch(data);

    const newDataValues = searchDataValue(data, val);
    callDispatch(newDataValues);
  };
  const debounceFn = useCallback(_debounce(handleSearchData, 400), [entry, data]);

  return (
    <InputGroup size="sm">
      <InputGroup.Prepend>
        <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl 
        onChange={e => debounceFn(e.target.value)} 
        type="text" aria-label="Small" 
        aria-describedby="inputGroup-sizing-sm" 
      />
    </InputGroup>
  );
};

export default Search;
