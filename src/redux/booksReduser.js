import sherlock from '../../src/assets/img/sherl.jpg';
import question from '../../src/assets/img/question.jpg';

const initialState = {
    book: null,
    page: 0,
    name: '',
    level: 'Elementary',
    bookName: '',
    booknamesarr: [
        [
            { name: 'SherlockHolmes', book: 'Sherlok Holmes. A Scandal in Bohemia', auther: 'Arthur Conan Doyle', img: sherlock },
            { name: 'some-1 name', book: 'some-1 book', auther: 'some-1 author', img: question },
            { name: 'some-2 name', book: 'some-2 book', auther: 'some-2 author', img: question }
        ],
        [
            { name: 'some-3 name', book: 'some-3 book', auther: 'some-3 author', img: question },
            { name: 'some-4 name', book: 'some-4 book', auther: 'some-4 author', img: question },
            { name: 'some-5 name', book: 'some-5 book', auther: 'some-5 author', img: question }
        ],
        [
            { name: 'some-6 name', book: 'some-6 book', auther: 'some-6 author', img: question },
            { name: 'some-7 name', book: 'some-7 book', auther: 'some-7 author', img: question},
            { name: 'some-8 name', book: 'some-8 book', auther: 'some-8 author', img: question }
        ],
        [
            { name: 'some-9 name', book: 'some-9 bookA ', auther: 'some-9 author', img: question },
            { name: 'some-10 name', book: 'some-10 book', auther: 'some-10 author', img: question },
            { name: 'some-11 name', book: 'some-11 book', auther: 'some-11 author', img: question }
        ],
        [
            { name: 'some-12 name', book: 'some-12 bookA ', auther: 'some-12 author', img: question },
            { name: 'some-13 name', book: 'some-13 book', auther: 'some-13 author', img: question},
            { name: 'some-14 name', book: 'some-14 book', auther: 'some-14 author', img: question }
        ]
    ],
    savedWords: []
}

export const booksReduser = (state = initialState, action) => {
    switch (action.type) {
        case "GET_BOOK": {
            return { 
                ...state,
                book: action.book
            }
        }
        case "GET_NAME": {
            return { 
                ...state,
                name: action.name
            }
        }
        case "GET_PAGE": {
            return { 
                ...state,
                page: action.page
            }
        }
        case "GET_LEVEL": {
            return { 
                ...state,
                level: action.level
            }
        }
        case "SET_WORDS": {
            const newsawedWords = [...state.savedWords].map(el => {return {...el}});
                newsawedWords.unshift(action.word)
            return {
                ...state,
                savedWords: newsawedWords
            }
        }
        case "GET_WORDS": {
            return {
                ...state,
                savedWords: action.words
            }
        }
        case "DELETE": {
            const newwords = [...state.savedWords].filter(el => el.id !== action.id).filter(el => {return {...el}})
            return {
                ...state,
                savedWords: newwords
            }
        }
        case "SET_NAME": {
            return {
                ...state,
                bookName: action.name
            }
        }
        default: {
            return state
        }
    }
};

export const getBook = (book) => ({type: "GET_BOOK", book});
export const setBookName = (name) => ({type: "SET_NAME", name});
export const getPage = (page) => ({type: "GET_PAGE", page});
export const getlevel = (level) => ({type: "GET_LEVEL", level});
export const getWord = (words) => ({type: "GET_WORDS", words});
export const setWord = (word) => ({type: "SET_WORDS", word});
export const getName = (name) => ({type: "GET_NAME", name});
export const deleteWordAC = (id) => ({type: "DELETE", id});
