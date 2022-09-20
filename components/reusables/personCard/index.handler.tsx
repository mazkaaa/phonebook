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

  const handleDelete = (id: number | undefined) => {
    phonebookContext.favorites.forEach((item: BaseContactInterface) => {
      if (item.id === id) {
        phonebookContext.deleteFavorite(id);
      }
    });
    phonebookContext.contacts.forEach((item: BaseContactInterface) => {
      if (item.id === id) {
        phonebookContext.deleteContact(id);
      }
    });
    handleClickConfirm(false);
    setMoreOptionView(false);
    phonebookContext.setClicked(true);
  }

  const handleAddFavorite = (props: BaseContactInterface) => {
    phonebookContext.addFavorite(props);
    phonebookContext.deleteContact(props.id);
  }

  const handleRemoveFavorite = (props: BaseContactInterface) => {
    phonebookContext.deleteFavorite(props.id);
    phonebookContext.addContact(props);
  }

  const handleFavorite = (props: BaseContactInterface) => {
    phonebookContext.favorites.forEach((item: BaseContactInterface) => {
      if (item.id === props.id) {
        handleRemoveFavorite(props);
      }
    })
    phonebookContext.contacts.forEach((item: BaseContactInterface) => {
      if (item.id === props.id) {
        handleAddFavorite(props);
      }
    })
    phonebookContext.setClicked(true);
  }

  const isFav = (id: number) => {
    let result = false;
    phonebookContext.favorites.forEach((item: BaseContactInterface) => {
      if (item.id === id) {
        result = true;
      }
    })
    phonebookContext.favorites.forEach((item: BaseContactInterface) => {
      if (item.id === id) {
        result = true;
      }
    })
    return result;
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