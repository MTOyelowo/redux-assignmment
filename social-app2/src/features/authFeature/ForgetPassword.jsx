import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import classNames from "classnames";
import { BsPatchQuestionFill } from "react-icons/bs";
import AlertModal from "../../components/AlertModal";

const commonInput =
  "w-full bg-transparent outline-none border border-gray-300 focus:border-blue-300 rounded transition p-2";

const ForgetPassword = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState("");

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
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setShowAlert(true);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-[90%] w-screen">
      <section className="flex flex-col items-center justify-center border-b p-2 text-[#133746]">
        <BsPatchQuestionFill size={30} />
        <p className="text-lg font-semibold">
          Please enter your email to receive reset link
        </p>
      </section>

      <section className="w-[80%] sm:w-96">
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter email"
          />
          <div>
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
          <AlertModal
            text="Reset link sent to"
            secondaryText={email}
            status={"success"}
          />
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
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={classNames(commonInput, "italic")}
        onChange={onChange}
      />
    </label>
  );
};

export default ForgetPassword;
