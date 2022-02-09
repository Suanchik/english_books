import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Book from '../Book/Book';
import BookList from '../BookList/BookList';
import LoginForm from '../LoginForm/LoginForm';

function Routs({ isAuth, setisbloor, setId, setdeletingWord, isbloor }) {

    const [booName, setbookName] = useState('');

    return (
        <div>
            <Switch>
                <Route exact path="/login"><LoginForm /></Route>
                <Route exact path="/"><BookList /></Route>
                <Route exact path="/books"><BookList /></Route>
                <Route path="/readzal" ><Book
                    setbookName={setbookName}
                    booName={booName}
                    setisbloor={setisbloor}
                    setdeletingWord={setdeletingWord}
                    setId={setId}
                    isbloor={isbloor}
                    isAuth={isAuth}
                /></Route>
            </Switch>
        </div>
    );
}

export default Routs;
