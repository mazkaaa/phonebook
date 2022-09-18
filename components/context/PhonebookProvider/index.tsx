import { createContext, useState } from "react";
import { PhonebookProviderInterface } from "./index.interface";

export const PhonebookContext = createContext({

});

export const PhonebookProvider = ({ children }: any) => {
  const [contacts, setContacts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addContact = () => {

  }
  return (
    <PhonebookContext.Provider value={{

    }}>
      {children}
    </PhonebookContext.Provider>
  )
}