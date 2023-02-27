import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "redux/selectors";
import { AppDispatch, RootState } from "redux/store";

import { addContact } from "redux/contacts/contacts.thunk";
import { Form } from "./ContactForm.styled";
import { Button, TextField } from "@mui/material";

export const ContactForm = (): JSX.Element => {
  const contacts = useSelector((state: RootState) => selectContacts(state));

  const [name, setName] = useState<string>(
    () => localStorage.getItem("name") ?? ""
  );
  const [number, setNumber] = useState<string>(
    () => localStorage.getItem("number") ?? ""
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = ({
    currentTarget: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case "name":
        localStorage.setItem("name", value);
        setName(value);
        break;

      case "number":
        localStorage.setItem("number", value);
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const isNameExist = Boolean(
      contacts.some((contact) => contact.name === name)
    );

    if (isNameExist) {
      alert(`${name} already in contacts. Enter new name`);
      localStorage.removeItem("name");
      setName("");
      return;
    }

    dispatch(addContact({ name, number }));

    localStorage.removeItem("name");
    localStorage.removeItem("number");
    setName("");
    setNumber("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        type="text"
        name="name"
        value={name}
        placeholder="John Dou"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={handleChange}
        required
      />

      <TextField
        id="outlined-basic"
        label="Number"
        variant="outlined"
        type="tel"
        name="number"
        value={number}
        placeholder="123-45-67"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        onChange={handleChange}
        required
      />
      <Button variant="contained" type="submit">
        Add contact
      </Button>
    </Form>
  );
};
