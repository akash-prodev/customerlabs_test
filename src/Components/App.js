import React from 'react';
import { SegmentProvider } from './SegmentContext';
import Popup from './Popup';
import { SegmentContext } from './SegmentContext';
import '../App.css';

const App = () => {
  return (
    <SegmentProvider>
      <div className="App">
        <div className="head">
          <p className="left-arrow"></p>
          <h1>View Audience</h1>
        </div>
        <SaveButton />
        <Popup />
      </div>
    </SegmentProvider>
  );
};

const SaveButton = () => {
  const { handleSaveClick } = React.useContext(SegmentContext);
  return (
    <button className="save-button" onClick={handleSaveClick}>
      Save Segment
    </button>
  );
};

export default App;
