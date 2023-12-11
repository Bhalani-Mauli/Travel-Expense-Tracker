import { Card } from "react-bootstrap";
const GroupCard = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <a
            href="/dashboard/groups/view/6575bc32e41cc4beb3c96797"
            className="card-link"
          >
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
                  <h3 className="card-title">demo</h3>
                  <h6 className="card-subtitle mb-2 text-muted">demo</h6>
                </div>
                <div className="stack">
                  <p className="card-text">
                    <b>Settled</b>
                  </p>
                  <p className="card-text">
                    <b>You are owed : ₹ 0</b>
                  </p>
                </div>
                <a
                  href="/dashboard/addExpense/6575bc32e41cc4beb3c96797"
                  className="btn btn-outline-primary btn-md"
                >
                  Add Expense
                </a>
              </Card.Body>
            </Card>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
