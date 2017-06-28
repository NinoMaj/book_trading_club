// @flow

export const WEB_PORT = process.env.PORT || 8000
export const WDS_PORT = 7000
export const STATIC_PATH = '/static'
export const APP_NAME = 'Book Trading Club'
export const LOCAL_MONGODB_URI = 'mongodb://localhost/book_trading'
export const BOOK_API_URL = 'https://www.googleapis.com/books/v1/volumes?printType=books&projection=lite&maxResults=1&q='

export const APP_CONTAINER_CLASS = 'js-app'
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`
