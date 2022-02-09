import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPage } from '../../redux/booksReduser';
import './pages.scss'

const Pages = ({ text, page }) => {

    const dispatch = useDispatch();

    const chanePage = (page) => {
        dispatch(getPage(page))
    }

    return (
        <div className="pages">
            {text?.map((el, index) =>
                <button
                    key={index}
                    disabled={page === index}
                    onClick={() => chanePage(index)}
                    className={page !== index ? page > index ? "done" : "page" : "page dispage"}>
                    {index + 1}
                </button>)
            }</div>
    )
}

export default Pages;
