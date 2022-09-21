import { ChangeEvent, useState } from "react";

const ContactFormHandler = () => {
  const [phones, setPhones] = useState<any[]>([]);
  const [number, setNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleChangeNumber = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^[\d ()+-]+$/) || event.target.value === ""){
      setNumber(event.target.value);
    }
  }
  const handleChangeFirstname = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^[A-Za-z ]+$/) || event.target.value === ""){
      setFirstName(event.target.value);
    }
  }
  const handleChangeLastname = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^[A-Za-z ]+$/) || event.target.value === ""){
      setLastName(event.target.value);
    }
  }

  const handleAddMore = () => {
    setPhones((old) => [...old, {
      number: number.replace(" ", ""),
    }])
    setNumber("");
  }

  return {
    phones,
    handleAddMore,
    handleChangeNumber,
    number,
    handleChangeFirstname,
    handleChangeLastname,
    firstName,
    lastName,
  }
}
export default ContactFormHandler;