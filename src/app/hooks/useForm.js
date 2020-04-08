import { useState } from "react";

/**
 * The form hook.  Sets handlers and initial form values. 
 * @function 
 * @param {Object.<string, string>} initialValue
 * @returns {object} 
 */
const useForm = (initialValue = {}) => {
  const [values, setValues] = useState(initialValue);

  const reset = () => {
    setValues(initialValue);
  };

  const handleChange = ({ target }) => {
    setValues((values) => ({
      ...values,
      [target.name]: target.value,
    }));
  };

  return {
    handleChange,
    values,
    reset,
    setValues,
  };
};

export default useForm;
