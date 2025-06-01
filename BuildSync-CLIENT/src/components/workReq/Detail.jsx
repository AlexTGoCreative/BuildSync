import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail1 = () => {
  const { id } = useParams();
  const [workRequest, setWorkRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/work-request/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setWorkRequest(response.data.request);
        }
      } catch (error) {
        console.log("Error: " + error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchWorkRequest();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
  
      // 1. Update the work request status
      const response = await axios.put(
        `http://localhost:5000/api/work-request/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // 2. If approved, also create a Department (construction site)
      if (status === "Approved" && response.data.success) {
        const department = {
          dep_name: workRequest.name,
          description: `Approved work request for client ${workRequest.clientId?.userId?.name || 'N/A'} - from ${new Date(workRequest.startDate).toLocaleDateString()} to ${new Date(workRequest.endDate).toLocaleDateString()}`,
        };
  
        await axios.post("http://localhost:5000/api/department/add", department, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
  
      // 3. Navigate after success
      if (response.data.success) {
        navigate("/admin-dashboard/work");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        console.log("Unexpected error:", error);
      }
    }
  };  

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {workRequest ? (
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-extrabold mb-10 text-center text-indigo-600">
            Work Request Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              {/* Optional image or placeholder */}
              <div className="h-40 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-400 font-bold text-lg">
                No Profile Image
              </div>
            </div>
            <div className="space-y-4">
              <DetailRow label="Name" value={workRequest.name} />
              <DetailRow
                label="Client Name"
                value={workRequest.clientId?.userId?.name}
              />
              <DetailRow
                label="Start Date"
                value={new Date(workRequest.startDate).toLocaleDateString()}
              />
              <DetailRow
                label="End Date"
                value={new Date(workRequest.endDate).toLocaleDateString()}
              />
              <DetailRow
                label="Applied At"
                value={new Date(workRequest.appliedAt).toLocaleDateString()}
              />
              <div className="flex items-center space-x-3">
                <p className="text-lg font-semibold">
                  {workRequest.status === "Pending" ? "Action:" : "Status:"}
                </p>
                {workRequest.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
                      onClick={() =>
                        changeStatus(workRequest._id, "Approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                      onClick={() => changeStatus(workRequest._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="text-md font-medium">{workRequest.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">Loading...</div>
      )}
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex items-center space-x-3">
    <p className="text-lg font-semibold">{label}:</p>
    <p className="text-md font-medium">{value}</p>
  </div>
);

export default Detail1;
