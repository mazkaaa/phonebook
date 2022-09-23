import { AddMoreButtonStyled, ContactFormStyled, ContactInputFormStyled } from "./index.style";

import React, { useContext } from 'react'
import ContactFormHandler from "./index.handler";
import { PhonebookContext } from "../../context/PhonebookProvider";

const ContactForm = (props: any) => {
  // eslint-disable-next-line new-cap
  const handler = ContactFormHandler();
  const phonebookContext = useContext(PhonebookContext);

  return (
    <ContactFormStyled>
      <h3>First name:</h3>
      <ContactInputFormStyled type="text" placeholder="First Name" name="first name" onChange={handler.handleChangeFirstname} value={phonebookContext.firstName}/>
      <h3>Last name:</h3>
      <ContactInputFormStyled type="text" placeholder="Last Name" name="last name" onChange={handler.handleChangeLastname} value={phonebookContext.lastName}/>
      {phonebookContext.contain && (<h2>Contact name already on storage!</h2>)}
      <h3>Phone Number:</h3>
      <ContactInputFormStyled type="text" placeholder="Phone Number" name="phone" onChange={handler.handleChangeNumber} value={phonebookContext.phones[0] === undefined ? phonebookContext.number : phonebookContext.phones[0].number}/>
      {phonebookContext.phones.map((item, index) => (
        <ContactInputFormStyled key={index} type="text" placeholder="Phone Number" name="phone" onChange={handler.handleChangeNumber} value={phonebookContext.phones[index+1] === undefined ? phonebookContext.number : phonebookContext.phones[index+1].number}/>
      ))}
      {phonebookContext.number.length !== 0 && (<AddMoreButtonStyled type="button" onClick={() => handler.handleAddMore()}>Add Number</AddMoreButtonStyled>)}
    </ContactFormStyled>
  )
}

export default ContactForm;
