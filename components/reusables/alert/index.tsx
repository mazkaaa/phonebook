import { useContext } from "react";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { AlertInterface } from "./index.interface";
import { AlertButtonStyled, AlertContent, AlertStyled } from "./index.style";

const Alert = (props: AlertInterface) => {
  const phonebookContext = useContext(PhonebookContext);

  return (
    <>
      {props.condition && (
        <AlertStyled>
          <AlertContent>
            <h3>{props.title}</h3>
            <p>{props.message}</p>
            <AlertButtonStyled onClick={() => phonebookContext.setAlert(false)}>Close</AlertButtonStyled>
          </AlertContent>
        </AlertStyled>
      )}
    </>
  )
}

export default Alert;