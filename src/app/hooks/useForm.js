import { useState } from "react";

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
