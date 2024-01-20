import React, { useState } from "react";
import axios from "axios";

const StoreLogIn = () => {
  const [credentials, setCredentials] = useState({
    admin_user: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check the response for success
      if (response.data.success) {
        // Redirect to the Book CRUD page (replace '/book-crud' with your desired route)
        window.location.href = "#";
      } else {
        // Show an alert or update state to inform the user about the failed login
        alert("Incorrect username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);

      // Handle specific errors if needed
      if (error.response) {
        console.error("Response data:", error.response.data);
      }

      // Show an alert or update state to inform the user about the error
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#D2CBB1] text-black">
      <div className="bg-[#DCAB6B] p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Store Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Username:</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="admin_user"
              value={credentials.admin_user}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password:</label>
            <input
              className="w-full p-2 border rounded"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded hover:bg-[#49E9C1] transition"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoreLogIn;
