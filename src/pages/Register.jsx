import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
    } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUsers = JSON.parse(
      localStorage.getItem("babafly-users") || "[]"
    );

    const userExists = existingUsers.some(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    localStorage.setItem(
      "babafly-users",
      JSON.stringify([
        ...existingUsers,
        newUser,
      ])
    );

    dispatch(
      login({
        token: `babafly-${Date.now()}`,
        user: {
          name,
          email,
        },
      })
    );

    navigate("/");
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16">

      <div className="mx-auto max-w-[460px]">

        <div className="text-center">

          <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#ff3f6c]">
            Join BabaFly
          </p>

          <h1 className="mt-3 font-['Manrope'] text-[36px] font-extrabold tracking-[-1.5px]">
            Create account
          </h1>

          <p className="mt-3 text-[13px] text-[#888]">
            Create your account and start shopping.
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="mt-10 border border-[#eeeeee] p-6 sm:p-8"
        >

          {error && (
            <div className="mb-5 border border-[#ffdddd] bg-[#fff7f7] px-4 py-3 text-[10px] text-[#d33]">
              {error}
            </div>
          )}

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[1px] text-[#777]">
                Full name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="h-12 w-full border border-[#dddddd] px-4 text-[12px] outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[1px] text-[#777]">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="h-12 w-full border border-[#dddddd] px-4 text-[12px] outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[1px] text-[#777]">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="h-12 w-full border border-[#dddddd] px-4 text-[12px] outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[1px] text-[#777]">
                Confirm password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="h-12 w-full border border-[#dddddd] px-4 text-[12px] outline-none transition focus:border-black"
              />
            </div>

          </div>

          <button
            type="submit"
            className="mt-7 block w-full bg-[#171717] px-6 py-4 text-center text-[11px] font-bold uppercase tracking-[1.5px] text-white transition hover:bg-[#ff3f6c]"
          >
            Create account
          </button>

          <p className="mt-6 text-center text-[11px] text-[#888]">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-bold text-[#171717] transition hover:text-[#ff3f6c]"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;