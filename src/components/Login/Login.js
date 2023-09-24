import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login({ handleLoginSubmit }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    const [errorMessages, setErrorMessages] = useState({
        email: '',
        password: ''
    });

    // const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (!formValue.email.includes('@')) {
            errors.email = 'Неверный формат email';
        }
        if (formValue.password.length < 6) {
            errors.password = 'Пароль должен содержать минимум 6 символов';
        }
        return errors;
    }

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

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrorMessages(validationErrors);
            return;
        }
        handleLoginSubmit(formValue.email, formValue.password);
        // auth.loginUser(formValue.email, formValue.password).then((data) => {
        //     localStorage.setItem('jwt', data.token);  
        //     handleLogin(formValue.email);
        //     navigate('/');
        // }).catch((err) => { console.log(err) }); 
    }

    return (
        <div className='auth'>
            <Link to='/' className='header__logo_auth'>
                <img src={logo} alt='Логотип дипломного проекта' />
            </Link>
            <div className='auth__content'>
                <h1 className='auth__title'>Рады видеть!</h1>
                <form className='auth__form auth__form_place_login' onSubmit={handleSubmit} noValidate>
                    <label className='auth__label'>E-mail
                        <input className='auth__input auth__input-email' id='email' name='email' type='email'
                            placeholder='Введите email'
                            value={formValue.email}
                            onChange={handleChange}
                            required />
                        {errorMessages.email && <span className='auth__input-error'>{errorMessages.email}</span>}                </label>
                    <label className='auth__label'>Пароль
                        <input className='auth__input auth__input-password' id='password' name='password' type='password'
                            minLength='6'
                            placeholder='Введите пароль'
                            value={formValue.password}
                            onChange={handleChange}
                            required />
                        {errorMessages.password && <span className='auth__input-error'>{errorMessages.password}</span>}
                    </label>
                    <button className='auth__btn auth__btn-login' type='submit' onSubmit={handleSubmit}>
                        Войти
                    </button>
                </form>
                <div className='auth__signin'>
                    <p className='auth__signin-text'>
                        Ещё не зарегистрированы?&nbsp;&nbsp;
                        <Link to='/signup' className='auth__link'>Регистрация</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;