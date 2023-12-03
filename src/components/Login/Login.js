import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import * as auth from '../../utils/auth';

function Login({ handleLoginSubmit, setInfoPopupOpen, isSubmitting, setIsSubmitting }) {
    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setIsSubmitting(true);
        auth.loginUser(values.email, values.password)
            .then(() => {
                handleLoginSubmit(values.email);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                setInfoPopupOpen(true);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <main className='main-account'>
            <div className='auth'>
                <Link to='/' className='auth__logo'>
                    <img src={logo} alt='Логотип дипломного проекта' />
                </Link>
                <div className='auth__content'>
                    <h1 className='auth__title'>Рады видеть!</h1>
                    <form
                        className='auth__form auth__form_place_login'
                        name='form-login'
                        onSubmit={handleSubmit}
                        noValidate>
                        <label className='auth__label'>
                            E-mail
                            <input
                                className='auth__input auth__input-email'
                                id='email'
                                name='email'
                                type='email'
                                placeholder='Введите email'
                                value={values.email || ''}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <span className='auth__input-error'>{errors.email}</span>}
                        </label>
                        <label className='auth__label'>
                            Пароль
                            <input
                                className='auth__input auth__input-password'
                                id='password'
                                name='password'
                                type='password'
                                minLength='8'
                                placeholder='Введите пароль'
                                value={values.password || ''}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <span className='auth__input-error'>{errors.password}</span>}
                        </label>
                        <button
                            className='auth__btn auth__btn-login'
                            type='submit'
                            disabled={!isValid || isSubmitting}>
                            Войти
                        </button>
                    </form>
                    <div className='auth__signin'>
                        <p className='auth__signin-text'>
                            Ещё не зарегистрированы?&nbsp;&nbsp;
                            <Link to='/signup' className='auth__link'>
                                Регистрация
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;
