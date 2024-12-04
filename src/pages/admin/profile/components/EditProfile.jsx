import Card from "@/components/card";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useUpdateProfile } from "@/hooks/auth";

const EditProfile = () => {
  const { data, isLoading } = useAuth();
  const { mutate: updateProfile } = useUpdateProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);  // Change to store file

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const DEFAULT_AVATAR = "/default-avatar.svg";

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setProfileImage(data.profileImg || null); 
    }
  }, [data]);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation function
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phone);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (inputEmail && !validateEmail(inputEmail)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    setPhone(inputPhone);

    if (inputPhone && !validatePhone(inputPhone)) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleSave = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address before saving.");
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);

    // Append image only if it is selected
    if (profileImage) {
      formData.append("avatar", profileImage);
    }

    setIsUpdating(true);
    setUpdateError("");

    updateProfile(formData, {
      onSuccess: () => {
        setIsUpdating(false);
        alert("Profile updated successfully!");
      },
      onError: (error) => {
        setIsUpdating(false);
        setUpdateError(error.message || "Failed to update profile.");
      },
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      if (file.size > 2 * 1024 * 1024) { 
        alert("Image size must be less than 2MB.");
        return;
      }

      setProfileImage(file);  // Store the file directly
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col rounded-xl p-[20px] gap-[20px] items-center">
      <div className="flex flex-col gap-3 w-full items-center">
        <Card extra="w-full h-full p-3">
          <div>
            <div className="mt-2 mb-8 w-full">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                Edit Profile
              </h4>
            </div>

            <div
              className="relative mx-[15px] w-[120px] h-[120px] cursor-pointer"
              onClick={() => document.getElementById("upload-image").click()}
            >
              <label
                htmlFor="upload-image"
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
              >
                <img
                  src={profileImage ?profileImage : DEFAULT_AVATAR}  
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-primary"
                />
                <span className="absolute bottom-0 right-0 bg-primary text-white rounded-full w-[30px] h-[30px] flex items-center justify-center">
                  📷
                </span>
              </label>
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            <div className="grid gap-4 px-2">
              {/* Full Name Field */}
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Full Name</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="text-base px-[10px] h-[45px] w-full rounded-[10px] bg-gray-200 font-medium text-navy-700 dark:text-white"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Email</p>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  className="text-base px-[10px] h-[45px] w-full rounded-[10px] bg-gray-200 font-medium text-navy-700 dark:text-white"
                />
                {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
              </div>

              {/* Phone Field */}
              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Phone</p>
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter your phone number"
                  className="text-base px-[10px] h-[45px] w-full rounded-[10px] bg-gray-200 font-medium text-navy-700 dark:text-white"
                />
                {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end py-[20px] gap-3 w-full items-center">
            {updateError && <p className="text-red-500">{updateError}</p>}
            <button
              onClick={handleSave}
              className={`${
                isUpdating ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
              } px-[30px] rounded-[10px] py-[15px] text-white dark:bg-navy-600`}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
