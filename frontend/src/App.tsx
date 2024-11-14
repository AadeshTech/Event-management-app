import React, { useState, useEffect } from "react";
import axios from "axios";
import ReusableTable from "./components/Table/Index";
import EventForm from "./components/Form/EventForm";
import ConfirmationModal from "./components/Modal/ConfirmationModal";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [openFormModal, setOpenFormModal] = useState(false); // To control form visibility
  const [openModal, setOpenModal] = useState(false); // For confirmation modal

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const response = await axios.get("http://localhost:5000/events");
    setEvents(response.data);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/events", form);
    setForm({ title: "", date: "", location: "", description: "" });
    setOpenFormModal(false); // Close the form modal after submission
    fetchEvents();
  };

  const handleEdit = (event: Event) => {
    setForm({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
    });
    setSelectedEvent(event);
    setIsEdit(true);
    setOpenFormModal(true); // Open form modal for editing
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEvent) {
      await axios.put(`http://localhost:5000/events/${selectedEvent.id}`, form);
      setForm({ title: "", date: "", location: "", description: "" });
      setIsEdit(false);
      setSelectedEvent(null);
      setOpenFormModal(false); // Close the form modal after update
      fetchEvents();
    }
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5000/events/${id}`);
    fetchEvents();
    setOpenModal(false);
  };

  const tableColumns = [
    {
      title: "ID",
      render: (rowData: Event) => <span>{rowData.id}</span>,
    },
    {
      title: "Title",
      render: (rowData: Event) => <span>{rowData.title}</span>,
    },
    {
      title: "Date",
      render: (rowData: Event) => <span>{rowData.date}</span>,
    },
    {
      title: "Location",
      render: (rowData: Event) => <span>{rowData.location}</span>,
    },
    {
      title: "Description",
      render: (rowData: Event) => <span>{rowData.description}</span>,
    },
    {
      title: "Action",
      render: (rowData: Event) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(rowData)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setSelectedEvent(rowData);
              setOpenModal(true);
            }}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2, margin: "16px auto", width: "95%" }}>
      <h1>Event Management</h1>
      {/* Button to open the Add Event form */}
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          setForm({ title: "", date: "", location: "", description: "" });
          setIsEdit(false);
          setOpenFormModal(true);
        }}
      >
        Add Event
      </Button>

      {/* Table */}
      <h2>Events</h2>
      <ReusableTable cols={tableColumns} data={events} />
      {/* Form Modal */}
      <Dialog
        open={openFormModal}
        onClose={() => setOpenFormModal(false)}
        sx={{
          "& .MuiDialog-paper": {
            width: "80%", // Increase the width of the dialog
            maxWidth: "900px", // Optionally set a maximum width for larger screens
          },
        }}
      >
        <DialogTitle>{isEdit ? "Edit Event" : "Add Event"}</DialogTitle>
        <DialogContent>
          <EventForm
            form={form}
            onChange={handleInputChange}
            onSubmit={isEdit ? handleUpdate : handleAdd}
            isEdit={isEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFormModal(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Modal for Deletion */}
      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => selectedEvent && handleDelete(selectedEvent.id)}
        title="Confirm Deletion"
        content="Are you sure you want to delete this event?"
      />
    </Box>
  );
};

export default App;
