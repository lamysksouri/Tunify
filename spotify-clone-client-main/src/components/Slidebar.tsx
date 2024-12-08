import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { getAllPlaylistsByUserId } from "../redux/reducers/media.reducer";
import { User } from "../types/user";
import { Playlist } from "../types/media";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { FaSpotify } from "react-icons/fa";
import { BiSearchAlt2, BiSolidSearch, BiLibrary } from "react-icons/bi";
import { SlLogin } from "react-icons/sl";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51QQVyGP7egOQ2iEm5ivVDGXfsIdE7WaozKHAahtdokUT5jzLSZ7HBrn9zWBDgVawf6hPAjdbADDjqUIKXBjS0a0100CWr8DVIn");

interface Proptype {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const Slidebar = (props: Proptype) => {
  const { active, setActive } = props;
  const navigate = useNavigate();
  const dispatchAsync = useAppDispatch();
  const params = window.location.href;

  const userProfile = useSelector<RootState, User | null>(
    (state) => state.user.profile
  );

  const userPlaylist = useSelector<RootState, Playlist[]>(
    (state) => state.media.userPlaylist
  );

  useEffect(() => {
    if (params.includes("/search")) {
      setActive("search");
    } else {
      setActive("home");
    }
  }, [params]);

  useEffect(() => {
    if (userProfile !== null && userProfile.id) {
      dispatchAsync(getAllPlaylistsByUserId(userProfile.id));
    }
  }, [userProfile]);

  const handleBecomePremium = async () => {
    const stripe = await stripePromise;
    try {
      const response = await axios.post("http://localhost:8080/api/v1/stripe/create-checkout-session", {
        priceId: "price_1QQw7NP7egOQ2iEmSmS1AJRn", // Replace with your price ID
        username: userProfile?.username,
      });

      const { sessionId } = response.data;
      const { error } = await stripe?.redirectToCheckout({
        sessionId,
      });

      if (error) {
        toast.error(error.message);
      } else {
        // Redirect to success page
        window.location.href = `/success?session_id=${sessionId}`;
      }
    } catch (error) {
      toast.error("Failed to create checkout session");
    }
  };

  return (
    <div className="hidden min-w-[250px] max-h-screen md:flex flex-col gap-2">
      <div className="bg-[#121212] rounded-md py-6 px-6">
        <Link to="/">
          <div className="flex items-center gap-[3px]">
            <p>
              <FaSpotify size={25} />
            </p>
            <p className="text-md">Tunify</p>
          </div>
        </Link>

        <div className="mt-[25px] text-[15px] flex flex-col gap-8">
          <div
            className={`flex justify-start items-center hover:cursor-pointer ${
              active === "home" && "font-semibold"
            }`}
            onClick={() => {
              setActive("home");
              navigate("/");
            }}
          >
            <p className="w-[40px]">
              {active === "home" ? (
                <GoHomeFill size={30} />
              ) : (
                <GoHome size={30} />
              )}
            </p>
            <p className="ml-3">Home</p>
          </div>
          <div
            className={`flex justify-start items-center hover:cursor-pointer ${
              active === "search" && "font-semibold"
            }`}
            onClick={() => {
              setActive("search");
              navigate("/search");
            }}
          >
            <p className="w-[40px]">
              {active === "search" ? (
                <BiSolidSearch size={30} />
              ) : (
                <BiSearchAlt2 size={30} />
              )}
            </p>
            <p className="ml-3">Search</p>
          </div>
          <div
            className={`flex justify-start items-center hover:cursor-pointer ${
              active === "library" && "font-semibold"
            }`}
            onClick={() => {
              setActive("library");
              navigate("/library");
            }}
          >
            <p className="w-[40px]">
              <BiLibrary size={30} />
            </p>
            <p className="ml-3">Your Library</p>
          </div>
          {userProfile && userProfile.roles === "ROLE_USER" && userProfile.subscriptionStatus === "FREE" && (
            <div
              className="flex justify-start items-center bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200 cursor-pointer"
              onClick={handleBecomePremium}
            >
              <p className="w-[40px]">
                <FaSpotify size={30} />
              </p>
              <p className="ml-3">Become a Premium Member?</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slidebar;