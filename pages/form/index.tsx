import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useContext, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { PhonebookContext } from "../../components/context/PhonebookProvider";
import AddContactWithPhones from "../../components/graphql/queries/addContactWithPhones";
import ContactForm from "../../components/reusables/contactForm";
import Container from "../../components/reusables/container";
import { DoneButtonStyled } from "../../components/reusables/doneContactButton/index.style";

const Form: NextPage = () => {
  const router = useRouter();
  const phonebookContext = useContext(PhonebookContext);
  const [addContactWithPhones, { data, loading, error, }] = useMutation(AddContactWithPhones)

  const handleDone = () => {
    addContactWithPhones({
      variables: {
        first_name: phonebookContext.contact[0].first_name,
        last_name: phonebookContext.contact[0].last_name,
        phones: phonebookContext.contact[0].phones,
      }
    });
  };

  return (
    <Container>
      {(phonebookContext.firstName.length > 0 &&
      phonebookContext.lastName.length > 0 &&
      phonebookContext.phones.length > 0) && (
        <DoneButtonStyled onClick={() => handleDone()}><FaCheck /></DoneButtonStyled>
      )}
      <ContactForm first_name={phonebookContext.firstName} last_name={phonebookContext.lastName} id={0} created_at={""} phones={[]} favorite={false} />
    </Container>
  )
}

export default Form;