import React from 'react';
import { SegmentContext } from './SegmentContext';

const DropdownSection = () => {
  const { selectedOption, setSelectedOption, availableOptions, schema, setSchema, options } =
    React.useContext(SegmentContext);

  const handleAddSchema = () => {
    if (selectedOption) {
      const selectedOptionData = options.find((opt) => opt.value === selectedOption);
      if (selectedOptionData) {
        setSchema([...schema, { value: selectedOption, label: selectedOptionData.label }]);
        setSelectedOption('');
      }
    }
  };

  return (
    <div className="dropdown-section">
      <p className="grey-dot"></p>
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="" disabled>Add schema to segment</option>
        {availableOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <span onClick={handleAddSchema} className="add-schema-link">+ Add new schema</span>
    </div>
  );
};

export default DropdownSection;
