import { useContext, useState } from "react";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { BaseContactInterface } from "../baseContactInterface";

const PersonCardHandler = () => {
  const [moreOptionView, setMoreOptionView] = useState(false);
  const [confirmDeleteView, setConfirmDeleteView] = useState(false);
  const phonebookContext = useContext(PhonebookContext);

  const handleClickOption = () => {
    setMoreOptionView(!moreOptionView);
  };

  const handleClickConfirm = (value: boolean) => {
    setConfirmDeleteView(value);
  };

  const handleDelete = (id: number) => {
    phonebookContext.contacts.forEach((item: BaseContactInterface) => {
      if (item.id === id) {
        phonebookContext.deleteContact(id);
      }
    });
    handleClickConfirm(false);
    setMoreOptionView(false);
    phonebookContext.setClicked(true);
  }

  const handleAddFavorite = (id: number) => {
    phonebookContext.addFavorite(id);
  }

  const handleRemoveFavorite = (id: number) => {
    phonebookContext.deleteFavorite(id);
  }

  const handleFavorite = (id: number) => {
    phonebookContext.contacts.forEach((item: BaseContactInterface) => {
      if (item.id === id) {
        if (item.favorite) {
          handleRemoveFavorite(id);
        } else {
          handleAddFavorite(id);
        }
        phonebookContext.setClicked(true);
      }
    });    
  }

  const isFav = (id: number) => {
    return phonebookContext.contacts[phonebookContext.contacts.findIndex((item) => item.id === id)].favorite;
  }

  return {
    handleClickOption,
    moreOptionView,
    handleClickConfirm,
    confirmDeleteView,
    handleDelete,
    handleAddFavorite,
    handleRemoveFavorite,
    handleFavorite,
    isFav,
  }
}

export default PersonCardHandler;