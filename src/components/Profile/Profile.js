import React, { useState } from 'react';

function Profile() {
    const user = {
        name: 'Виталий',
        email: 'pochta@yandex.ru',
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });
    const [error, setError] = useState(null);

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


        setIsEditing(false);

        try {
            setError(null);

        } catch (error) {
            setError('При обновлении профиля произошла ошибка.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
        setError(null);
    };

    const handleLogout = () => {
        // позже добавить вызов функции logout()
    };

    return (
        <div className='profile'>
            <h2 className='profile__title'>Привет, {user.name}!</h2>
            <form className='profile__form'>
                <div className='profile__form-field'>
                    <span className='profile__form-label'>Имя</span>
                    {isEditing ? (
                        <>
                            <input
                                className='profile__form-input'
                                type='text'
                                name='name'
                                minLength='2'
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
                        <button onClick={handleLogout} className='profile__logout-button'>
                            Выйти из аккаунта
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;
