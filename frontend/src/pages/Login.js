import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import loginImg from "../assets/login-img.jpg";
import "./Auth.css";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { fetchUserDetails } = useContext(Context);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) errors.email = "Email is required";
    if (!password.trim()) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Login successful!");

        // Remember Me functionality
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        navigate("/");
        fetchUserDetails();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      setErrors({ api: error.message }); // API error handling
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-custom-gradient justify-start items-center min-h-screen">
      <div className="Logo-img">
        <img src={logo} alt="Company Logo" />
      </div>

      <div
        className="flex flex-wrap gap-6 justify-center bg-cover p-3 rounded-xl"
        style={{ backgroundImage: `url(${loginImg})` }}
      >
        <div className="p-4 bg-transparent rounded-lg w-80 sm:w-96">
          <h1 className="text-2xl text-white font-bold mb-4">Login</h1>
          <p className="mb-4 text-white text-lg">Sign in to continue</p>
          <Link
            to="/sign-up"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg block text-center"
          >
            Sign Up
          </Link>
        </div>

        <div className="p-6 bg-gray-300 bg-opacity-60 text-white rounded-lg w-80 sm:w-96">
          <h1 className="text-2xl font-bold mb-6">Sign In</h1>
          <form onSubmit={onSubmitForm}>
            <label className="block mb-2">E-Mail ID</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={onChange}
              className="w-full p-2 mb-1 rounded-lg bg-white text-black border border-gray-600"
            />
            {errors.email && (
              <p className="error text-black text-md">{errors.email}</p>
            )}

            <label className="block mt-4 mb-2">Password</label>
            <div className="password-input relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={password}
                onChange={onChange}
                className="w-full p-2 pr-10 rounded-lg bg-white text-black border border-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 flex items-center justify-center"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-black text-md mt-1">{errors.password}</p>
            )}

            {/* Forgot Password Link */}
            <Link
              to="/forgot-password"
              className="block text-right mt-2 text-orange-500 hover:underline"
            >
              Forgot Password?
            </Link>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <label>Remember Me</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg mt-4"
            >
              {isLoading ? "Loading..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
