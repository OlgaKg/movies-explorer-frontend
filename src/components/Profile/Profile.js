import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { logout } from '../../utils/auth';
import isEqual from 'lodash/isEqual';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Profile({ onUpdateUser, setLoggedIn, isSubmitting, setIsSubmitting }) {
    const currentUser = useContext(CurrentUserContext);
    const user = currentUser;

    const {
        values: editedUser,
        handleChange,
        errors,
        isValid,
        resetForm,
    } = useFormWithValidation(setIsSubmitting);

    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        resetForm({ ...user });
    }, [user, resetForm, currentUser]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const isUnchanged = isEqual(editedUser, user);

    const handleSaveClick = async () => {
        if (!isValid || isUnchanged) {
            return;
        }
        try {
            await onUpdateUser(editedUser);
            setIsEditing(false);
        } catch (error) {
            console.error('При обновлении профиля произошла ошибка.', error);
        }
    };

    const signOut = () => {
        setIsSubmitting(true);
        logout()
            .then(() => {
                setLoggedIn(false);
                localStorage.clear();
                navigate('/', { replace: true });
            })
            .catch((error) => {
                console.error('Ошибка при выходе из аккаунта:', error);
            })
            .finally(() => {
                setIsSubmitting(false);
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
                            <input
                                className='profile__form-input'
                                type='text'
                                name='name'
                                minLength='2'
                                placeholder='Введите имя'
                                value={editedUser.name || ''}
                                onChange={handleChange}
                                required
                                disabled={!isEditing}
                            />
                            {errors.name && isEditing && (
                                <span className='profile__error'>{errors.name}</span>
                            )}
                        </div>
                        <div className='profile__form-field'>
                            <span className='profile__form-label'>Email</span>
                            <input
                                className='profile__form-input'
                                type='email'
                                name='email'
                                placeholder='Введите email'
                                value={editedUser.email || ''}
                                onChange={handleChange}
                                required
                                disabled={!isEditing}
                            />
                            {errors.email && isEditing && (
                                <span className='profile__error'>{errors.email}</span>
                            )}
                        </div>
                    </form>
                    <div className='profile__buttons'>
                        {isEditing ? (
                            <>
                                <div className='profile__error-container'>
                                    {errors.serverError && (
                                        <div className='profile__error'>{errors.serverError}</div>
                                    )}
                                </div>
                                <button
                                    className={`profile__save-button 
                                    ${!isValid || isUnchanged || isSubmitting ? 'profile__save-button_disabled' : ''}`}
                                    onClick={handleSaveClick}
                                    disabled={!isValid || isUnchanged || isSubmitting}>
                                    Сохранить
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleEditClick} className='profile__edit-button'>
                                    Редактировать
                                </button>
                                <button
                                    className='profile__logout-button'
                                    onClick={signOut}
                                    disabled={isSubmitting}>
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