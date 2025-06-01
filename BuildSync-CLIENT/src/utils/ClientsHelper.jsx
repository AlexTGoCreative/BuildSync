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

// Funcție pentru ștergerea unui client
export const deleteClient = async (clientId) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/client/${clientId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      alert("Client deleted successfully!");
      return true;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
    return false;
  }
};

// Butoane pentru fiecare client, cu buton de delete adăugat
export const ClientButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      const success = await deleteClient(Id);
      if (success) {
        // Reîncarcă pagina sau actualizează lista clienților
        window.location.reload(); // Alternativ, poți folosi un mecanism de stare pentru a actualiza lista
      }
    }
  };

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
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};