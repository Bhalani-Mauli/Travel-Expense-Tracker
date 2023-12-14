import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useAuth } from "../context/auth.context";
import { ChangeEvent, useEffect, useState } from "react";
import { Group } from "../types/api";
import { getGroupById, settleExpense } from "../apis/apis";
import { useParams } from "react-router-dom";
import { currencies } from "../utils/constant";

interface settleData {
  currency: string;
}

const SettleExpense = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState<Group>();
  const [expenseData, setExpenseData] = useState<settleData>({
    currency: "EUR",
  });

  const { user } = useAuth();

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
    console.log(e.target.value);
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

  const handleSubmit = async () => {
    console.log(user?.email);
    console.log(group?.members);
    console.log(expenseData);
    try {
      await settleExpense({
        groupId,
        expenseData,
      });
    } catch (error) {
      console.error("Error settle expense", error);
    }
  };

  return (
    <div>
      <h2>Settle Expense</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>From</Form.Label>
          <Form.Select name="category" value={user?.email} disabled>
            <option>{user?.email}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>To</Form.Label>
          <Form.Select
            name="To"
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

        <Button onClick={handleSubmit} variant="primary" type="button">
          Settle
        </Button>
      </Form>
    </div>
  );
};

export default SettleExpense;
