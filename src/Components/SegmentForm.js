import React from 'react';
import { SegmentContext } from './SegmentContext';
import SchemaBox from './SchemaBox';
import DropdownSection from './DropdownSection';

const SegmentForm = () => {
  const { segmentName, setSegmentName, handleCancelClick } = React.useContext(SegmentContext);

  return (
    <div className="segmentForm">
      <p>Enter the name of the segment</p>
      <input
        type="text"
        placeholder="Name of the segment"
        value={segmentName}
        onChange={(e) => setSegmentName(e.target.value)}
      />
      <p>To save your segment, you need to add the schemas to build the query.</p>
      <div className="tasks">
        <div className="task1">
          <p className="green-dot"></p>
          <p>-User Tasks</p>
        </div>
        <div className="task2">
          <p className="red-dot"></p>
          <p>-Group Tasks</p>
        </div>
      </div>
      <SchemaBox />
      <DropdownSection />
      <div className="button-group">
        <SaveButton />
        <button className="cancel" onClick={handleCancelClick}>Cancel</button>
      </div>
    </div>
  );
};

const SaveButton = () => {
  const { segmentName, schema } = React.useContext(SegmentContext);

  const SaveSegment = async () => {
    const dataToSend = {
      segment_name: segmentName,
      schema: schema.map((s) => ({ [s.value]: s.label })),
    };

    try {
      //The below URL's request limit exceeded. So, we are not able to see the response in webhook website."
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

  return <button className="save" onClick={SaveSegment}>Save the Segment</button>;
};

export default SegmentForm;
