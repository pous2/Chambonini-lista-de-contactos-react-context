import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch("https://organic-winner-pxx99pq49rqhr7xw-5000.app.github.dev/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        console.error("Error al guardar en la API:", errorData);
      } else {
        const newContact = await resp.json();
        dispatch({ type: "add_contact", payload: newContact });
        navigate("/");
      }
    } catch (err) {
      console.error("Error al conectar con la API:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h3 className="text-center mb-4">Add a new contact</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="Enter phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              placeholder="Enter address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">
              Save contact
            </button>
          </div>

          <div className="text-start">
            <Link to="/" className="text-secondary">
              or get back to contacts
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;