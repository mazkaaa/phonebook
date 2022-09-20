import { DoneButtonStyled } from "./index.style";

import React from 'react'
import { FaCheck } from "react-icons/fa";

const DoneContactButton = (props: any) => {
  return (
    <DoneButtonStyled><FaCheck /></DoneButtonStyled>
  )
}

export default DoneContactButton;
