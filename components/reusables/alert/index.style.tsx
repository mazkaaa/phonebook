import styled from "@emotion/styled";

export const AlertStyled = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  bottom: 40%;
  background-color: white;
  color: #1446A0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`

export const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 5vh;
  text-align: center;
`

export const AlertButtonStyled = styled.button`
  color: white;
  background-color: #1446A0;
  border-color: transparent;
  padding: 2vh 3.5vh;
  font-size: 1em;
  font-weight: 600;
  margin-top: 1vh;
`