import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";

const Contacts = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      let backendContacts = [];
      try {
        const res = await fetch("https://organic-winner-pxx99pq49rqhr7xw-5000.app.github.dev/contacts");
        if (res.ok) backendContacts = await res.json();
      } catch (err) {
        console.warn("No se pudieron obtener los contactos del backend:", err);
      }

      // Marcar locales con local: true
      const localContacts = JSON.parse(localStorage.getItem("offline_contacts") || "[]")
        .map(c => ({ ...c, local: true }));

      const allContacts = [...backendContacts, ...localContacts];
      dispatch({ type: "set_contacts", payload: allContacts });
    };

    fetchContacts();
  }, [dispatch]);

  const handleDelete = async (id, isLocal) => {
    if (isLocal) {
      // Eliminar localmente
      let localContacts = JSON.parse(localStorage.getItem("offline_contacts") || "[]");
      localContacts = localContacts.filter(c => c.id !== id);
      localStorage.setItem("offline_contacts", JSON.stringify(localContacts));
      dispatch({ type: "delete_contact", payload: id });
    } else {
      try {
        const res = await fetch(`https://organic-winner-pxx99pq49rqhr7xw-5000.app.github.dev/contacts/${id}`, {
          method: "DELETE"
        });
        if (!res.ok) throw new Error();
        dispatch({ type: "delete_contact", payload: id });
      } catch (e) {
        console.warn("Error al eliminar del backend:", e);
      }
    }
  };

  const handleEdit = (id, isLocal) => {
    if (isLocal) {
      navigate(`/edit-local/${id}`);
    } else {
      navigate(`/edit/${id}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Contactos</h2>
        <Link to="/add-contact" className="btn btn-primary">Agregar contacto</Link>
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