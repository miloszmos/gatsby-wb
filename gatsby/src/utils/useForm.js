import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  const updateValue = (e) => {
    const { value } = e.target;
    setValues({
      ...values,
      [e.target.name]: e.target.type === 'number' ? parseInt(value) : value,
    });
  };

  return { values, updateValue };
}
