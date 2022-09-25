import { AddMoreButtonStyled, ContactFormStyled, ContactFormStyledRow, ContactInputFormStyled, DeleteBox } from "./index.style";

import React, { useContext } from 'react'
import ContactFormHandler from "./index.handler";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { BaseContactInterface } from "../baseContactInterface";
import { FaTrashAlt } from "react-icons/fa";

const ContactForm = (props: BaseContactInterface) => {
  // eslint-disable-next-line new-cap
  const handler = ContactFormHandler();
  const phonebookContext = useContext(PhonebookContext);

  return (
    <ContactFormStyled>
      <h3>First name:</h3>
      <ContactInputFormStyled type="text" placeholder="First Name" name="first name" onChange={handler.handleChangeFirstname} value={phonebookContext.inputFirstName}/>
      <h3>Last name:</h3>
      <ContactInputFormStyled type="text" placeholder="Last Name" name="last name" onChange={handler.handleChangeLastname} value={phonebookContext.inputLastName}/>
      {handler.containName(props.first_name, props.last_name) && (<h2>Contact name already on storage!</h2>)}
      <h3>Phone Number:</h3>
      {phonebookContext.inputPhones.phones.map((item, index) => (
        <ContactFormStyledRow key={index}>
          <ContactInputFormStyled type="text" placeholder="Phone Number" name="phone" onChange={(e) => {
            if (e.target.value.match(/^[\d ()+-]+$/) || e.target.value === "") {
              const items = [...phonebookContext.inputPhones.phones];
              items[index].number = e.target.value;
              phonebookContext.setInputPhones({
                phones: items,
              });
            }
          }} value={item.number}/>
          {phonebookContext.inputPhones.phones.length > 1 && (
            <DeleteBox type="button" onClick={() => {
              const items = [...phonebookContext.inputPhones.phones];
              items.splice(index, 1);
              phonebookContext.setInputPhones({
                phones: items
              });
            }}><FaTrashAlt /></DeleteBox>
          )}
        </ContactFormStyledRow>
      ))}
      <AddMoreButtonStyled type="button" onClick={() => phonebookContext.setInputPhones({
        phones: [...phonebookContext.inputPhones.phones, { number: "" }],
      })}>Add Number</AddMoreButtonStyled>
    </ContactFormStyled>
  )
}

export default ContactForm;
