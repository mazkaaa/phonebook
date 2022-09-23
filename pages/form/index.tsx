import Link from "next/link";
import { NextPage } from "next/types";
import { useContext, useEffect } from "react";
import { PhonebookContext } from "../../components/context/PhonebookProvider";
import ContactForm from "../../components/reusables/contactForm";
import Container from "../../components/reusables/container";
import DoneContactButton from "../../components/reusables/doneContactButton";

const Form: NextPage = () => {
  const phonebookContext = useContext(PhonebookContext);

  const handleDone = () => {
    if (phonebookContext.firstName.length > 0 && phonebookContext.lastName.length > 0 && phonebookContext.phones.length > 0) {
      phonebookContext.setContact([{
        first_name: phonebookContext.firstName,
        last_name: phonebookContext.firstName,
        phones: phonebookContext.phones
      }])
      console.log("test")
    }
  }
  
  return (
    <Container>
      <Link href="/" onClick={() => handleDone()}>
        <a><DoneContactButton /></a>
      </Link>
      <ContactForm />
    </Container>
  )
}

export default Form;