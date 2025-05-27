import axios from "axios";
import { useNavigate } from "react-router-dom";

// Coloane pentru tabela de clienți
export const clientColumns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    width: "200px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

// Funcție opțională pentru obținerea clienților pe grup, dacă este cazul
export const getClientsByGroup = async (groupId) => {
  let clients;
  try {
    const response = await axios.get(
      `http://localhost:5000/api/client/group/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      clients = response.data.clients;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return clients;
};

// Butoane pentru fiecare client, fără delete
export const ClientButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/clients/${Id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 text-white"
        onClick={() => navigate(`/admin-dashboard/clients/edit/${Id}`)}
      >
        Edit
      </button>
    </div>
  );
};
