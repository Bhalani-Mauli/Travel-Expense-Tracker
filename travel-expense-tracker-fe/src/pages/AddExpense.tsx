import { useState, ChangeEvent, useEffect } from "react";
import {
  Button,
  Form,
  InputGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { addExpense, getGroupById } from "../apis/apis";
import { categories, currencies } from "../utils/constant";
import { useParams } from "react-router-dom";
import { Group } from "../types/api";

export interface ExpenseData {
  category: string;
  description: string;
  currency: string;
  paidBy: string;
  totalAmount: string;
  amountPerUser: string;
  groupId: string;
}

const AddExpense = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState<Group>();
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    category: "General",
    description: "",
    currency: "EUR",
    paidBy: "", // Add logic to set the paidBy user
    totalAmount: 0,
    amountPerUser: "",
    groupId: groupId ?? "",
  });

  useEffect(() => {
    (async () => {
      try {
        if (groupId) {
          const res = await getGroupById(groupId);
          setGroup(res.data);
        }
      } catch (err) {
        console.log("something went wrong in fetching group info", err);
      }
    })();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    console.log(e);
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (fieldName: string, value: string) => {
    console.log(value);
    setExpenseData({
      ...expenseData,
      [fieldName]: value,
    });
  };

  const handleAddExpense = async () => {
    const totalAmount = expenseData.totalAmount;
    const totalMembers = group?.members.length ?? 1;
    const amountPerUser = totalAmount / totalMembers;
    try {
      const response = await addExpense({
        ...expenseData,
        amountPerUser: amountPerUser,
      });
      setExpenseData(response.data);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={expenseData.category}
            onChange={handleInputChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={expenseData.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title={expenseData.currency}
            id="input-group-dropdown-1"
            onSelect={(value) => handleSelectChange("currency", value)}
          >
            {currencies.map((currency) => (
              <Dropdown.Item key={currency} eventKey={currency}>
                {currency}
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
          </DropdownButton>
          <Form.Control
            onChange={handleInputChange}
            type="number"
            name="totalAmount"
            aria-label="Text input with dropdown button"
          />
        </InputGroup>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Paid By</Form.Label>
          <Form.Select
            name="paidBy"
            defaultValue="Choose..."
            onChange={handleInputChange}
          >
            <option>Choose...</option>
            {group &&
              group.members.map((member) => (
                <option value={member} key={member}>
                  {member}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleAddExpense}>
          Add Expense
        </Button>
      </Form>
    </div>
  );
};

export default AddExpense;
