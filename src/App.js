import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schema, setSchema] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const SaveSegment = async () => {
    const dataToSend = {
      segment_name: segmentName,
      schema: schema.map((s) => ({ [s.value]: s.label })),
    };

    try {
      const response = await fetch('https://webhook.site/0c7925e4-9fe2-4fb9-8ffc-593d76d1570b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const DeleteSchema = async (schemaItem) => {
    try {
      const response = await fetch('https://webhook.site/0c7925e4-9fe2-4fb9-8ffc-593d76d1570b', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [schemaItem.value]: schemaItem.label }),
      });

      if (response.ok) {
        console.log('Schema deleted successfully');
        setSchema(schema.filter((s) => s !== schemaItem));
      } else {
        console.error('Failed to delete schema');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const options = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  const availableOptions = options.filter(
    (option) => !schema.some((s) => s.value === option.value)
  );

  const handleSaveClick = () => setPopupVisible(true);

  const handleCancelClick = () => {
    setPopupVisible(false);
    setSchema([]);
    setSelectedOption('');
  };

  const handleAddSchema = () => {
    if (selectedOption) {
      setSchema([...schema, options.find((opt) => opt.value === selectedOption)]);
      setSelectedOption('');
    }
  };


  return (
    <div className="App">
      <div className="head">
        <p className="left-arrow"></p>
        <h1>View Audience</h1>
      </div>
      <button className="save-button" onClick={handleSaveClick}>Save Segment</button>
      {isPopupVisible && (
        <div className="popup">
          <div className="head">
            <p className="left-arrow"></p>
            <h1>Saving Segment</h1>
          </div>
          <div className='segmentForm'>
            <p>Enter the name of the segment</p>
            <input
              type="text"
              placeholder="Name of the segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
            <p>To save your segment, you need to add the schemas to build the query.</p>
            <div className='tasks'>
              <div className='task1'>
                <p className='green-dot'></p>
                <p>-User Tasks</p>
              </div>
              <div className='task2'>
                <p className='red-dot'></p>
                <p>-Group Tasks</p>
              </div>
            </div>


            <div className="schema-box">
              {schema.map((s, index) => (
                <div key={index} className="schema-dropdown-container">
                  <p className={index % 2 === 0 ? 'green-dot' : 'red-dot'}></p>
                  <select
                    value={s.value}
                    onChange={(e) => {
                      const updatedSchema = schema.map((item, i) =>
                        i === index ? options.find((opt) => opt.value === e.target.value) : item
                      );
                      setSchema(updatedSchema);
                    }}
                  >
                    {options.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        disabled={schema.some((s) => s.value === option.value) && s.value !== option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div onClick={
                    () => {
                      const updatedSchema = schema.filter((_, i) => i !== index);
                      setSchema(updatedSchema);
                      DeleteSchema(s)
                    }
                  } className="small-box"><p></p></div>
                </div>
              ))}
            </div>

            <div className="dropdown-section">
              <p className='grey-dot'></p>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="" disabled>Add schema to segment</option>
                {availableOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span onClick={handleAddSchema} className="add-schema-link">+ Add new schema</span>
            </div>
            <div className="button-group">
              <button className='save' onClick={SaveSegment}>Save the Segment</button>
              <button className='cancel' onClick={handleCancelClick}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
