import { useState, useCallback } from 'react';
import { EMAIL_REGEX } from '../utils/constants';

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateForm = useCallback((formValues) => {
    const errors = {};
    if (formValues.name && formValues.name.length < 2) {
      errors.name = 'Имя должно содержать минимум 2 символа';
    }
    if (formValues.email && !EMAIL_REGEX.test(formValues.email)) {
      errors.email = 'Неверный формат email';
    }
    if (formValues.password && formValues.password.length < 8) {
      errors.password = 'Пароль должен содержать минимум 8 символов';
    }

    return errors;
  }, []);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    const newErrors = { ...errors, [name]: validateForm({ ...values, [name]: value })[name] };
    setErrors(newErrors);

    setIsValid(event.target.closest('form').checkValidity());
  }, [errors, validateForm, values]);

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, []);

  return { values, handleChange, errors, isValid, resetForm };
}