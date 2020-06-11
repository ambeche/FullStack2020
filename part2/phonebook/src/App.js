import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson,
} from "./services/persons";

const Header = ({ text }) =>
  text === "Phonebook" ? <h2>{text}</h2> : <h3>{text}</h3>;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getPersons()
      .then((initPersons) => {
        setPersons(initPersons);
        console.log("fetched persons", initPersons);
      })
      .catch((e) => console.log("fetch error", e.message));
  }, []);

  const capitalizeName = (str) => {
    const cap = str
      .trim()
      .split(" ")
      .map((text) => text[0].toUpperCase() + text.slice(1))
      .join(" ");
    return cap;
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const personByName = persons.find(
      (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    const updateContactNumber = (id) => {
      const changedNumber = { ...personByName, number: newNumber };

      window.confirm(
        `'${capitalizeName(
          newName
        )}' already exists in phonebook. Do you want to replace the old number with a new one?`
      )
        ? updatePerson(id, changedNumber)
            .then((updatedContact) => {
              setPersons(
                persons.map((p) => (p.id !== id ? p : updatedContact))
              );
              setNewName("");
              setNewNumber("");
              console.log("updated", updatedContact);
            })
            .catch((e) => {
              console.log("error updating number", e);
            })
        : setNewName("");
    };

    personByName
      ? updateContactNumber(personByName.id)
      : createPerson(newPerson)
          .then((res) => {
            setPersons(persons.concat(res));
            setNewName("");
            setNewNumber("");
            console.log("posted person", res);
          })
          .catch((e) => console.error("post error", e.message));
  };

  const handleDelete = (id) => () => {
    const person = persons.find((p) => p.id === id);

    window.confirm(`Delete ${capitalizeName(person.name)}?`)
      ? deletePerson(id)
          .then((res) => {
            setPersons(persons.filter((p) => p.id !== person.id));
            console.log(
              "delete status",
              `${res.statusText}  ${res.status} ${res.data}`
            );
          })
          .catch((e) => console.log("error", e))
      : console.log("delete request cancelled");
  };

  const handleNameChange = (e) => {
    console.log("newName", e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    console.log("newNumber", e.target.value);
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    console.log("searchText", e.target.value);
    setSearchText(e.target.value);
  };

  const lstToDisplay =
    searchText.length !== 0
      ? persons.filter((p) =>
          p.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : persons;

  const handlers = [
    addPerson,
    handleNameChange,
    handleNumberChange,
    newName,
    newNumber,
  ];

  return (
    <div>
      <Header text="Phonebook" />
      <Filter searchText={searchText} handleSearch={handleSearch} />
      <Header text="Add New Contact" />
      <PersonForm handlers={handlers} />
      <Header text="Numbers" />
      <Persons
        lstToDisplay={lstToDisplay}
        capitalizeName={capitalizeName}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
