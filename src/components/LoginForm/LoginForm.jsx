import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAuth } from '../../redux/isAuthreduser';
import './../LoginForm/LoginForm.scss'

function LoginForm() {

    const dispatch = useDispatch();
    const rou = useHistory();

    const login = (e) => {
        e.preventDefault()
        dispatch(setAuth(true))
        localStorage.setItem('auth', 'true');
        rou.push('/books');
    }

    return (
        <div className="login_block">
            <h2>Логинизация</h2>
            <div className="form">
                <form onSubmit={login}>
                    <div> <input placeholder='email' /></div>
                    <div> <input placeholder='password' /></div>
                    <div className="button">
                        <button className="login">войти</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
