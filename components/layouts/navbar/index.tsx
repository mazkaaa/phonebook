import { NavbarStyled } from "./index.style";

import React from 'react'

const Navbar = (props: any) => {
  return (
    <NavbarStyled>
      {props.children}
    </NavbarStyled>
  )
}

export default Navbar;
