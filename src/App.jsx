import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import DeleteWindow from './components/Book/DeleteWindow';
import Nav from './components/Nav/Nav';
import Routs from './components/Routs/Routs';
import { setAuth } from './redux/isAuthreduser';


function App() {

  const [deletingWord, setdeletingWord] = useState('');
  const [isbloor, setisbloor] = useState(false);
  const [id, setId] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(setAuth(true))
    }
  }, [])

  const isAuth = useSelector(({ authReduser }) => authReduser.isAuth);




  return (
    <HashRouter>
      <div>
        {
          isbloor ?
            <DeleteWindow setisbloor={setisbloor} deletingWord={deletingWord} id={id} /> :
            null
        }
        <div className={isbloor ? "PROJECT bloor" : "PROJECT"}>
          <Nav isAuth={isAuth} isbloor={isbloor} />
          <Routs setId={setId} setdeletingWord={setdeletingWord} setisbloor={setisbloor} isAuth={isAuth} isbloor={isbloor} />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
