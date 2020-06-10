import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import {getPersons, createPerson, updatePerson} from './services/persons'

const Header = ({ text }) =>
  text === "Phonebook" ? <h2>{text}</h2> : <h3>{text}</h3>;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getPersons()
    .then( initPersons => {
      setPersons(initPersons)
      console.log("fetched persons", initPersons)
    })
    .catch( e => console.log('fetch error', e.message)
    )
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const isPresent = persons.some(
      (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    const isEmpty = newName.length === 0 || newNumber.length === 0;
    console.log("duplicated", isPresent);

    isPresent
      ? alert(
          `'${capitalizeName(newName)}' already exists, enter a different name!`
        )
      : isEmpty
      ? alert("Enter required field!")
      : createPerson(newPerson)
      .then( res => {
        setPersons( persons.concat(res))
        setNewName("");
        setNewNumber("");
        console.log("posted person", res);
      }).catch(e => console.error('post error', e.message)
      )
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

  const capitalizeName = (str) => {
    const cap = str
      .trim()
      .split(" ")
      .map((text) => text[0].toUpperCase() + text.slice(1))
      .join(" ");
    return cap;
  };

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
      <Persons lstToDisplay={lstToDisplay} capitalizeName={capitalizeName} />
    </div>
  );
};

export default App;
