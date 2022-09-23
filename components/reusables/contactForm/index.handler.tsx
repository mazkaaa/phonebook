import { ChangeEvent, useContext } from "react";
import { PhonebookContext } from "../../context/PhonebookProvider";

const ContactFormHandler = () => {
  const phonebookContext = useContext(PhonebookContext);

  const handleChangeNumber = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^[\d ()+-]+$/) || event.target.value === ""){
      phonebookContext.setNumber(event.target.value);
    }
  }
  const handleChangeFirstname = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^[A-Za-z ]+$/) || event.target.value === ""){
      phonebookContext.setFirstName(event.target.value);
    }
  }
  const handleChangeLastname = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^[A-Za-z ]+$/) || event.target.value === ""){
      phonebookContext.setLastName(event.target.value);
    }
  }

  const handleAddMore = () => {
    phonebookContext.setPhones((old: any) => [...old, {
      number: phonebookContext.number.replace(" ", ""),
    }])
    phonebookContext.setNumber("");
  }

  return {
    handleAddMore,
    handleChangeNumber,
    handleChangeFirstname,
    handleChangeLastname,
  }
}
export default ContactFormHandler;