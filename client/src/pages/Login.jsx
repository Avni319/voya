import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      // Save JWT

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-3xl w-[400px] border border-zinc-800"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-6 rounded-lg bg-zinc-800 mb-6"
        />

        <button
  type="submit"
  disabled={loading}
  className="w-full bg-teal-500 py-3 rounded-lg"
>
  {loading ? "Logging in..." : "Login"}
</button>

<p className="text-center text-zinc-400 mt-5">
  Don't have an account?{" "}

  <span
    onClick={() => navigate("/signup")}
    className="
    text-teal-400
    cursor-pointer
    hover:underline
    "
  >
    Sign Up
  </span>
</p>
      </form>

    </div>
  );
}

export default Login;