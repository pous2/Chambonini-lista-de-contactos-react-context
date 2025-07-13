import React from "react";

const ContactCard = ({ contact, onDelete, onEdit }) => {
  return (
    <div className="container border rounded p-3 my-2 bg-white shadow-sm d-flex align-items-center">
      <img
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="contact avatar"
        className="rounded-circle me-3"
        style={{ width: "80px", height: "80px", objectFit: "cover" }}
      />
      <div className="flex-grow-1">
        <h5 className="mb-1">{contact.full_name}</h5>
        <p className="mb-0">
          <i className="fas fa-map-marker-alt me-2"></i> {contact.address}
        </p>
        <p className="mb-0">
          <i className="fas fa-phone me-2"></i> {contact.phone}
        </p>
        <p className="mb-0">
          <i className="fas fa-envelope me-2"></i> {contact.email}
        </p>
      </div>
      <div className="ms-3 d-flex">
        <button
          className="btn btn-link text-dark me-2"
          onClick={() => onEdit(contact)}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button
          className="btn btn-link text-danger"
          onClick={() => onDelete(contact.id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default ContactCard;