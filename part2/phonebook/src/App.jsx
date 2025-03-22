import { useEffect, useState } from "react";
import personService from "./services/persons";

const Filter = (props) => (
  <input value={props.value} onChange={props.handleFilterChange} />
);

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <>
      {props.personsShow.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => props.handleDelete(person.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAllPersons()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        alert(`${error}. Error get all persons from server`);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      `Delete ${persons.find((person) => person.id === id)?.name}`
    );
    if (!confirmDelete) return;
    personService
      .deletePerson(id)
      .then((deletePerson) =>
        setPersons(persons.filter((person) => person.id != id))
      )
      .catch((error) => {
        alert(`${error}. Error delete person in the server.`);
      });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingNames = new Set(persons.map((person) => person.name));
    const existingPhones = new Set(persons.map((person) => person.number));
    if (existingNames.has(newName)) {
      const person = persons.find((person) => person.name === newName);
      if (person && person?.number !== newNumber) {
        const confirmUpdate = window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        );
        if (!confirmUpdate) return;
        const updatedPerson = { ...person, number: newNumber };
        personService
          .updatePerson(updatedPerson.id, updatedPerson)
          .then((returnedPerson) =>
            setPersons(
              persons
                .filter((person) => person.id !== returnedPerson.id)
                .concat(returnedPerson)
            )
          .catch((error) => {
                alert(`${error}. Error update person in the server.`);
              })
          );
      }
      else {
        alert(`${newName} is already added to phonebook`);
        return;
      }
    }
    if (existingPhones.has(newNumber)) {
      const namePerson = persons.find(
        (person) => person.number === newNumber
      )?.name;
      alert(`${namePerson} is already has this number.`);
      return;
    }
    const personItem = { name: newName, number: newNumber };
    personService
      .createPerson(personItem)
      .then((createPerson) => setPersons(persons.concat(createPerson)))
      .catch((error) => {
        alert(`${error}. Error create person in the server.`);
      });
    setNewName("");
    setNewNumber("");
  };

  const personsShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={filter}
        handleFilterChange={(event) => setFilter(event.target.value)}
      />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={(event) => setNewName(event.target.value)}
        newNumber={newNumber}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons personsShow={personsShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
