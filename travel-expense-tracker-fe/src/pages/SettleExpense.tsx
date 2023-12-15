import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useAuth } from "../context/auth.context";
import { useEffect, useState } from "react";
import { Group } from "../types/api";
import { getGroupById, settleExpense } from "../apis/apis";
import { useParams } from "react-router-dom";
import { currencies } from "../utils/constant";

interface SettleDataState {
  settleCurrency: string;
  settleTo: string;
  settleAmount: number;
}
export interface SettleData {
  settleTo: string;
  settleFrom: string;
  settleCurrency: string;
  settleAmount: number;
}

const SettleExpense = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState<Group>();
  const [settlementData, setExpenseData] = useState<SettleDataState>({
    settleCurrency: "EUR",
    settleTo: "",
    settleAmount: 0,
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

  const handleInputChange = (e: any) => {
    e.preventDefault();
    setExpenseData({
      ...settlementData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (fieldName: string, value: string) => {
    setExpenseData({
      ...settlementData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async () => {
    const data = {
      settleTo: settlementData.settleTo,
      settleFrom: user?.email ?? "",
      settleCurrency: settlementData.settleCurrency ?? "",
      settleAmount: settlementData.settleAmount,
    };
    try {
      await settleExpense(groupId!, data);
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
            name="settleTo"
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
            title={settlementData.settleCurrency}
            id="input-group-dropdown-1"
            onSelect={(value) => handleSelectChange("currency", value ?? "")}
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
            name="settleAmount"
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
