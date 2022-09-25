import { createContext, useState, useEffect } from "react";
import { BaseContactInterface } from "../../reusables/baseContactInterface";
import { InputPhonesInterface, PhonebookProviderInterface } from "./index.interface";

export const PhonebookContext = createContext({
  contacts: {} as BaseContactInterface[],
  deleteContact: (id: number) => {},
  addContact: (props: BaseContactInterface) => {},
  loading: {} as boolean,
  setLoading: (value: boolean) => {},
  deleteFavorite: (id: number) => {},
  addFavorite: (id: number) => {},
  clicked: {} as boolean,
  setClicked: (value: boolean) => {},
  contact: {} as PhonebookProviderInterface[],
  setContact: (props: PhonebookProviderInterface[]) => {},
  inputPhones: {} as InputPhonesInterface,
  setInputPhones: (value: InputPhonesInterface) => {},
  number: {} as string,
  setNumber: (value: string) => {},
  inputFirstName: {} as string,
  setInputFirstName: (value: string) => {},
  inputLastName: {} as string,
  setInputLastName: (value: string) => {},
  alert: {} as boolean,
  setAlert: (value: boolean) => {}
});

export const PhonebookProvider = ({ children }: any) => {
  const [contacts, setContacts] = useState<BaseContactInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [alert, setAlert] = useState(false);

  const [inputPhones, setInputPhones] = useState<InputPhonesInterface>({
    phones: [{
      number: ""
    }]
  });
  const [number, setNumber] = useState("");
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");

  const [contact, setContact] = useState<PhonebookProviderInterface[]>([]);

  const deleteContact = (id: number) => {
    setContacts((old) => old.filter((item) => item.id !== id));
  }

  const addContact = (props: BaseContactInterface) => {
    setContacts((old) => [...old, props]);
    setAlert(true);
  }

  const addFavorite = (id: number) => {
    const tempArray: BaseContactInterface[] = contacts;
    tempArray.forEach((item, index) => {
      if (item.id === id) {
        tempArray[index].favorite = true;
        setContacts(tempArray);
      }
    });
  }

  const deleteFavorite = (id: number) => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      deleteContact,
      addContact,
      addFavorite,
      contact,
      deleteFavorite,
      clicked,
      inputFirstName,
      inputLastName,
      loading,
      number,
      inputPhones,
      setClicked,
      setContact,
      setInputFirstName,
      setInputLastName,
      setLoading,
      setNumber,
      setInputPhones,
      alert,
      setAlert
    }}>
      {children}
    </PhonebookContext.Provider>
  )
}