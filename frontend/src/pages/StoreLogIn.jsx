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
    <div>
      <h1>Store Login</h1>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="admin_user"
            value={credentials.admin_user}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default StoreLogIn;
