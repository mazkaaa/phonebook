import { createContext, useState, useEffect } from "react";
import { PhonebookProviderInterface } from "./index.interface";

export const PhonebookContext = createContext({
  contacts: {} as any[]
});

export const PhonebookProvider = ({ children }: any) => {

  /*
  const [contacts, setContacts] = useState<{name: string; phones: []}[]>(
    [],
  );
  const [favorites, setFavorites] = useState([]);

  const addContact = (name: string, phone: string) => {

  }
  const getContact = (name: string, phone: string) => {

  }
  */

  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    if (localStorage.getItem("contacts") !== null) {
      const storageContacts = JSON.parse(localStorage.getItem("contacts") as string) as [];
      setContacts(storageContacts);
    }
  }, []);

  return (
    <PhonebookContext.Provider value={{
      contacts
    }}>
      {children}
    </PhonebookContext.Provider>
  )
}