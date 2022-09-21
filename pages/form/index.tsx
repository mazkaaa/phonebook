import Link from "next/link";
import { NextPage } from "next/types";
import ContactForm from "../../components/reusables/contactForm";
import Container from "../../components/reusables/container";
import DoneContactButton from "../../components/reusables/doneContactButton";

const Form: NextPage = () => {

  return (
    <Container>
      <Link href="/">
        <a><DoneContactButton /></a>
      </Link>
      <ContactForm />
    </Container>
  )
}

export default Form;