import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ics from '../../assets/img/x.png'

const Words = ({ predeleteWord, isbloor, showWords }) => {

    const words = useSelector(({ booksReduser }) => booksReduser.savedWords);

    const [savedWords, setWords] = useState('');
    const [totalCount, settotalCount] = useState(5);



    useEffect(() => {
        const newArr = [...words].filter((el, index) => index < totalCount)
        setWords(newArr)
    }, [words, totalCount]);

    const showMore = () => {
        if (totalCount < words.length) {
            settotalCount(totalCount + 5)
        }
    }

    return (
        <div className="wordsBlock">
            <div className="translate_all" onClick={showWords}>читать дальше</div>
            {!savedWords.length < 1 ? savedWords.map(el =>
                <div key={el.id} className="words">
                    <div>
                        <div>
                            <img onClick={() => isbloor ? undefined : predeleteWord(el.id, el.word)} src={ics} alt="x" />
                            <div className="word">{el.word}</div>
                            <div className="explane">{el.explain}</div>
                        </div>
                    </div>
                </div>) : <div className="noneWords">словарь пустой</div>}
            {words.length > 10 && totalCount < words.length ? <div onClick={showMore} className="show_more">more</div> : null}
        </div>
    )
}

export default Words;
