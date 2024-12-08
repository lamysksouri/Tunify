import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Import a success icon

const SuccessPage = () => {
  const userProfile = useSelector((state: RootState) => state.user.profile);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const confirmSubscription = async () => {
      const queryParams = new URLSearchParams(location.search);
      const sessionId = queryParams.get("session_id");

      if (!sessionId) {
        toast.error("No session ID found");
        return;
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/stripe/confirm-subscription`, {
          sessionId,
        });

        if (response.status === 200) {
          toast.success("Subscription updated successfully");
          navigate("/"); // Navigate to the homepage
        } else {
          toast.error("Failed to update subscription");
        }
      } catch (error) {
        toast.error("Failed to update subscription");
      }
    };

    confirmSubscription();
  }, [navigate, location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-white">Subscription Successful</h1>
        <p className="text-gray-300 mb-4">Your subscription has been updated to PREMIUM.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;