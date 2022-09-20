import { ContainerStyled } from "./index.style";

import React from 'react'

const Container = (props: any) => {
  return (
    <ContainerStyled>
      {props.children}
    </ContainerStyled>
  )
}

export default Container;
