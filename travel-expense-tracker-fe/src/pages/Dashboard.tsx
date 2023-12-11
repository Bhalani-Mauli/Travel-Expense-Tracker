import { Button, Card } from "react-bootstrap";
import GroupCard from "./GroupCard";

const Dashboard: React.FC = () => {
  return (
    <>
      <Card style={{ backgroundColor: "rgb(209, 233, 252)" }}>
        <Card.Body className="d-flex flex-row align-items-center">
          <div className="flex-grow-1">
            <Card.Title>Hello, Welcome!</Card.Title>
            <Card.Text>
              Keep track of shared expenses and settle your corresponding
              balances in a convenient and personalized way.
            </Card.Text>
            <Button variant="primary">View Group</Button>
          </div>
          <div className="ml-3">
            <Card.Img
              variant="right"
              src="https://png.pngtree.com/illustration/20220705/ourmid/pngtree-expense-report-bill-banner-set-image_77456.png"
              alt="Expense Report"
              style={{ maxWidth: "80%", height: "auto" }}
            />
          </div>
        </Card.Body>
      </Card>
      <GroupCard />
    </>
  );
};

export default Dashboard;
