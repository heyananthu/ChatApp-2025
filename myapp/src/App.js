// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Components/Register';
import Login from './Components/Login';
import UserHome from './Components/UserHome';
import ChatPage from './Components/ChatPage';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<UserHome/>}/>
          <Route path='/chat' element={<ChatPage/>}/>

        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default App;
