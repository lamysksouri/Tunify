import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { updateUserProfile, getUserProfile } from "../redux/reducers/user.reducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { register, handleSubmit, resetField, formState: { errors } } = useForm();
  const dispatchAsync = useAppDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector((state: RootState) => state.user.profile);

  useEffect(() => {
    if (userProfile) {
      resetField("username", { defaultValue: userProfile.username });
      resetField("email", { defaultValue: userProfile.email });
    }
  }, [userProfile, resetField]);

  const onSubmit = async (data: any) => {
    const updatedUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    const res = await dispatchAsync(updateUserProfile(updatedUser));

    if (res.type === "users/updateUserProfile/fulfilled") {
      toast.success("Profile updated successfully");
      dispatchAsync(getUserProfile());
      navigate("/");
    } else {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#242424] to-[#000]">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-white mb-6">Account Settings</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Username</label>
            <input
              className={`w-full px-3 py-2 text-black ${errors.username ? "border-red-500" : ""}`}
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Email</label>
            <input
              className={`w-full px-3 py-2 text-black ${errors.email ? "border-red-500" : ""}`}
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Password</label>
            <input
              className={`w-full px-3 py-2 text-black ${errors.password ? "border-red-500" : ""}`}
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;