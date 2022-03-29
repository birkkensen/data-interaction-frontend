import { useState } from "react";
import { User } from "../interfaces";
import { loginUser } from "../api";
const Login: React.FC = (): JSX.Element => {
  if (localStorage.getItem("token")) {
    window.location.href = "/dashboard";
  }
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

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await loginUser(formData.email, formData.password)
      .then((data) => {
        if (data.statusText === "OK") {
          localStorage.setItem("token", data.data["token"]);
          window.location.href = "/dashboard";
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <section className="mt-32 w-3/4 mx-auto">
        <h1 className="text-3xl">Login</h1>
        <p className="text-xl">DO shit </p>
      </section>
      <section className="w-3/4 mx-auto">
        <form onSubmit={onSubmit}>
          <input
            autoComplete="birk@gmail.com"
            className="w-full p-2 border border-gray-200 rounded my-2"
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />
          <input
            autoComplete="penna123"
            className="w-full p-2 border border-gray-200 rounded my-2"
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Enter password"
            onChange={onChange}
          />
          <button className="w-full p-2 bg-black rounded text-white" type="submit">
            Login
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
