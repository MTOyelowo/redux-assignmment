import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../../features/authFeature/state/authSlice";
import Spinner from "../../components/Spinner";
import { RootState, AppDispatch } from "../../app/store";
import CountryCodes from "../../app/mocks/CountryCodes.json";

interface FormData {
  firstName: "";
  lastName: "";
  email: "";
  phone: "";
  password: "";
  confirmPassword: "";
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const { firstName, lastName, email, password, confirmPassword, phone } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // if (isError) {
    //   toast.error(message);
    // }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleCountrySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = event?.target.value;
    setSelectedCountry(country);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedCountry && e.target.name === "phone") {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: selectedCountry + e.target.value,
      }));
    }
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      //toast.error("Passwords do not match");
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        phone,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder="Enter firstname"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={lastName}
              placeholder="Enter lastname"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <select
              id="selectedCountry"
              onChange={handleCountrySelect}
              className=""
            >
              <option defaultValue="true">Country Code</option>
              {CountryCodes.map((country, index) => {
                return (
                  <option key={index} value={country.dial_code}>
                    {country.name} ({selectedCountry})
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={phone}
              placeholder="Enter phone number"
              onChange={onChange}
              multiple
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
