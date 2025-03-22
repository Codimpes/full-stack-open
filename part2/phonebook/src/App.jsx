import { useEffect, useState } from "react";
import personService from "./services/persons";
import "./index.css";

const Notification = ({ message, onClose }) => {
  if (message.text) {
    return (
      <>
        <div className={message.className}>
          {message.text}
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>
      </>
    );
  }
  return null
};

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
        <div key={person.id} className="person">
          <span>
            {person.name} {person.number}
          </span>
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
  const [message, setMessage] = useState({ text:"", className:"" });
  const [showNotification, setShowNotification] = useState(false);


  useEffect(() => {
    personService
      .getAllPersons()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        setMessage({
          text: "Error get all persons from server",
          className: "error"
        });
        setShowNotification(true);
      });
  }, []);

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id)
    const confirmDelete = window.confirm(
      `Delete ${person?.name}`
    );
    if (!confirmDelete) return;
    personService
      .deletePerson(id)
      .then((deletePerson) => {
        setPersons(persons.filter((person) => person.id != id))
        setMessage({
          text: `Successfully deleted from the phonebook ${person.name}`,
          className: "sucess"
        });
        setShowNotification(true);
    })
      .catch((error) => {
        setMessage({
          text: `${person.name} no longer existed in the phonebook.`,
          className: "error",
        });
        setShowNotification(true);
        setPersons(persons.filter(person => person.id !== id))
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
          .then((returnedPerson) => {
            setPersons(
              persons
                .filter((person) => person.id !== returnedPerson.id)
                .concat(returnedPerson)
            )
            setMessage({
                text: "Has been successfully updated.",
                className: "sucess",
            })
            setShowNotification(true);
            return;
          })
          .catch((error) => {
            setMessage({
              text: `Could not be updated because it does not exist: ${person.name}.`,
              className: "error",
            });
            setShowNotification(true);
            return;
          })
      }
      else {
        setMessage({
          text: `${newName} is already added to phonebook`,
          className: "error",
        });
        setShowNotification(true);
        return;
      }
    }
    if (existingPhones.has(newNumber)) {
      const namePerson = persons.find(
        (person) => person.number === newNumber
      )?.name;
      setMessage({
        text: `${namePerson} is already has this number.`,
        className: "error",
      });
      setShowNotification(true);
      return;
    }
    const personItem = { name: newName, number: newNumber };
    personService
      .createPerson(personItem)
      .then((createPerson) => {
        setPersons(persons.concat(createPerson))
        setMessage({
          text: "Has been successfully created.",
          className: "sucess",
        });
        setShowNotification(true);
      })
      .catch((error) => {
        setMessage({
          text: "Error create person in the server.",
          className: "sucess",
        });
        setShowNotification(true);
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
      {showNotification && (
        <Notification
          message={message}
          onClose={() => setShowNotification(false)}
        />
      )}
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
