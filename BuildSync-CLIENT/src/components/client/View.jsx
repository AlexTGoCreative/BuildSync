import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View1 = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/client/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setClient(response.data.client);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchClient();
  }, [id]);

  return (
    <>
      {client ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Client Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {client.userId.profileImage ? (
                <img
                  src={`http://localhost:5000/${client.userId.profileImage}`}
                  className="rounded-full border w-72"
                  alt="Client"
                />
              ) : (
                <p>No profile image available</p>
              )}
            </div>
            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{client.userId.name}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Email:</p>
                <p className="font-medium">{client.userId.email}</p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Entity Type:</p>
                <p className="font-medium">
                  {client.entityType === "natural" ? "Natural Person" : "Legal Entity"}
                </p>
              </div>

              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Phone:</p>
                <p className="font-medium">{client.phone || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default View1;