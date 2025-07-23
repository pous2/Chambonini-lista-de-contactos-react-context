import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const AddContact = () => {
  const { dispatch, store } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (id) {
      const contactToEdit = store.contacts.find((c) => String(c.id) === id);
      if (contactToEdit) {
        setForm({
          full_name: contactToEdit.full_name || "",
          email: contactToEdit.email || "",
          phone: contactToEdit.phone || "",
          address: contactToEdit.address || ""
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = id
      ? `https://organic-winner-pxx99pq49rqhr7xw-5000.app.github.dev/contacts/${id}`
      : `https://organic-winner-pxx99pq49rqhr7xw-5000.app.github.dev/contacts`;
    const method = id ? "PUT" : "POST";

    try {
      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!resp.ok) throw new Error("Error en API");

      // API exitosa → refrescamos desde API
      const refreshed = await fetch("https://organic-winner-pxx99pq49rqhr7xw-5000.app.github.dev/contacts");
      const updatedList = await refreshed.json();

      // Limpiamos contactos locales si guardamos exitosamente
      localStorage.removeItem("offline_contacts");

      dispatch({ type: "set_contacts", payload: updatedList });
      navigate("/");
    } catch (err) {
      console.warn("Error API, guardando local:", err.message);
      const localContact = { ...form, id: Date.now(), local: true };
      const offline = JSON.parse(localStorage.getItem("offline_contacts") || "[]");
      offline.push(localContact);
      localStorage.setItem("offline_contacts", JSON.stringify(offline));
      dispatch({ type: "add_contact", payload: localContact });
      navigate("/");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h3 className="text-center mb-4">{id ? "Edit contact" : "Add a new contact"}</h3>
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
              {id ? "Save changes" : "Save contact"}
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
}