import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";

const Contacts = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  // Cargar contactos desde el backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("https://organic-winner-pxx99pq49rqhr7xw-5000.app.github.dev/contacts");
        if (!res.ok) throw new Error("Error al cargar contactos");
        const data = await res.json();
        dispatch({ type: "set_contacts", payload: data });
      } catch (err) {
        console.error("No se pudieron obtener los contactos:", err);
      }
    };

    fetchContacts();
  }, [dispatch]);

  // Eliminar contacto
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://organic-winner-pxx99pq49rqhr7xw-5000.app.github.dev/contacts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar contacto");
      dispatch({ type: "delete_contact", payload: id });
    } catch (err) {
      console.error("No se pudo eliminar el contacto:", err);
    }
  };

  // Editar contacto
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Contactos</h2>
        <Link to="/add-contact" className="btn btn-primary">
          Agregar contacto
        </Link>
      </div>

      {store.contacts.length === 0 ? (
        <p>No hay contactos aún.</p>
      ) : (
        store.contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}
    </div>
  );
};

export default Contacts;
