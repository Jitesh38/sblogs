import { useState, useEffect } from "react";
import { fetchData, updateWithFormData } from "../../utils";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({ ...userData });
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      let data = await fetchData("user");
      if (data) {
        console.log(data);
        setUserData(data);
      }
    }
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({ ...userData });
  };

  const handleSave = async () => {
    setLoading(true);
    setUserData({ ...formData });
    let formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("fullname", formData.fullname);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("avatar", formData.avatar);
    setIsEditing(false);
    // console.log(formData);
    let data = await updateWithFormData(
      "user",
      formDataToSend,
      { credentials: "include" },
      "PUT"
    );
    if (data) {
      setUserData(prev => ({...prev,avatar:data?.avatar}));
      console.log("Profile updated:", data);
    }
    setLoading(false)
  };

  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: e.target.files[0],
      }));
    }
  };

  return loading ? <span className="loading loading-dots loading-xl"></span> : (
    <div className="min-h-screen bg-base-200 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-base-content">
              Profile Settings
            </h1>
            <p className="text-base-content/70 mt-2">
              Manage your account information
            </p>
          </div>

          {/* Profile Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {/* Avatar Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="avatar mb-4">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/public/temp/${
                        userData?.avatar
                      }`}
                      alt="Avatar"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="form-control">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs"
                    />
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Username */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Username</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                      className="input input-bordered w-full"
                    />
                  ) : (
                    <div className="p-3 bg-base-200 rounded-lg">
                      <span className="text-base-content">
                        {userData.username}
                      </span>
                    </div>
                  )}
                </div>

                {/* Full Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Full Name</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      className="input input-bordered w-full"
                    />
                  ) : (
                    <div className="p-3 bg-base-200 rounded-lg">
                      <span className="text-base-content">
                        {userData.fullname}
                      </span>
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                        className="input input-bordered w-full pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content"
                      ></button>
                    </div>
                  ) : (
                    <div className="p-3 bg-base-200 rounded-lg">
                      <span className="text-base-content">
                        {userData.email}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card-actions justify-end mt-8 pt-6 border-t border-base-300">
                {isEditing ? (
                  <div className="flex gap-3">
                    <button onClick={handleCancel} className="btn btn-ghost">
                      Cancel
                    </button>
                    <button onClick={handleSave} className="btn btn-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <button onClick={handleEdit} className="btn btn-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-6">
            <p className="text-sm text-base-content/60">
              Keep your profile information up to date for the best experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
