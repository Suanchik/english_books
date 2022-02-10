import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBook, getName, getWord } from '../../redux/booksReduser';
import Pages from '../Pages/Pages';
import './book.scss';
import Generator from './Generator';
import Words from './Words';
import loauder from '../../assets/img/l.gif'
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';


const Book = React.memo(({ booName, setbookName, setisbloor, setdeletingWord, setId, isbloor }) => {

    const rou = useHistory();

    const dispatch = useDispatch();

    const pages = useSelector(({ booksReduser }) => booksReduser.page);
    const book = useSelector(({ booksReduser }) => booksReduser.book);
    const bookname = useSelector(({ booksReduser }) => booksReduser.bookName);
    const head = useSelector(({ booksReduser }) => booksReduser.name);
    const isAuth = useSelector(({ authReduser }) => authReduser.isAuth);
    const [isloauding, setisloauding] = useState(false);


    const [name, setName] = useState('');
    const [text, settext] = useState(null);
    const [watchWords, setwatchWords] = useState(false);

    useEffect(() => {
        if (booName !== bookname) {
            setisloauding(true)
            axios.get(`/${bookname}`).then(res => {
                dispatch(getBook(res.data.text));
                dispatch(getName(res.data.name));
                setbookName(bookname)
                setisloauding(false)
            })
            axios.get(`/words`).then(res => {
                dispatch(getWord(res.data.reverse()));
            })
        }
    }, [bookname])

    useEffect(() => {
        if (!name) { setName(head) }
        settext(book && book[pages])
    }, [book, pages])

    useEffect(() => {
        setName(head)
    }, [head])

    const translater = (id) => {
        let newtext = [...text].map(el => { return { ...el } });
        newtext.map(el => {
            if (el.id === id) {
                el.translate = !el.translate
            } else {
                el.translate = false;
                if (el.chapter) {
                    el.chapter.map(el => el.translate = false)
                }
                return el
            }
        })
        settext(newtext);
        setName(head);
    };

    const chapterTranslater = (id, ilid) => {
        let indexel = text.findIndex(el => el.id === id);
        let newtext = [...text].map(el => { return { ...el } })
        let newChapter = newtext[indexel].chapter
        let newChtext = newChapter.map(el => { return { ...el } })
        newtext.map(el => {
            if (el.id === id) {
                el.translate = !el.translate
            } else {
                el.translate = false;
                return el
            }
        })
        newChtext.map(el => {
            if (el.id === ilid) {
                el.translate = !el.translate
            } else {
                el.translate = false;
                return el
            }
        })
        newtext[indexel].chapter = newChtext
        settext(newtext);
        setName(head);
    };

    const showWords = () => {
        setwatchWords(!watchWords);
    };

    const translaterName = (id, index) => {
        const newName = name.map(el => { return { ...el } });
        newName[index].translate = !newName[index].translate;
        newName.map(el => { if (el.id !== id) { el.translate = false } return { ...el } });
        setName(newName);
        settext(book[pages]);
    }

    const predeleteWord = (id, word) => {
        setdeletingWord(word);
        setisbloor(true)
        setId(id)
    }

    return (
        <div>
            {isAuth ? <div>
                {!watchWords ?
                    <div className="reed_block">
                        {isloauding ?
                            <div className="loauder">
                                <img src={loauder} alt="" />
                            </div> :
                            !booName ?
                                <div className="READ_DOOK">
                                    <h2 className="noneBook">Выберите книгу</h2>
                                </div> :
                                <div>
                                    <div className="translate_all" onClick={showWords}>слова для изучения из данной книги</div>
                                    <div className="READ_DOOK">
                                        <h2 className="book_name">{name && name.map((el, index) =>
                                            <Generator key={el.id + el.engl} el={el} class1={"active"} class2={"engl"} index={index} translaterName={translaterName} />
                                        )}
                                        </h2>
                                        <div className="text">
                                            {text && text.map(el =>
                                                <Generator key={el.id + el.russ} el={el} class1={"active"} class2={"engl"} translater={translater} chapterTranslater={chapterTranslater} />

                                            )}
                                        </div>
                                    </div>
                                </div>
                        }
                        {isloauding ? null : <Pages text={book} page={pages} />}
                    </div> :
                    <Words predeleteWord={predeleteWord} isbloor={isbloor} showWords={showWords} />
                }
            </div> :
                <LoginForm />
            }
        </div>
    )
});

export default Book
