import GroupCard from "./GroupCard";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Stack } from "react-bootstrap";
import { getExpensesByGroup, getGroupById } from "../apis/apis";
import { useParams } from "react-router";
import { Expense, Group } from "../types/api";

const GroupPage = () => {
  const [group, setGroup] = useState<Group>();
  const [expenses, setExpenses] = useState<Expense[]>();
  const { id = "" } = useParams();

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

  if (!group) {
    return <>loading</>;
  }
  // console.log(group);
  // return <div>{group.name}</div>;
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="iconify iconify--nimbus"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="M5.44 7.47h5.26v1.25H5.44zm0 2.36h5.26v1.25H5.44zm0-4.76h5.26v1.25H5.44z"
                      />
                      <path
                        fill="currentColor"
                        d="M11.34 1L9.64.28L8.08 1L6.41.28L4.84 1L2.46 0v16l2.38-1l1.57.69L8.08 15l1.56.69l1.7-.69l2.2 1V0zm.94 13.11l-.92-.41l-1.69.69l-1.57-.72l-1.68.69l-1.55-.69l-1.15.47V1.86l1.15.47l1.55-.69l1.68.69l1.57-.69l1.69.69l.92-.41z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h6>Total expense</h6>
                    <h5>₹ 0</h5>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="iconify iconify--nimbus"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="M5.44 7.47h5.26v1.25H5.44zm0 2.36h5.26v1.25H5.44zm0-4.76h5.26v1.25H5.44z"
                      />
                      <path
                        fill="currentColor"
                        d="M11.34 1L9.64.28L8.08 1L6.41.28L4.84 1L2.46 0v16l2.38-1l1.57.69L8.08 15l1.56.69l1.7-.69l2.2 1V0zm.94 13.11l-.92-.41l-1.69.69l-1.57-.72l-1.68.69l-1.55-.69l-1.15.47V1.86l1.15.47l1.55-.69l1.68.69l1.57-.69l1.69.69l.92-.41z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h6>You are owed</h6>
                    <h5>₹ 0</h5>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="iconify iconify--nimbus"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="M5.44 7.47h5.26v1.25H5.44zm0 2.36h5.26v1.25H5.44zm0-4.76h5.26v1.25H5.44z"
                      />
                      <path
                        fill="currentColor"
                        d="M11.34 1L9.64.28L8.08 1L6.41.28L4.84 1L2.46 0v16l2.38-1l1.57.69L8.08 15l1.56.69l1.7-.69l2.2 1V0zm.94 13.11l-.92-.41l-1.69.69l-1.57-.72l-1.68.69l-1.55-.69l-1.15.47V1.86l1.15.47l1.55-.69l1.68.69l1.57-.69l1.69.69l.92-.41z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h6>You owe</h6>
                    <h5>₹ 0</h5>
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
              <a
                className="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-l29tcp"
                href="/dashboard/addExpense/6575bc32e41cc4beb3c96797"
              >
                Add Expense
              </a>
            </p>
          </Row>
        </Row>
      </Container>
    </div>
  );
};
export default GroupPage;
