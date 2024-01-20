import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function StoreLogIn() {
  const [storesData, setStoresData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  let storeId = null
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/stores`)
      .then((response) => {
        console.log('Data from server:', response.data.foundStores);
        setStoresData(response.data.foundStores);
        storeId = storesData.store_id
        console.log(storeId)
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
        setLoading(false);
      });
  }, []);



  function verification() {
    const storeId = storesData.store_id
    for (let i = 0; i < storesData.length; i++) {
      if (credentials.admin_user === storesData[i].admin_user) {
        if (credentials.password === storesData[i].password) {
          navigate(`store/${storeId}/inventory`)
        }
      }
    }
  }

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

  function handleLogin() {
    verification()
  }

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