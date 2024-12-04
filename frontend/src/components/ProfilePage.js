import React from "react";

const ProfilePage = ({ user }) => {
  // Fallback for user details if not provided
  const defaultUser = {
    email: "example@example.com",
    profilePic: "https://via.placeholder.com/150",
  };

  const currentUser = user || defaultUser;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 text-white flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center md:items-start max-w-4xl mx-auto p-6 bg-white text-gray-800 rounded-lg shadow-lg">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <img
            src={currentUser.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md"
          />
        </div>

        {/* User Details */}
        <div className="mt-4 md:mt-0 md:ml-8 text-center md:text-left">
          <h2 className="text-xl font-bold">User Profile</h2>
          <p className="text-gray-600">{currentUser.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;