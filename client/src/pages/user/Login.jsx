import React,{useState} from "react";
import { useNavigate } from "react-router";
import { updateData } from '../../utils'

function Login() {
  document.title = "Sblogs - Login";

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await updateData("user/login", { ...formData });
    console.log(data);
    if (data) {
      sessionStorage.setItem("token", data?.accessToken);
      navigate("/");
    }
  };
  return (
    <div className="flex-center pt-7">
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Username</label>
          <input
            type="email"
            className="input"
            placeholder="Email Address"
            name="email"
            onChange={handleInput}
            value={formData.email}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            onChange={handleInput}
            value={formData.password}
          />

          <button className="btn btn-neutral mt-4" type="submit">
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
