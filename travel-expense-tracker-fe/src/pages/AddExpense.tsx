import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";

const AddExpense = () => {
  return (
    <div>
      <h2>Add Expense</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Category</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>General</option>
            <option>Entertainment</option>
            <option>Food and Drink</option>
            <option>Home</option>
            <option>Life</option>
            <option>Transportation</option>
            <option>Utilities</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Description</Form.Label>
          <Form.Control />
        </Form.Group>
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title="Currency"
            id="input-group-dropdown-1"
          >
            <Dropdown.Item href="#">EUR</Dropdown.Item>
            <Dropdown.Item href="#">INR</Dropdown.Item>
            <Dropdown.Item href="#">Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#">Separated link</Dropdown.Item>
          </DropdownButton>
          <Form.Control aria-label="Text input with dropdown button" />
        </InputGroup>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Paid By</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Expense
        </Button>
      </Form>
    </div>
  );
};

export default AddExpense;
