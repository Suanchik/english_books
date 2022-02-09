import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setAuth } from '../../redux/isAuthreduser';

function Nav({ isAuth, isbloor }) {

    const dispatch = useDispatch();

    const rou = useHistory();

    const logout = () => {
        dispatch(setAuth(false))
        localStorage.removeItem('auth');
        rou.push('/login')
    }


    return (
        <div>
            <h1><div>English with reading</div>
                <Link to="/books" className={!isbloor ? '' : 'disabled-link'} ><span className="books" >книги</span></Link>
                <Link to="/readzal" className={!isbloor ? '' : 'disabled-link'} ><span className="readzal" >читальный зал</span></Link>
                <span className="auth">
                    {/* <span className="reg">регистрация</span> */}
                    {isAuth ? <span className="login" onClick={() => logout()}>выйти</span> : null}
                </span>
            </h1>
        </div>
    );
}

export default Nav;
