import { ChangeEvent, useContext } from "react";
import { PhonebookContext } from "../../context/PhonebookProvider";

const ContactFormHandler = () => {
  const phonebookContext = useContext(PhonebookContext);

  const handleChangeFirstname = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^[A-Za-z ]+$/) || event.target.value === ""){
      phonebookContext.setInputFirstName(event.target.value);
    }
  }
  const handleChangeLastname = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^[A-Za-z ]+$/) || event.target.value === ""){
      phonebookContext.setInputLastName(event.target.value);
    }
  }

  const containName = (firstName: string, lastName: string) => {
    const name = firstName + " " + lastName;
    return phonebookContext.contacts.some((item) => (item.first_name + " " + item.last_name) === name);
  }

  return {
    handleChangeFirstname,
    handleChangeLastname,
    containName,
  }
}
export default ContactFormHandler;