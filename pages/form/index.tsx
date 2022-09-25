import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { PhonebookContext } from "../../components/context/PhonebookProvider";
import AddContactWithPhones from "../../components/graphql/queries/addContactWithPhones";
import getContactDetail from "../../components/graphql/queries/getContactDetail";
import Alert from "../../components/reusables/alert";
import ContactForm from "../../components/reusables/contactForm";
import Container from "../../components/reusables/container";
import { DoneButtonStyled } from "../../components/reusables/doneContactButton/index.style";

const Form: NextPage = () => {
  const router = useRouter();
  const phonebookContext = useContext(PhonebookContext);
  const [addContactWithPhones, { loading }] = useMutation(AddContactWithPhones)
  const [errorMsg, setErrorMsg] = useState("");
  const [getContactDetailData] = useLazyQuery(getContactDetail);

  const handleDone = () => {
    addContactWithPhones({
      variables: {
        first_name: phonebookContext.inputFirstName,
        last_name: phonebookContext.inputLastName,
        phones: phonebookContext.inputPhones.phones,
      }
    }).then((res) => {
      phonebookContext.setAlert(false);
      router.push("/");
      console.log("success ", res.data.insert_contact.returning[0]);
      getContactDetailData({
        variables: {
          id: res.data.insert_contact.returning[0].id
        }
      }).then((result) => {
        const contactDetail = {
          created_at: result.data.contact_by_pk.created_at,
          first_name: result.data.contact_by_pk.first_name,
          last_name: result.data.contact_by_pk.last_name,
          id: result.data.contact_by_pk.id,
          phones: result.data.contact_by_pk.phones.map((phone: { number: string; }) => {
            const phoneParsed = {
              number: phone.number.replace(/[a-z]+/i, ''),
            };
            return phoneParsed;
          }),
          favorite: false,
        };
        phonebookContext.addContact(contactDetail);
        phonebookContext.setClicked(true);
      })
    }).catch((err) => {
      console.log(err)
      phonebookContext.setAlert(true);
      setErrorMsg(err.message);
    });
  };

  const containName = (firstName: string, lastName: string) => {
    const name = firstName + " " + lastName;
    return phonebookContext.contacts.some((item) => (item.first_name + " " + item.last_name) === name);
  }

  useEffect(() => {
    phonebookContext.setAlert(false);
    phonebookContext.setInputFirstName("");
    phonebookContext.setInputLastName("");
    phonebookContext.setInputPhones({
      phones: [{
        number: ""
      }]
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Alert title="Error!" message={errorMsg} condition={phonebookContext.alert} />
      {(phonebookContext.inputFirstName.length > 0 &&
      phonebookContext.inputLastName.length > 0 &&
      phonebookContext.inputPhones.phones[0].number.length > 0 &&
      !containName(phonebookContext.inputFirstName, phonebookContext.inputLastName)) && (
        (!loading && !phonebookContext.alert) && (
          <DoneButtonStyled onClick={() => handleDone()}><FaCheck /></DoneButtonStyled>
        )
      )}
      <ContactForm first_name={phonebookContext.inputFirstName} last_name={phonebookContext.inputLastName} id={0} created_at={""} phones={[]} favorite={false} />
    </Container>
  )
}

export default Form;