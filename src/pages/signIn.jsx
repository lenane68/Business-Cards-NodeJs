import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";
import { useAuth } from "../context/auth.context";
import PageHeader from "../components/common/pageHeader";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginContext({ email, password });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("אימייל או סיסמה שגויים");
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <Container className="mt-4">
      <PageHeader title="LOGIN" />
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="mb-3">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password *</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="row mt-3 mb-2">
          <div className="col-4">
            <button type="button" className="btn btn-outline-danger w-100" onClick={() => navigate(-1)}>
              CANCEL
            </button>
          </div>
          <div className="col-4">
            <button type="button" className="btn btn-outline-secondary w-100" onClick={handleReset}>
              ↻
            </button>
          </div>
          <div className="col-4">
            <button type="submit" className="btn btn-primary w-100">
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
}

export default SignIn;
