import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const WorkList = () => {
  const [workRequests, setWorkRequests] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [showReasonModal, setShowReasonModal] = useState(false);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  const fetchWorkRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/work-request/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setWorkRequests(response.data.requests);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchWorkRequests();
  }, []);

  const handleViewReason = (reason) => {
    setSelectedReason(reason || "No reason provided");
    setShowReasonModal(true);
  };

  if (!workRequests) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Work Requests</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Request Name"
          className="px-4 py-0.5 border"
        />
        {user.role === "client" && (
          <Link
            to="/client-dashboard/add-work"
            className="px-4 py-1 bg-teal-600 rounded text-white"
          >
            Add New Work Request
          </Link>
        )}
      </div>

      <table className="w-full text-sm text-left text-gray-500 mt-6">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-6 py-3">SNO</th>
            <th className="px-6 py-3">Request Name</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {workRequests.map((request) => (
            <tr
              key={request._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-3">{sno++}</td>
              <td className="px-6 py-3">{request.name}</td>
              <td className="px-6 py-3">
                {new Date(request.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">
                {new Date(request.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">{request.status}</td>
              <td className="px-6 py-3">
                {request.status === "Rejected" && (
                  <button
                    className="px-3 py-1 bg-teal-600 text-white"
                    onClick={() => handleViewReason(request.rejectionReason)}
                  >
                    View
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rejection Reason Modal */}
      {showReasonModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Rejection Reason</h3>
            <p className="text-gray-700 mb-4">{selectedReason}</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => setShowReasonModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkList;