import React, { useState, useEffect } from "react";
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log(response.data)
      setPersons(response.data);
    })
  },[])


  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.filter((e) => e.name === newName).length > 0) {
      alert(`${newName} is already in the phonebook`);
      setNewName("");
      return false;
    }
    const newPersonObj = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newPersonObj));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with{" "}
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

const Filter = ({ value, onChange }) => (
  <input name="" type="text" value={value} onChange={onChange} />
);

const PersonForm = ({
  onSubmit,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};
export default App;
