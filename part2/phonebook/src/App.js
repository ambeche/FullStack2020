import React, { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const Header = ({ text }) => <h2>{text}</h2>;

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (e) => {
    e.preventDefault();
    const newPerson = { name: newName };
    const isPresent = persons.some(
      (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
    );
    console.log("duplicated", isPresent);

    isPresent
      ? alert(
          `'${capitalizeName(newName)}' already exists, enter a different name!`
        )
      : setPersons(persons.concat(newPerson));

    setNewName("");
    console.log("persons", persons);
  };

  const handleNameChange = (e) => {
    console.log("newName", e.target.value);
    setNewName(e.target.value);
  };

  const capitalizeName = (str) => {
    const cap = str
      .trim()
      .split(" ")
      .map((text) => text[0].toUpperCase() + text.slice(1))
      .join(" ");
    console.log("capName", cap);
    return cap;
  };

  const handlers = [addName, handleNameChange, newName];

  return (
    <div>
      <Header text="Phonebook" />
      <PersonForm handlers={handlers} />
      <Header text="Numbers" />
      <Persons persons={persons} capitalizeName={capitalizeName} />
    </div>
  );
};

export default App;
