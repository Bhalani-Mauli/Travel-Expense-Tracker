import GroupCard from "./GroupCard";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Stack } from "react-bootstrap";
import { getExpensesByGroup, getGroupById } from "../apis/apis";
import { useParams } from "react-router";
import { Expense, Group } from "../types/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const GroupPage = () => {
  const [group, setGroup] = useState<Group>();
  const [expenses, setExpenses] = useState<Expense[]>();
  const { id = "" } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const [groupRes, expenseRes] = await Promise.all([
          getGroupById(id),
          getExpensesByGroup(id),
        ]);
        setGroup(groupRes.data);
        setExpenses(expenseRes.data);
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
  return (
    <div>
      Group
      <GroupCard group={group} />
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
        <Stack className="css-5fjfy4">
          <span className="MuiTypography-root MuiTypography-subtitle MuiTypography-noWrap css-lmx3z2">
            {(expenses ?? []).length > 0 &&
              expenses!.map((expense) => (
                <div>
                  <li>Paid By: {expense.paidBy}</li>
                  <li>Total amt: {expense.totalAmount}</li>
                  <li>Amt per user:{expense.amountPerUser}</li>
                  <hr />
                </div>
              ))}
          </span>
          <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-vertical MuiDivider-flexItem css-1gtd105" />
          <span className="MuiTypography-root MuiTypography-subtitle MuiTypography-noWrap css-1t58pc5">
            Group Balance
          </span>
          <hr className="MuiDivider-root MuiDivider-fullWidth MuiDivider-vertical MuiDivider-flexItem css-1gtd105" />
          <span className="MuiTypography-root MuiTypography-subtitle MuiTypography-noWrap css-1t58pc5">
            My Balance
          </span>
        </Stack>
        <Row className="css-4vip3t">
          <Row className="css-1wkwmmc">
            <p className="MuiTypography-root MuiTypography-body2 css-1crh5ns">
              No expense present for this group! Record your first group expense
              now <br />
              <Link
                to={`/addExpense/${id}`}
                className="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-l29tcp"
              >
                Add Expense
              </Link>
            </p>
          </Row>
        </Row>
      </Container>
    </div>
  );
};
export default GroupPage;
