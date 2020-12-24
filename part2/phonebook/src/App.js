import React, { useState, useEffect } from "react";
import personServices from "./services/personsService";

const Notification = ({ result }) => {
  if (result === null) {
    return null;
  }
  return (
    <div className={result.result ? result.result : "failure"}>
      {result.message}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [result, setResult] = useState({
    message: "testing",
    result: "success",
  });

  useEffect(() => {
    personServices.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = persons.filter((e) => e.name === newName);
    if (user.length > 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...user[0], number: newNumber };

        personServices
          .update(changedPerson.id, changedPerson)
          .then((returnedUser) => {
            setPersons(
              persons.map((person) =>
                person.name !== returnedUser.name ? person : changedPerson
              )
            );
            setResult({
              message: `Replaced ${returnedUser.name}'s number'`,
              result: "success",
            });
            setTimeout(() => {
              setResult(null);
            }, 5000);
            return returnedUser;
          })
          .catch((error) => {
            const newResult = {
              message: `Information of ${changedPerson.name} has already been deleted`,
              result: "failure",
            };
            setResult(newResult);
            setTimeout(() => {
              setResult(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.name !== changedPerson.name)
            );
          });
      }
    } else {
      const newPersonObj = {
        name: newName,
        number: newNumber,
      };

      personServices
        .add(newPersonObj)
        .then((person) => {
          setPersons(persons.concat(person));
          return person;
        })
        .then((person) => {
          setResult({ message: `Added ${person.name} `, result: "success" });
          setTimeout(() => {
            setResult(null);
          }, 5000);
        });
      setNewName("");
      setNewNumber("");
    }
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

  const handleRemove = (id) => {
    return () => {
      const user = persons.find((person) => person.id === id);
      if (window.confirm(`Delete ${user.name} `)) {
        personServices.remove(id).then((removedUser) => {
          setPersons(
            persons.filter((person) => {
              return person.name !== user.name;
            })
          );
        });
      }
    };
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification result={result} />
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
      <Persons persons={personsToShow} handleRemove={handleRemove} />
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

const Persons = ({ persons, handleRemove }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={handleRemove(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};
export default App;
