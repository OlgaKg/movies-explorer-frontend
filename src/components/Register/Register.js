import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register({ handleRegisterSubmit }) {
    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errorMessages, setErrorMessages] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });

        setErrorMessages({
            ...errorMessages,
            [name]: ''
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { name, email, password } = formValue;

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrorMessages(validationErrors);
            return;
        }

        handleRegisterSubmit(name, email, password);
    }

    const validateForm = () => {
        const errors = {};
        if (formValue.name.length < 2) {
            errors.name = 'Имя должно содержать минимум 2 символа';
        }
        if (!formValue.email.includes('@')) {
            errors.email = 'Неверный формат email';
        }
        if (formValue.password.length < 6) {
            errors.password = 'Пароль должен содержать минимум 6 символов';
        }
        return errors;
    }

    return (
        <main className='main-account'>
            <div className='auth'>
                <Link to='/' className='auth__logo'>
                    <img src={logo} alt='Логотип дипломного проекта' />
                </Link>
                <h2 className='auth__title'>Добро пожаловать!</h2>
                <form className='auth__form auth__form_auth'
                name='form-register'
                onSubmit={handleSubmit}
                noValidate>
                    <label className='auth__label'>Имя
                        <input className='auth__input auth__input-name' name='name' type='text'
                            minLength='2'
                            maxLength='30'
                            placeholder='Введите имя'
                            value={formValue.name}
                            onChange={handleChange}
                            required />
                        {errorMessages.name && <span className='auth__input-error'>{errorMessages.name}</span>}
                    </label>
                    <label className='auth__label'>E-mail
                        <input className='auth__input auth__input-email' id='email' name='email' type='email'
                            placeholder='Введите email'
                            value={formValue.email}
                            onChange={handleChange}
                            required />
                        {errorMessages.email && <span className='auth__input-error'>{errorMessages.email}</span>}
                    </label>
                    <label className='auth__label'>Пароль
                        <input className='auth__input auth__input-password' id='password' name='password' type='password'
                            minLength='8'
                            placeholder='Введите пароль (мин. 8 символов)'
                            value={formValue.password}
                            onChange={handleChange}
                            required />
                        {errorMessages.password && <span className='auth__input-error'>{errorMessages.password}</span>}
                    </label>
                    <button className='auth__btn' type='submit'
                        onSubmit={handleSubmit}>
                        Зарегистрироваться
                    </button>
                </form>
                <div className='auth__signin'>
                    <p className='auth__signin-text'>
                        Уже зарегистрированы?&nbsp;&nbsp;
                        <Link to='/signin' className='auth__link'>Войти</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Register;
