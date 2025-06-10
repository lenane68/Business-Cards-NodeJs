import PageHeader from "../components/common/pageHeader";
import { FaCheckCircle, FaCode, FaProjectDiagram } from "react-icons/fa";

function About() {
  return (
    <div className="container py-4">
      <PageHeader title="About This App" description="Discover what this app offers and how it works" />

      <div className="row mt-5">
        <div className="col-md-6">
          <h4 className="mb-3"><FaProjectDiagram className="me-2" /> What Is This App?</h4>
          <p className="lead">
            This digital business card application allows users to easily create, manage, and share virtual business cards. It's built for regular users, business owners, and administrators — each with tailored access.
          </p>
        </div>
        <div className="col-md-6">
        <img
  src="https://cdn-icons-png.flaticon.com/512/2087/2087815.png"
  alt="Business Card Illustration"
  className="img-fluid rounded shadow-sm"
  style={{ maxWidth: "100%", height: "auto", maxHeight: "300px", objectFit: "contain" }}
/>

        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <h4 className="mb-3"><FaCheckCircle className="me-2" /> Main Features</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Create and update business cards</li>
            <li className="list-group-item">Delete or favorite cards</li>
            <li className="list-group-item">Personalized card lists</li>
            <li className="list-group-item">Business users see only their cards</li>
            <li className="list-group-item">Admins access all cards and CRM</li>
            <li className="list-group-item">Search and filter dynamically</li>
            <li className="list-group-item">Dark mode and mobile support</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h4 className="mb-3"><FaCode className="me-2" /> Technologies Used</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">React + Vite</li>
            <li className="list-group-item">React Router</li>
            <li className="list-group-item">Axios for HTTP requests</li>
            <li className="list-group-item">Formik + Joi for validation</li>
            <li className="list-group-item">Bootstrap 5 layout system</li>
            <li className="list-group-item">JSON Server as a mock backend</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="text-muted">
          This project was built as part of a hands-on frontend development program to master modern tools and workflows.
        </p>
      </div>
    </div>
  );
}

export default About;
