import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { logout } from '../../utils/auth';

function Profile({onUpdateUser, setLoggedIn}) {
    const currentUser = useContext(CurrentUserContext);
    const user = currentUser;

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        setError(null);
    };

    const handleSaveClick = async () => {
        if (!editedUser.name || editedUser.name.length < 2) {
            setError('Имя должно содержать минимум 2 символа');
            return;
        }

        if (!editedUser.email || !editedUser.email.includes('@')) {
            setError('Неверный формат email');
            return;
        }
        try {
            setError(null);
            setIsEditing(false);
            await onUpdateUser(editedUser); 
        } catch (error) {
            setError('При обновлении профиля произошла ошибка.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
        setError(null);
    };

    // const handleLogout = () => {
    //     onUpdateUser({});
    //     setLoggedIn(false);
    //     navigate('/');

    // };

    const signOut = () => {
        logout()
          .then(() => {
            // onUpdateUser({});
            setLoggedIn(false);
            localStorage.removeItem('isLoggedIn'); 
            navigate('/', { replace: true });
          })
          .catch((err) => {
            console.error('Ошибка при выходе из аккаунта:', err);
          });
      };

    return (
        <main className='main-account'>
            <div className='profile'>
                <div className='profile__container'>
                    <h1 className='profile__title'>Привет, {user.name}!</h1>
                    <form className='profile__form' name='form-profile'>
                        <div className='profile__form-field'>
                            <span className='profile__form-label'>Имя</span>
                            {isEditing ? (
                                <>
                                    <input
                                        className='profile__form-input'
                                        type='text'
                                        name='name'
                                        minLength='2'
                                        placeholder='Введите имя'
                                        value={editedUser.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </>
                            ) : (
                                <span className='profile__form-value'>{editedUser.name}</span>
                            )}
                        </div>
                        <div className='profile__form-field'>
                            <span className='profile__form-label'>Email</span>
                            {isEditing ? (
                                <input
                                    className='profile__form-input'
                                    type='email'
                                    name='email'
                                    placeholder='Введите email'
                                    value={editedUser.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            ) : (
                                <span className='profile__form-value'>{editedUser.email}</span>
                            )}
                        </div>
                    </form>
                    <div className='profile__buttons'>
                        {isEditing ? (
                            <>
                                <div className='profile__error-container'>
                                    {error && <div className='profile__error'>{error}</div>}
                                </div>
                                <button
                                    onClick={handleSaveClick}
                                    className={`profile__save-button ${error ? 'profile__save-button_disabled' : ''}`}
                                    disabled={!!error}
                                >
                                    Сохранить
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleEditClick} className='profile__edit-button'>
                                    Редактировать
                                </button>
                                <button onClick={signOut} className='profile__logout-button'>
                                    Выйти из аккаунта
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Profile;