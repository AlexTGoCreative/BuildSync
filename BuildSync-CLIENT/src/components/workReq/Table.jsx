import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, WorkRequestButtons } from "../../utils/WorkRequestHelper";
import axios from "axios";

const Table1 = () => {
  const [requests, setRequests] = useState(null);
  const [filteredRequests, setFilteredRequests] = useState(null);

  const fetchWorkRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/work-request", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.requests.map((request) => ({
          _id: request._id,
          sno: sno++,
          clientId: request.clientId._id,
          clientName: request.clientId.userId.name,
          entityType: request.clientId.entityType,
          phone: request.clientId.phone || "N/A",
          requestType: request.requestType,
          name: request.name,
          startDate: request.startDate,
          endDate: request.endDate,
          appliedAt: request.createdAt || request.appliedAt || new Date(),
          status: request.status,
          action: <WorkRequestButtons Id={request._id} />,
        }));        
        setRequests(data);
        setFilteredRequests(data);
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

  const filterByInput = (e) => {
    const data = requests.filter((request) =>
      request.clientId
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredRequests(data);
  };

  const filterByButton = (status) => {
    const data = requests.filter((request) =>
      request.status
        .toLowerCase()
        .includes(status.toLowerCase())
    );
    setFilteredRequests(data);
  };

  return (
    <>
      {filteredRequests ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Work Requests</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Client Id"
              className="px-4 py-0.5 border"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-3">
            <DataTable columns={columns} data={filteredRequests} pagination />
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default Table1;