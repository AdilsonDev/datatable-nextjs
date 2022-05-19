import { Form, InputGroup } from "react-bootstrap";
import { EntryRange } from './datatableTypes';

interface EntriesProps {
  entry: EntryRange;
  dataLenght: number;
  dispatch: (action: {type: string, payload: Object}) => void;
  setEntry: (val: EntryRange) => void;
};

const Entries = ({entry, dataLenght, dispatch, setEntry}: EntriesProps) => {

  const handleChangeEntries = (val: EntryRange): void => {
    setEntry(val);
    dispatch({
      type: 'CHANGED_ENTRY',
      payload: {
        currentPage: 1,
        pagesQuantity: Math.ceil(dataLenght/val),
      }
    });
  };

  return (
    <div style={{maxWidth: "25rem", padding: "0.3rem"}}>
      <InputGroup size="sm">
        <InputGroup.Prepend>
          <InputGroup.Text id="select-sizing-sm">Entries</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control 
          defaultValue={entry} 
          onChange={e => handleChangeEntries(+e.target.value as EntryRange)} 
          size="sm" as="select" aria-label="Small" 
          aria-describedby="select-sizing-sm"
        >
          <option>{5}</option>
          <option>{10}</option>
          <option>{15}</option>
          <option>{20}</option>
          <option>{25}</option>
        </Form.Control>
      </InputGroup>
    </div>
  );
};

export default Entries;
