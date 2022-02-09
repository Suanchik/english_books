import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getlevel, setBookName } from '../../redux/booksReduser';
import './bookList.scss';

const BookList = () => {

    const booknamesarr = useSelector(({ booksReduser }) => booksReduser.booknamesarr);
    const levelr = useSelector(({ booksReduser }) => booksReduser.level);
    const disp = useDispatch()

    const [level, setlevel] = useState('');
    const [levelind, setlevelind] = useState(0);

    const levels = ["Elementary", "Pre-intermediate", "Intermediate", "Upper-intermediate", "Advanced"];

    const chooseBook = (name) => {
        disp(setBookName(name));
    }

    useEffect(() => {
        setlevel(levelr);
    }, [levelr])

    const chooselevel = (el, index) => {
        disp(getlevel(levels[index]))
        setlevelind(index)
    }

    return (
        <div className="booksBlock">
            <div className="levels">
                {levels.map((el, index) => <div key={Math.random() * 5} onClick={level === el ? undefined : () => chooselevel(el, index)} className={level === el ? "acivelevel" : null}>{el}</div>)}
            </div>
            <div className="bookList">
                <h2>{level && level}</h2>
                {booknamesarr[levelind].map(el => <div key={el.name} className="book">
                    <img src={el.img} alt="book" />
                    <div className="info">
                        <div title={el.auther}><span>author:</span>{el.auther}</div>
                        <hr />
                        <div title={el.book}><span>book:</span>{el.book}</div>
                        <hr />
                        {el.name === 'SherlockHolmes' ?
                            <div className="button"><Link to="/readzal"><div onClick={() => chooseBook(el.name)}>read</div></Link></div> :
                            <div style={{ opacity: '0.3' }} className="button"><div>read</div></div>
                        }
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default BookList

