import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWord } from '../../redux/booksReduser';

const Generator = ({ el, class1, class2, index = null, translaterName, chapterTranslater, translater }) => {

    const words = useSelector(({ booksReduser }) => booksReduser.savedWords);

    const dispatch = useDispatch()

    const saveWord = (fun, id, explain, word, inId = "net") => {
        const splitWord = word.split('');
        const wordFilter = splitWord.filter(el => {
            if (el !== ',' && el !== '.' && el !== '”' && el !== '“' && el !== '!' && el !== '?') {
                return el
            }
        }).join('').toLowerCase();
        const newword = { word: wordFilter, learned: false, explain: explain };
        if (!words.some(el => el.word === wordFilter)) {
            axios.post(`/words/`, newword).then((res) => {
                dispatch(setWord(res.data))
            })
        };
        if (inId !== "net") { fun(id, inId) } else { fun(id) }
    }

    return (
        !el.chapter && !el.head ?
            <span>
                <span className={el.translate ? class1 : class2} onClick={() => translater(el.id)}>
                    &nbsp;{el.engl}&nbsp;
                </span>
                {el.translate ?
                    <span className="russWindow">
                        <div className="russ">
                            {el.russ}
                        </div>
                        <div className="choose">
                            <span className="learn" onClick={() => saveWord(translater, el.id, el.explain, el.engl)}>изучить</span>
                            <span className="knoun" onClick={() => translater(el.id)}>знаю</span>
                        </div>
                    </span> : null}
            </span> : el.head ?
                <span >
                    <span className={el.translate ? class1 : class2} onClick={() => translaterName(el.id, index)}>
                        &nbsp;{el.engl}&nbsp;
                    </span>
                    {el.translate ?
                        <span className="russWindow">
                            <div className="russ">
                                {el.russ}
                            </div>
                            <div className="choose">
                                <span className="learn" onClick={() => saveWord(translaterName, el.id, el.explain, el.engl, index)}>изучить</span>
                                <span className="knoun" onClick={() => translaterName(el.id, index)}>знаю</span>
                            </div>
                        </span> : null}
                </span> :
                <p>
                    {
                        el.chapter.map((elent) =>
                            <span key={el.id + Math.random() * 10}>
                                <span
                                    onClick={() => chapterTranslater(el.id, elent.id)}
                                    className={elent.translate ? class1 : class2}>
                                    &nbsp;{elent.engl}&nbsp;
                                </span>
                                {elent.translate ?
                                    <span key={elent.id + + Math.random() * 10} className="russWindow">
                                        <div className="russ">
                                            {elent.russ}
                                        </div>
                                        <div className="choose">
                                            <span className="learn" onClick={() => saveWord(chapterTranslater, el.id, elent.explain, elent.engl, elent.id)}>изучить</span>
                                            <span className="knoun" onClick={() => chapterTranslater(el.id, elent.id)}>знаю</span>
                                        </div>
                                    </span> : null}
                            </span>)
                    }
                </p>

    )
}

export default Generator;
