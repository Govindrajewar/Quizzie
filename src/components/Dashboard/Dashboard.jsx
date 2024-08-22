import "../../style/Dashboard/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-navbar">
        <h1>QUIZZIE</h1>
        <ul>
          <li>Dashboard</li>
          <li>Analytics</li>
          <li>Create Quiz</li>
        </ul>
        <div>
          <hr />
          <button>LOGOUT</button>
        </div>
      </div>

      <div className="dashboard-content"></div>
    </div>
  );
}

export default Dashboard;
