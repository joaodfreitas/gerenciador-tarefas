import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError("As senhas não coincidem.");
    }
    try {
      setError("");
      await signup(email, password);
    } catch {
      setError("Falha ao criar conta.");
    }
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 400 }}>
      <h2>Registrar</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Confirmar Senha"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100" type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
}
