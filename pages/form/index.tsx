import { useMutation } from "@apollo/client";
import Link from "next/link";
import { NextPage } from "next/types";
import { useContext, useEffect } from "react";
import { PhonebookContext } from "../../components/context/PhonebookProvider";
import AddContactWithPhones from "../../components/graphql/queries/addContactWithPhones";
import ContactForm from "../../components/reusables/contactForm";
import Container from "../../components/reusables/container";
import DoneContactButton from "../../components/reusables/doneContactButton";

const Form: NextPage = () => {
  const phonebookContext = useContext(PhonebookContext);
  const [addContactWithPhones, { data, loading, error }] = useMutation(AddContactWithPhones)

  const handleDone = () => {
    if (phonebookContext.firstName.length > 0 &&
       phonebookContext.lastName.length > 0 &&
       phonebookContext.phones.length > 0) {
      phonebookContext.setContact([{
        first_name: phonebookContext.firstName,
        last_name: phonebookContext.firstName,
        phones: phonebookContext.phones
      }])
    }
  }

  useEffect(() => {
    if (phonebookContext.contact.length > 0) {
      addContactWithPhones({
        variables: {
          first_name: phonebookContext.contact[0].first_name,
          last_name: phonebookContext.contact[0].last_name,
          phones: phonebookContext.contact[0].phones,
        }
      })
    }
  }, [addContactWithPhones, phonebookContext.contact, phonebookContext.contact.length])
  
  return (
    <Container>
      {(phonebookContext.firstName.length > 0 &&
      phonebookContext.lastName.length > 0 &&
      phonebookContext.phones.length > 0) && (
        <Link href="/" onClick={() => handleDone()}>
          <a><DoneContactButton /></a>
        </Link>
      )}
      <ContactForm first_name={phonebookContext.firstName} last_name={phonebookContext.lastName} id={0} created_at={""} phones={[]} favorite={false} />
    </Container>
  )
}

export default Form;