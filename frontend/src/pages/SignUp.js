import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import loginImg from "../assets/login-img.jpg";
import "./Auth.css";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) errors.username = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    if (!password.trim()) errors.password = "Password is required";
    if (!confirmPassword.trim())
      errors.confirmPassword = "Confirm Password is required";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!phone.trim()) errors.phone = "Phone Number is required";
    else if (!/^\d{10}$/.test(phone)) errors.phone = "Invalid Phone Number";

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPassword.test(password)) {
      errors.password =
        "Password must be 8+ chars with uppercase, lowercase, number, and special char";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(SummaryApi.signup.url, {
        method: SummaryApi.signup.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, phone }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      setErrors({ api: error.message });
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
          <h1 className="text-2xl text-white font-bold mb-4">
            Create New Account
          </h1>
          <p className="mb-4 text-white text-lg">Already have an account?</p>
          <Link
            to="/login"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg block text-center"
          >
            Sign In
          </Link>
        </div>

        <div className="p-6 bg-gray-300 bg-opacity-60 text-white rounded-lg w-80 sm:w-96">
          <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
          <form onSubmit={onSubmitForm}>
            {/* Add all signup form fields matching your original structure */}
            <label className="block mb-2">Name</label>
            <input
              name="username"
              placeholder="Enter your Name"
              value={username}
              onChange={onChange}
              className="w-full p-2 mb-1 rounded-lg bg-white text-black border border-gray-600"
            />
            {errors.username && (
              <p className="error text-black text-md">{errors.username}</p>
            )}

            <label className="block mt-4 mb-2">E-Mail</label>
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
                placeholder="Enter Password"
                value={password}
                onChange={onChange}
                className="w-full p-2 pr-10 rounded-lg bg-white text-black border border-gray-600" /* Added pr-10 for padding */
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 flex items-center justify-center" /* Fixed positioning */
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-black text-md mt-1">{errors.password}</p>
            )}

            <label className="block mt-4 mb-2">Confirm Password</label>
            <div className="password-input relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={onChange}
                className="w-full p-2 pr-10 rounded-lg bg-white text-black border border-gray-600" /* Added pr-10 for padding */
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 flex items-center justify-center" /* Fixed positioning */
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-black text-md mt-1">
                {errors.confirmPassword}
              </p>
            )}

            <label className="block mt-4 mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={onChange}
              className="w-full p-2 mb-1 rounded-lg bg-white text-black border border-gray-600"
            />
            {errors.phone && (
              <p className="error  text-md text-black">{errors.phone}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg mt-4"
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
