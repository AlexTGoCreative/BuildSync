import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { ClientButtons } from '../../utils/ClientsHelper'

const columns = [
  {
    name: "SNo",
    selector: row => row.sno,
    sortable: true,
    width: "70px"
  },
  {
    name: "Name",
    selector: row => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: row => row.email,
    sortable: true,
  },
  {
    name: "Profile",
    selector: row => row.profileImage,
  },
  {
    name: "Actions",
    selector: row => row.action,
  }
]

const ClientList = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)
  const [filteredClients, setFilteredClients] = useState(null)

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true)
      try {
        const response = await axios.get("http://localhost:5000/api/client", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (response.data.success) {
          let sno = 1;
          const data = response.data.clients.map((client) => ({
            _id: client._id,
            sno: sno++,
            name: client.userId?.name || "N/A",
            email: client.userId?.email || "N/A",
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:5000/${client.userId?.profileImage}`}
                alt="profile"
              />
            ),
            action: <ClientButtons Id={client._id} />
          }))
          setClients(data)
          setFilteredClients(data)
        }
      } catch (error) {
        console.error(error.message)
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = clients.filter((client) =>
      client.name.toLowerCase().includes(searchTerm)
    )
    setFilteredClients(filtered)
  }

  if (!filteredClients) {
    return <div>Loading ...</div>
  }

  return (
    <div className='p-6'>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Clients</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search By Name"
          className="px-4 py-1 border rounded"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-client"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Client
        </Link>
      </div>
      <div className='mt-6'>
        <DataTable columns={columns} data={filteredClients} pagination />
      </div>
    </div>
  )
}

export default ClientList
