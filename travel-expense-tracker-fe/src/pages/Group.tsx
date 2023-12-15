import GroupCard from "./GroupCard";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Stack,
  Accordion,
  Button,
} from "react-bootstrap";
import {
  getAllSettlements,
  getExpensesByGroup,
  getGroupById,
} from "../apis/apis";
import { useParams } from "react-router";
import { Expense, Group, Settlement } from "../types/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { dateToHumanReadable, roundNumber } from "../utils/utils";
import { currenciesLogoMap } from "../utils/constant";

const GroupPage = () => {
  const [group, setGroup] = useState<Group>();
  const [expenses, setExpenses] = useState<Expense[]>();
  const [settlement, setSettlement] = useState<Settlement>();
  const { id = "" } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const [groupRes, expenseRes, settlementRes] = await Promise.all([
          getGroupById(id),
          getExpensesByGroup(id),
          getAllSettlements(id),
        ]);
        setGroup(groupRes.data);
        setExpenses(expenseRes.data);
        setSettlement(settlementRes.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const calculateTotalExpense = () => {
    if (expenses) {
      return expenses
        .reduce((total, expense) => total + expense.totalAmount, 0)
        .toFixed(2);
    }
    return "0";
  };

  if (!group) {
    return <>loading</>;
  }

  const userBalance = group.split[user!.email];
  const youOwe = userBalance < 0 ? userBalance : 0; //give money
  const owed = userBalance > 0 ? userBalance : 0; //take money
  const currencyClasName = (expense: Expense) => {
    return expense.paidBy == user?.email ? "text-success" : "text-danger";
  };

  return (
    <div>
      Group
      <GroupCard group={group} fullWidth />
      <Container className="mt-4">
        <Row>
          <Col xs={12} md={4}>
            <Card>
              <Card.Body>
                <Stack direction="horizontal" gap={2}>
                  <div>
                    <img src="../../public/icons/total-expense.svg" />
                  </div>
                  <div>
                    <h6>Total expense</h6>
                    <h5>€ {calculateTotalExpense()}</h5>
                  </div>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card>
              <Card.Body>
                <Stack direction="horizontal" gap={2}>
                  <div>
                    <img src="../../public/icons/owed.svg" />
                  </div>
                  <div>
                    <h6>You are owed</h6>
                    <h5>€ {owed}</h5>
                  </div>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card>
              <Card.Body>
                <Stack direction="horizontal" gap={2}>
                  <div>
                    <img src="../../public/icons/owe.svg" />
                  </div>
                  <div>
                    <h6>You owe</h6>
                    <h5>€ {youOwe}</h5>
                  </div>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Expenses</Accordion.Header>
            <Accordion.Body>
              <span className="MuiTypography-root MuiTypography-subtitle MuiTypography-noWrap css-lmx3z2 mt-3">
                {(expenses ?? []).length > 0 &&
                  expenses!.map((expense) => (
                    <div className="d-flex col border p-3 mb-3 justify-content-between">
                      <div className="d-flex gap-5">
                        <div className="ml-auto text-right">
                          <strong>Date</strong>
                          <p>{dateToHumanReadable(expense?.createdAt!)}</p>
                        </div>
                        <div className="d-flex row">
                          <div>
                            <strong>Paid By:</strong> {expense.paidBy}
                          </div>
                          <div className="ml-auto text-right">
                            <strong>Total Amount:</strong>
                            {roundNumber(expense.totalAmount)}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex col justify-content-end">
                        <h3 className={currencyClasName(expense)}>
                          {roundNumber(expense.amountPerUser)}
                          {(currenciesLogoMap as any)[expense.currency]!}
                        </h3>
                      </div>
                    </div>
                  ))}
              </span>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Settle Balance</Accordion.Header>
            <Accordion.Body>
              <span className="MuiTypography-root MuiTypography-subtitle MuiTypography-noWrap css-1t58pc5">
                {settlement &&
                  settlement.data! &&
                  settlement.data.map((s) => (
                    <div className="d-flex col border p-3 mb-3 justify-content-between">
                      <div className="d-flex gap-5">
                        <div className="ml-auto text-right">
                          <strong>From</strong>
                          <p>{s[0]}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <strong>To</strong>
                          <p>{s[1]}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <strong>Amount</strong>
                          <p>{s[2]}</p>
                        </div>
                      </div>
                      <div className="d-flex col justify-content-end">
                        <Link
                          to={`/settleExpense/${id}?to=${s[1]}&amt=${s[2]}`}
                        >
                          <Button> Settle</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </span>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
};
export default GroupPage;
