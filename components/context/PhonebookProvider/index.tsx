import { createContext, useState } from "react";

export const PhonebookContext = createContext({

});

export const PhonebookProvider = ({ children }: any) => {
  const [contacts, setContacts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  return (
    <PhonebookContext.Provider value={{

    }}>
      {children}
    </PhonebookContext.Provider>
  )
}