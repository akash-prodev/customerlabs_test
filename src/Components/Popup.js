import React from 'react';
import { SegmentContext } from './SegmentContext';
import SegmentForm from './SegmentForm';

const Popup = () => {
  const { isPopupVisible } = React.useContext(SegmentContext);

  return (
    isPopupVisible && (
      <div className="popup">
        <div className="head">
          <p className="left-arrow"></p>
          <h1>Saving Segment</h1>
        </div>
        <SegmentForm />
      </div>
    )
  );
};

export default Popup;
