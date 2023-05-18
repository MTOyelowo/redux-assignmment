import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import profile from "../../assets/profile.png";
import { CiEdit } from "react-icons/ci";

const Profile = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="max-w-3xl mx-auto mt-4">
      {user && (
        <>
          <section className="flex items-center justify-center w-full h-12 mb-3">
            <div className="border-b w-full pb-1">
              <h1 className="text-center text-[#133746] font-semibold text-2xl">
                Welcome {user && user.firstName}
              </h1>
            </div>
          </section>
          <div className="relative flex flex-col p-4 text-xs sm:text-md items-center justify-center rounded-2xl space-y-4">
            <div className="flex flex-col items-center justify-center">
              <img src={profile} alt="profile" className="w-40 h-40" />
              <div className="flex space-x-2">
                <div className="flex space-x-2 font-bold text-2xl">
                  <p>{user.firstName}</p>
                  <p>{user.lastName}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex space-x-2 text-base">
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex space-x-2">
                  <p>{user.phone}</p>
                </div>
              </div>
            </div>
            <button className="absolute flex items-center top-0 right-5 w-10 h-10 bg-[#133746] p-2 text-white rounded-full hover:scale-95">
              <CiEdit size={30} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Profile;
