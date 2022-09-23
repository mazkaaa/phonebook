import { PersonCardConfirmButton, PersonCardConfirmButtonStyled, PersonCardConfirmStyled, PersonCardConfirmTitle, PersonCardDesc, PersonCardOptionButton, PersonCardOptionStyled, PersonCardStyled, PersonCardTitle } from "./index.style";
import { FaTrashAlt, FaArrowAltCircleLeft, FaStar } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import React from 'react'
import { PersonCardInterface } from "./index.interface";
import PersonCardHandler from "./index.handler";

const PersonCard = (props: PersonCardInterface) => {
  // eslint-disable-next-line new-cap
  const handler = PersonCardHandler();
  return (
    <div>
      {!handler.moreOptionView ? (
        <PersonCardStyled onClick={() => handler.handleClickOption()}>
          <PersonCardTitle>
            {props.first_name + " " + props.last_name}
          </PersonCardTitle>
          <>
            {props.phones.map((item, index) => (
              <PersonCardDesc key={index}>
                {[item.number.slice(0, 3), " ", item.number.slice(3,7), " ", item.number.slice(7)].join('')}
              </PersonCardDesc>
            ))}
          </>
        </PersonCardStyled>
      ) : (
        <>
          {!handler.confirmDeleteView ? (
            <PersonCardOptionStyled>
              <PersonCardOptionButton onClick={() => handler.handleFavorite(props.id)}>
                {handler.isFav(props.id) ? (<ImCross />) : (<FaStar />)}
              </PersonCardOptionButton>
              <PersonCardOptionButton onClick={() => handler.handleClickConfirm(true)}><FaTrashAlt /></PersonCardOptionButton>
              <PersonCardOptionButton onClick={() => handler.handleClickOption()}><FaArrowAltCircleLeft /></PersonCardOptionButton>
            </PersonCardOptionStyled>
          ) : (
            <PersonCardConfirmStyled>
              <PersonCardConfirmTitle>Are you sure want to delete?</PersonCardConfirmTitle>
              <PersonCardConfirmButtonStyled>
                <PersonCardConfirmButton onClick={() => handler.handleDelete(props.id)}>Yes</PersonCardConfirmButton>
                <PersonCardConfirmButton onClick={() => handler.handleClickConfirm(false)}>No</PersonCardConfirmButton>
              </PersonCardConfirmButtonStyled>
            </PersonCardConfirmStyled>
          )}
        </>
      )}
    </div>
  )
}

export default PersonCard;
