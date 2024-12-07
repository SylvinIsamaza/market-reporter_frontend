import React, { useState } from "react";
import Card from "@/components/card";
import { MdEdit } from "react-icons/md";
import { useChangePassword } from "@/hooks/auth";
import toast from "react-hot-toast";

function ChangePassword() {
  const [activateChangePassword, setActivateChangePassword] = useState(false);
  const { mutate: changePassword } = useChangePassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const minLength = 8;
    const regex = {
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      number: /\d/,
      specialChar: /[@$!%*?&#]/,
    };

    if (!password || password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!regex.uppercase.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!regex.lowercase.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!regex.number.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!regex.specialChar.test(password)) {
      return "Password must contain at least one special character (@$!%*?&#).";
    }

    return null; // No error
  };

  const handleChangePassword = async () => {
    try {
      // Reset errors
      setError("");

      // Validate current password presence
      if (!currentPassword) {
        setError("Current password is required.");
        return;
      }

      // Validate new password
      const validationError = validatePassword(newPassword);
      if (validationError) {
        setError(validationError);
        return;
      }

      // Confirm passwords match
      if (newPassword !== confirmPassword) {
        setError("New password and confirm password do not match.");
        return;
      }

      // Proceed to change password
      const response = await changePassword({
        currentPassword,
        newPassword,
      });
      toast.success("Password changed successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card extra={"w-full h-full p-3"}>
      <div>
        <div className="mt-2 mb-8 w-full">
          <div className="flex justify-between w-full">
            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
              Change Password
            </h4>
            <button
              onClick={() => {
                setActivateChangePassword(!activateChangePassword);
              }}
              className="rounded-full w-[40px] h-[40px] flex items-center justify-center border"
            >
              <MdEdit />
            </button>
          </div>
        </div>
        {/* Cards */}
        <div className="grid gap-4 px-2">
          {/* Current Password */}
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Current Password</p>
            <input
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
              type="password"
              disabled={!activateChangePassword}
              placeholder="Current Password"
              className="text-base px-[10px] h-[45px] w-full rounded-[10px] bg-gray-200 font-medium text-navy-700 dark:text-white"
            />
          </div>
          {/* New Password */}
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">New Password</p>
            <input
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type="password"
              placeholder="New Password"
              disabled={!activateChangePassword}
              className="text-base px-[10px] h-[45px] w-full rounded-[10px] bg-gray-200 font-medium text-navy-700 dark:text-white"
            />
          </div>
          {/* Confirm Password */}
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <p className="text-sm text-gray-600">Confirm Password</p>
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="password"
              placeholder="Confirm Password"
              disabled={!activateChangePassword}
              className="text-base px-[10px] h-[45px] w-full rounded-[10px] bg-gray-200 font-medium text-navy-700 dark:text-white"
            />
          </div>
          {/* Error Message */}
          {error && <p className="text-red-600">{error}</p>}
          {/* Submit Button */}
          <button
            onClick={handleChangePassword}
            disabled={!activateChangePassword}
            className="bg-primary rounded-[10px] py-[15px] text-white dark:bg-navy-600"
          >
            Change Password
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ChangePassword;
