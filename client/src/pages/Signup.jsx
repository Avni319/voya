import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate =
  useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(formData);

      console.log(data);

      alert("Registration Successful");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-3xl w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800"
        />

        <button
          type="submit"
          className="w-full bg-teal-500 py-3 rounded-lg"
        >
          Signup
        </button>
        <p className="text-center text-zinc-400 mt-5">
  Already have an account?{" "}

  <span
    onClick={() => navigate("/login")}
    className="
    text-teal-400
    cursor-pointer
    hover:underline
    "
  >
    Login
  </span>
</p>

      </form>
    </div>
  );
}

export default Signup;