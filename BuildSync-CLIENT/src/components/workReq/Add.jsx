import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddWork = () => {
    const { user } = useAuth();
    const [workRequest, setWorkRequest] = useState({
        userId: user._id,
        name: "",
        startDate: "",
        endDate: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkRequest((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Request payload:", workRequest); // Log the payload
        try {
            const response = await axios.post(
                "http://localhost:5000/api/work-request/add", // ❗️URL-ul trebuie pus între ghilimele
                workRequest,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // ❗️Backtick + template string corect
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data.success) {
                navigate(`/client-dashboard/work/${user._id}`); // ❗️String template corect
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                console.error("Error response:", error.response.data);
                alert(error.response.data.error);
            } else {
                console.error("Unexpected error:", error);
                alert("Something went wrong!");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Request Work</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Request Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={workRequest.name}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            placeholder="Enter request name"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={workRequest.startDate}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                End Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={workRequest.endDate}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit Work Request
                </button>
            </form>
        </div>
    );
};

export default AddWork;
