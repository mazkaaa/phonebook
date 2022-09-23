import { createContext, useState, useEffect } from "react";
import { BaseContactInterface } from "../../reusables/baseContactInterface";

export const PhonebookContext = createContext({
  contacts: {} as BaseContactInterface[],
  deleteContact: (id: number | undefined) => {},
  addContact: (props: BaseContactInterface) => {},
  loading: {} as boolean,
  setLoading: (value: boolean) => {},
  deleteFavorite: (id: number | undefined) => {},
  addFavorite: (id: number | undefined) => {},
  favorites: {} as BaseContactInterface[],
  clicked: {} as boolean,
  setClicked: (value: boolean) => {},
  contact: {} as any[],
  setContact: (value: any[]) => {},
  phones: {} as any[],
  setPhones: (value: any) => {},
  number: {} as string,
  setNumber: (value: string) => {},
  firstName: {} as string,
  setFirstName: (value: string) => {},
  lastName: {} as string,
  setLastName: (value: string) => {},
  isHaveSame: () => {},
  contain: {} as Boolean,
});

export const PhonebookProvider = ({ children }: any) => {
  const [contacts, setContacts] = useState<BaseContactInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [phones, setPhones] = useState<any[]>([]);
  const [number, setNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [contact, setContact] = useState<BaseContactInterface[]>([]);

  const [contain, setContain] = useState(false);

  const deleteContact = (id: number | undefined) => {
    setContacts((old) => old.filter((item) => item.id !== id));
  }

  const addContact = (props: BaseContactInterface) => {
    setContacts((old) => [...old, props]);
  }

  const addFavorite = (id: number | undefined) => {
    const tempArray: BaseContactInterface[] = contacts;
    tempArray.forEach((item, index) => {
      if (item.id === id) {
        tempArray[index].favorite = true;
        setContacts(tempArray);
      }
    });
  }

  const deleteFavorite = (id: number | undefined) => {
    const tempArray: BaseContactInterface[] = contacts;
    tempArray.forEach((item, index) => {
      if (item.id === id) {
        tempArray[index].favorite = false;
        setContacts(tempArray);
      }
    });
  }

  useEffect(() => {
    if (clicked) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
      setClicked(false);
    }
  }, [contacts.length, contacts, clicked]);

  useEffect(() => {
    if (localStorage.getItem("contacts") !== null) {
      const storageContacts = JSON.parse(localStorage.getItem("contacts") as string) as [];
      setContacts(storageContacts);
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
      clicked,
      setClicked,
      contact,
      setContact,
      firstName,
      lastName,
      number,
      phones,
      setFirstName,
      setLastName,
      setNumber,
      setPhones,
      contain
    }}>
      {children}
    </PhonebookContext.Provider>
  )
}