import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditClient = () => {
  const [client, setClient] = useState({
    name: "",
    maritalStatus: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/client/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          const c = response.data.client;
          setClient({
            name: c.userId?.name || c.name,
            maritalStatus: c.maritalStatus || ""
          });
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchClient();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/client/${id}`,
        client,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/client-dashboard/profile");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Client</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            placeholder="Insert Name"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Marital Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Marital Status</label>
          <select
            name="maritalStatus"
            onChange={handleChange}
            value={client.maritalStatus}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Client
        </button>
      </form>
    </div>
  );
};

export default EditClient;
