import { AddMoreButtonStyled, ContactFormStyled, ContactInputFormStyled } from "./index.style";

import React from 'react'
import ContactFormHandler from "./index.handler";

const ContactForm = (props: any) => {
  // eslint-disable-next-line new-cap
  const handler = ContactFormHandler();
  return (
    <ContactFormStyled>
      <h3>First name:</h3>
      <ContactInputFormStyled type="text" placeholder="First Name" name="first name" onChange={handler.handleChangeFirstname} value={handler.firstName}/>
      <h3>Last name:</h3>
      <ContactInputFormStyled type="text" placeholder="Last Name" name="last name" onChange={handler.handleChangeLastname} value={handler.lastName}/>
      <h3>Phone Number:</h3>
      <ContactInputFormStyled type="text" placeholder="Phone Number" name="phone" onChange={handler.handleChangeNumber} value={handler.phones[0] === undefined ? handler.number : handler.phones[0].number}/>
      {handler.phones.map((item, index) => (
        <ContactInputFormStyled key={index} type="text" placeholder="Phone Number" name="phone" onChange={handler.handleChangeNumber} value={handler.phones[index+1] === undefined ? handler.number : handler.phones[index+1].number}/>
      ))}
      {handler.number.length !== 0 && (<AddMoreButtonStyled type="button" onClick={() => handler.handleAddMore()}>Add More</AddMoreButtonStyled>)}
    </ContactFormStyled>
  )
}

export default ContactForm;
