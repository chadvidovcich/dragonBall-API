import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Record(props) {
  return (
    <tr>
      <td>{props.record.name}</td>
      <td>{props.record.planet}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link>
        {' '}
        |
        <button
          className="btn btn-link"
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch('http://localhost:8000/api/character');

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      /* eslint no-const-assign: 0 */
      /* eslint no-shadow: 0 */
      const records = await response.json();
      setRecords(records);
    }

    getRecords();
  }, [records.length]);

  // This method will delete a character
  async function deleteRecord(id) {
    await fetch(`http://localhost:8000/api/character/delete/${id}`, {
      method: 'DELETE',
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => (
      <Record
        record={record}
        deleteRecord={() => deleteRecord(record._id)}
        key={record._id}
      />
    ));
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Characters in Database</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Planet</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
