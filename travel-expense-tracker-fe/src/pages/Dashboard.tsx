import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";

import GroupCard from "./GroupCard";
import { Group } from "../types/api";
import { fetchGroups } from "../apis/apis";

const Dashboard: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchGroups();
        setGroups(response.data);
      } catch (error: any) {
        console.error("Error fetching groups:", error.message);
      }
    })();
  }, []);

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
      {groups &&
        groups.map((group) => <GroupCard key={group._id} group={group} />)}
    </>
  );
};

export default Dashboard;
