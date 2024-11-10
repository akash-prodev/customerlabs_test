import React from 'react';
import { SegmentContext } from './SegmentContext';

const SchemaBox = () => {
  const { schema, setSchema, options } = React.useContext(SegmentContext);

  const DeleteSchema = async (schemaItem) => {
    try {
      //The below URL's request limit exceeded. So, we are not able to see the response in webhook website."
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

  return (
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
          <div onClick={() => { setSchema(schema.filter((_, i) => i !== index)); DeleteSchema(s); }} className="small-box">
            <p></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchemaBox;
