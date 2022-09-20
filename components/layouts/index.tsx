import { LayoutStyled } from "./index.style";

import React from 'react'
import Navbar from "./navbar";
import Head from "next/head";
import { css, Global } from "@emotion/react";

const Layout = (props: any) => {
  return (
    <LayoutStyled>
      <Head>
        <title>PhoneBook</title>
      </Head>
      <Global styles={
        css`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          color: white;
          background: black;
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }
        
        * {
          box-sizing: border-box;
        }
        
        `
      } />
      <Navbar>
        <h3>PhoneBook</h3>
      </Navbar>
      {props.children}
    </LayoutStyled>
  )
}

export default Layout;
