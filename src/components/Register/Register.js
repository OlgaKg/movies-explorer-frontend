import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Register({ handleRegisterSubmit }) {
    const { values, handleChange, errors, isValid } = useFormWithValidation();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const { name, email, password } = values;

        handleRegisterSubmit(name, email, password);
    }

    return (
        <main className='main-account'>
            <div className='auth'>
                <Link to='/' className='auth__logo'>
                    <img src={logo} alt='Логотип дипломного проекта' />
                </Link>
                <h2 className='auth__title'>Добро пожаловать!</h2>
                <form
                    className='auth__form auth__form_auth'
                    name='form-register'
                    onSubmit={handleSubmit}
                    noValidate>
                    <label className='auth__label'>Имя
                        <input className='auth__input auth__input-name' name='name' type='text'
                            minLength='2'
                            maxLength='30'
                            placeholder='Введите имя'
                            value={values.name || ''}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <span className='auth__input-error'>{errors.name}</span>}
                    </label>
                    <label className='auth__label'>E-mail
                        <input className='auth__input auth__input-email' id='email' name='email' type='email'
                            placeholder='Введите email'
                            value={values.email || ''}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <span className='auth__input-error'>{errors.email}</span>}
                    </label>
                    <label className='auth__label'>Пароль
                        <input className='auth__input auth__input-password' id='password' name='password' type='password'
                            minLength='8'
                            placeholder='Введите пароль (мин. 8 символов)'
                            value={values.password || ''}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <span className='auth__input-error'>{errors.password}</span>}
                    </label>
                    <button className='auth__btn' type='submit'
                        disabled={!isValid} >
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
