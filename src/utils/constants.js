export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const DESKTOP_VW = 1280;
export const TABLET_VW = 768;
export const MOBILE_VW = 320;
export const ROUTES_WITH_FOOTER = ['/', '/movies', '/saved-movies'];
export const EXCLUDE_FOOTER_ROUTES = ['/signin', '/signup', '*'];
export const ERROR_MESSAGES = {
    notFound: 'Ничего не найдено',
    connectionError: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};