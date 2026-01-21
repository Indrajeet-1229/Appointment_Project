import React, { useContext, useState } from 'react';
import { Calendar, Trash2 } from 'lucide-react';
import Header from './Header';
import { AuthContext } from '../../context/AuthProvider';
import api from '../../utils/api';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Dashboard = () => {
  const [appointments, setAppointments] = useState([

  ]);

 

  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: ""
  })
  const handlechange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => (
      { ...prev, [name]: value }
    ))

  }
  const getAllAppointmets = async () => {
    try {
      const response = await api.get('/appointment');
      const { appointments } = response.data;
      setAppointments(appointments);

    } catch (error) {
      console.log(error.response?.data);
    }
  }
  const cancelAppointment = async (id) => {
    try {
      const response = await api.delete(`/appointment/${id}`);
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        getAllAppointmets();
      }


    } catch (error) {
      console.log(error.response?.data);
    }
  }

  const bookAppointment = async (e) => {
    e.preventDefault();
    if (!newAppointment.date || !newAppointment.time) {
      return toast.error("date and time fields required")
    }
    try {
      const response = await api.post('/appointment', newAppointment);
      const { message, success, appointment } = response.data;


      if (success) {
        toast.success(message);
        setNewAppointment({
          date: "",
          time: ""
        })
        getAllAppointmets();
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    getAllAppointmets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">


        <Header title="Dashboard" />


        <div className="bg-gray-800 border-2 border-emerald-600 rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-bold text-emerald-600 mb-4">
            Book New Appointment
          </h2>

          <form className="flex flex-col md:flex-row gap-4 items-center" onSubmit={bookAppointment}>
            <input onChange={handlechange}
              name="date"
              type="date"
              value={newAppointment.date}
              className="w-full md:w-auto bg-transparent border-2 border-emerald-600 py-2 px-4 rounded-full outline-none text-white"
            />
            <input onChange={handlechange}
              name="time"
              type="time"
              value={newAppointment.time}
              className="w-full md:w-auto bg-transparent border-2 border-emerald-600 py-2 px-4 rounded-full outline-none text-white"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-full"
            >
              Book
            </button>
          </form>
        </div>


        <div className="bg-gray-800 border-2 border-emerald-600 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-emerald-600 mb-4">
            My Appointments
          </h2>

          {appointments?.length === 0 ? (
            <p className="text-gray-400">No appointments booked yet.</p>
          ) : (
            <div className="space-y-4">
              {appointments?.map((appt) => (
                <div
                  key={appt._id}
                  className="flex justify-between items-center bg-gray-700 p-4 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <Calendar size={24} className="text-emerald-600" />
                    <div>
                      <p>
                        <span className="font-semibold">Date:</span> {appt.date}
                      </p>
                      <p>
                        <span className="font-semibold">Time:</span> {appt.time}
                      </p>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-700" onClick={() => cancelAppointment(appt._id)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
