import { createContext, useState, useEffect } from "react";
import { BaseContactInterface } from "../../reusables/baseContactInterface";

export const PhonebookContext = createContext({
  contacts: {} as any[],
  deleteContact: (id: number | undefined) => {},
  addContact: (props: BaseContactInterface) => {},
  loading: {} as boolean,
  setLoading: (value: boolean) => {},
  deleteFavorite: (id: number | undefined) => {},
  addFavorite: (props: BaseContactInterface) => {},
  favorites: {} as any[],
  clicked: {} as boolean,
  setClicked: (value: boolean) => {},
});

export const PhonebookProvider = ({ children }: any) => {
  const [contacts, setContacts] = useState<BaseContactInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<BaseContactInterface[]>([]);
  const [clicked, setClicked] = useState(false);

  const deleteContact = (id: number | undefined) => {
    setContacts((old) => old.filter((item) => item.id !== id));
  }

  const addContact = (props: BaseContactInterface) => {
    setContacts((old) => [...old, props]);
  }

  const addFavorite = (props: BaseContactInterface) => {
    setFavorites((old) => [...old, props]);
  }

  const deleteFavorite = (id: number | undefined) => {
    setFavorites((old) => old.filter((item) => item.id !== id))
  }

  useEffect(() => {
    if (clicked) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
      setClicked(false);
    }
  }, [contacts.length, contacts, clicked]);

  useEffect(() => {
    if (clicked) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setClicked(false);
    }
  }, [favorites.length, favorites, clicked]);

  useEffect(() => {
    if (localStorage.getItem("contacts") !== null) {
      const storageContacts = JSON.parse(localStorage.getItem("contacts") as string) as [];
      setContacts(storageContacts);
    }
    if (localStorage.getItem("favorites") !== null) {
      const storageFavorites = JSON.parse(localStorage.getItem("favorites") as string) as [];
      setFavorites(storageFavorites);
    }
  }, []);

  return (
    <PhonebookContext.Provider value={{
      contacts,
      addContact,
      deleteContact,
      loading,
      setLoading,
      addFavorite,
      deleteFavorite,
      favorites,
      clicked,
      setClicked,
    }}>
      {children}
    </PhonebookContext.Provider>
  )
}