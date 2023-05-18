import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, reset } from "../userFeature/state/userSlice";
import UserListItem from "../../components/UserListItem";
import { ImSpinner10 } from "react-icons/im";
import AlertModal from "../../components/AlertModal";

const ViewAllUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
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

    if (!user) {
      navigate("/login");
    }

    dispatch(getUsers());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <div className="flex flex-col h-[90%] w-full mx-auto p-4 max-w-4xl overflow-y-auto">
      {!isLoading ? (
        <>
          <div className="border-b w-full">
            <h1 className="text-center text-[#133746] font-semibold text-2xl">
              Users Profiles
            </h1>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-2 gap-4 items-center justify-center">
            {users.map((user, index) => {
              return <UserListItem key={user._id} user={user} />;
            })}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <ImSpinner10 size={48} className="animate-spin" />
        </div>
      )}
      {showAlert && (
        <div className="flex items-center justify-center absolute -top-4 z-10 w-full">
          <AlertModal text={message} status={"fail"} />
        </div>
      )}
    </div>
  );
};

export default ViewAllUsers;
