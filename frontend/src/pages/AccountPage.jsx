import React, { useState } from "react";

const AccountPage = () => {
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane.doe@email.com",
    phone: "(555) 123-4567",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  });
  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEdit(true);
  const handleSave = (e) => {
    e.preventDefault();
    setEdit(false);
    // Save logic here
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <div className="flex flex-col items-center mb-6">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 mb-2"
          />
          <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
          <span className="text-gray-500">{profile.email}</span>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={!edit}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={!edit}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={!edit}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            {edit ? (
              <>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
