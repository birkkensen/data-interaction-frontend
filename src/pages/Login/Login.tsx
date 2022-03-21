import "./index.css";
import { useState, useEffect } from "react";
import { User } from "../../interfaces";
const Login = () => {
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
  });

  const { email, password }: User = formData;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="heading">
        <h1>Login</h1>
        <p>Bleh</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
