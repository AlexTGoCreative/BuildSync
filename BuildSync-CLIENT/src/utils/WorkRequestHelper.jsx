import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Client ID",
    selector: (row) => row.clientId,
    width: "110px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "120px",
  },
  {
    name: "Start Date",
    selector: (row) => new Date(row.startDate).toLocaleDateString(),
    width: "140px",
  },
  {
    name: "End Date",
    selector: (row) => new Date(row.endDate).toLocaleDateString(),
    width: "140px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "100px",
  },
  {
    name: "Applied At",
    selector: (row) => new Date(row.appliedAt).toLocaleDateString(),
    width: "140px",
  },
  {
    name: "Action",
    cell: (row) => row.action,
    center: true,
  },  
];

export const WorkRequestButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/work/${id}`);
  };

  return (
    <button
      className="px-3 py-1 bg-teal-600 text-white"
      onClick={() => handleView(Id)}
    >
      View
    </button>
  );
};