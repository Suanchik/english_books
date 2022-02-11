import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteWordAC } from '../../redux/booksReduser';

const DeleteWindow = ({ setisbloor, id, deletingWord }) => {

    const dispatch = useDispatch();


    const deletWord = () => {

        axios.delete(`/words/${id}`)
            .then(() => {
                dispatch(deleteWordAC(id))
                setisbloor(false)
            })
    }

    return (
        <div className="have_you_known_block">
            <div className="have_you_known">вы уже знаете слово&nbsp;
                <span className="deletingWord">{deletingWord}</span>&nbsp;?
                <div className="choic">
                    <div className="no" onClick={() => setisbloor(false)}>оставить</div><div className="yes" onClick={() => deletWord()}>удалить</div>
                </div>
            </div>
        </div>
    )
}
export default DeleteWindow;
