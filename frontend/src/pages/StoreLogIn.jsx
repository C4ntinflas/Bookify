import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from 'react-icons/bs';
import Navbar from "./components/NavBar";


function StoreLogIn() {
  const [storesData, setStoresData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/stores`)
      .then((response) => {
        console.log('Data from server:', response.data.foundStores);
        setStoresData(response.data.foundStores);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
        setLoading(false);
      });
  }, []);

  function verification() {
    for (let i = 0; i < storesData.length; i++) {
      if (credentials.admin_user === storesData[i].admin_user) {
        if (credentials.password === storesData[i].password) {
          const storeId = storesData[i].store_id;
          navigate(`store/${storeId}/inventory`, { state: storesData[i] });
          return;
        }
      }
    }
    console.log('Invalid credentials');
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

  const BackButton = () => {
    history.back()
  };

  return (
    <div className="bg-[#D2CBB1]">
      <Navbar />
      <div className="bg-[#D2CBB1]">
        <button type="button" onClick={BackButton}
          className='mt-3 mr-3 bg-[#36311F] text-white px-4 py-2 rounded-md flex items-center hover:bg-[#36311F] transition-all duration-300 text-lg text-2xl'
        ><BsArrowLeft className='text-2xl mr-2' />Back</button>

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
              <a className="mb-4" href="http://localhost:5173/login/createStore">Create Store</a>
              <button
                className="mt-3 w-full bg-black text-white p-2 rounded hover:bg-[#49E9C1] transition"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLogIn;