import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const EditLocalContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("offline_contacts") || "[]");
    const contact = local.find(c => c.id === Number(id));
    if (contact) setForm(contact);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let localContacts = JSON.parse(localStorage.getItem("offline_contacts") || "[]");
    localContacts = localContacts.map(c => c.id === Number(id) ? { ...form, id: Number(id), local: true } : c);
    localStorage.setItem("offline_contacts", JSON.stringify(localContacts));
    dispatch({ type: "update_contact", payload: { ...form, id: Number(id), local: true } });
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h3 className="text-center mb-4">Editar contacto local</h3>
        <form onSubmit={handleSubmit}>
          {["full_name", "email", "phone", "address"].map((field) => (
            <div key={field} className="mb-3">
              <label className="form-label">{field.replace("_", " ")}</label>
              <input
                type={field === "email" ? "email" : "text"}
                className="form-control"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="d-grid mb-2">
            <button className="btn btn-primary">Guardar cambios</button>
          </div>
          <Link to="/" className="text-secondary">Volver</Link>
        </form>
      </div>
    </div>
  );
};

export default EditLocalContact;