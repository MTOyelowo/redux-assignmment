import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { register, reset } from "./state/authSlice";
import AlertModal from "../../components/AlertModal";
import Spinner from "../../components/Spinner";
import CountryCodes from "../../app/mocks/CountryCodes.json";
import classNames from "classnames";

const commonInput =
  "w-full bg-transparent outline-none border border-gray-300 focus:border-blue-300 rounded transition p-2";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const { firstName, lastName, email, password, confirmPassword, phone } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const timerId = useRef(null);

  useEffect(() => {
    if (showAlert) {
      timerId.current = setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }

    return () => {
      clearTimeout(timerId.current);
    };
  }, [showAlert]);

  useEffect(() => {
    if (isError) {
      setShowAlert(true);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleCountrySelect = (event) => {
    const country = event?.target.value;
    setSelectedCountry(country);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const phonenumber = selectedCountry + phone;

    if (password !== confirmPassword) {
      //toast.error("Passwords do not match");
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        phone: phonenumber,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-[90%] w-screen">
      <section className="flex flex-col items-center justify-center border-b p-2 text-[#133746]">
        <AiOutlineUser size={30} />
        <p className="text-lg font-semibold">Please create an account</p>
      </section>

      <section className="w-[80%] sm:w-96">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="text"
            name="firstName"
            value={firstName}
            onChange={onChange}
            placeholder="Enter first name"
          />
          <Input
            type="text"
            name="lastName"
            value={lastName}
            onChange={onChange}
            placeholder="Enter last name"
          />
          <Input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter email"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter password"
          />
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            placeholder="Confirm Password"
          />

          <select
            id="selectedCountry"
            onChange={handleCountrySelect}
            className={classNames(commonInput, "italic")}
          >
            <option className="text-gray">Country</option>
            {CountryCodes.map((country, index) => {
              return (
                <option key={index} value={country.dial_code}>
                  {country.name}
                </option>
              );
            })}
          </select>
          <label className="block relative">
            <span className="absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2">
              {selectedCountry !== "Country" ? selectedCountry : null}
            </span>
            <input
              name="phone"
              value={phone}
              type="text"
              placeholder="Enter phone number"
              className={
                selectedCountry !== "Country"
                  ? classNames(commonInput, "italic pl-14")
                  : classNames(commonInput, "italic")
              }
              onChange={onChange}
            />
          </label>

          <div className="form-group">
            <button
              type="submit"
              className="w-full bg-[#133746] outline-none border rounded transition p-2 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
      {showAlert && (
        <div className="flex items-center justify-center absolute -top-4 z-10 w-full">
          <AlertModal text={message} status={"fail"} />
        </div>
      )}
    </div>
  );
};

const Input = ({ name, value, placeholder, label, onChange, type }) => {
  return (
    <label className="block relative">
      <span className="absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2">
        {label}
      </span>
      <input
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        className={classNames(commonInput, "italic")}
        onChange={onChange}
      />
    </label>
  );
};

export default Register;
