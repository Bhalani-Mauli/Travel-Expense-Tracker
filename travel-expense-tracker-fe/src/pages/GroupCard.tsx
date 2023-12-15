import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Group } from "../types/api";
import { useAuth } from "../context/auth.context";
import "./styles/groupCard.css";

interface GroupCardProps {
  group: Group;
  fullWidth?: boolean;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, fullWidth }) => {
  const { user } = useAuth();
  const owed = group.split[user!.email];
  const fullWidthClass = fullWidth ? "col-lg-12" : "col-lg-4";

  return (
    <div className={`col-md-12 ${fullWidthClass} mt-4`}>
      <Link to={`/group/${group._id}`} className="card-link">
        <Card
          style={{
            backgroundColor: "rgb(208, 242, 255)",
            color: "rgb(4, 41, 122)",
          }}
        >
          <Card.Body>
            <span
              className="iconify iconify--ic"
              data-icon="mdi:account-group"
              data-inline="false"
              style={{ fontSize: "1em" }}
            ></span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <h3 className="card-title">{group.name}</h3>
              <h6 className="card-subtitle mb-2 text-muted">
                {group.description}
              </h6>
            </div>
            <div className="stack">
              <p className="card-text">
                {group.split[user!.email] == 0 && <b>Settled</b>}
              </p>
              <p className="card-text">
                <b>You are owed : {owed}</b>
              </p>
            </div>
            <div className="card-actionbtn-wrapper">
              <Link
                to={`/addExpense/${group._id}`}
                className="btn btn-outline-primary btn-md"
              >
                Add Expense
              </Link>
              <Link
                to={`/settleExpense/${group._id}`}
                className="btn btn-outline-primary btn-md"
              >
                SettleExpense
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default GroupCard;
