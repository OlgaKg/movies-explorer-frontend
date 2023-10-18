import { useState, useEffect } from 'react';

export function useFormWithValidation(initialValues) {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};

      if (!values.name || values.name.length < 2) {
        newErrors.name = 'Имя должно содержать минимум 2 символа';
      }
      if (!values.email || !values.email.includes('@')) {
        newErrors.email = 'Неверный формат email';
      }

      const isFormValid = Object.keys(newErrors).length === 0;
      setErrors(newErrors);
      setIsValid(isFormValid);
    };

    validateForm();
  }, [values]);

  return { values, handleChange, errors, isValid, setValues };
}
