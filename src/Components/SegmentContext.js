import React, { createContext, useState } from 'react';

export const SegmentContext = createContext();

export const SegmentProvider = ({ children }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schema, setSchema] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

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

  return (
    <SegmentContext.Provider
      value={{
        isPopupVisible,
        setPopupVisible,
        segmentName,
        setSegmentName,
        schema,
        setSchema,
        selectedOption,
        setSelectedOption,
        options,
        availableOptions,
        handleSaveClick,
        handleCancelClick,
      }}
    >
      {children}
    </SegmentContext.Provider>
  );
};
