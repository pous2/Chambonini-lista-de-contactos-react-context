// store.js

// Estado inicial global de la aplicación
export const initialStore = () => {
  return {
    message: null,
    todos: [],
    contacts: [] // Lista global de contactos
  };
};

// Reducer para manejar las acciones del estado global
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    // Cargar todos los contactos desde la API
    case "set_contacts":
      return {
        ...store,
        contacts: action.payload
      };

    // Agregar un nuevo contacto al estado
    case "add_contact":
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };

    // Actualizar un contacto existente
    case "update_contact":
      return {
        ...store,
        contacts: store.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        )
      };

    // Eliminar un contacto por su ID
    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter((c) => c.id !== action.payload)
      };

    default:
      throw new Error("Unknown action.");
  }
}