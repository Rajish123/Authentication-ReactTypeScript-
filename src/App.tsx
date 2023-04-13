import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import {store} from './store/store'; 
import { useForm, SubmitHandler } from 'react-hook-form';
import RegisterForm from './component/registerForm';
import Profile from './component/profile'
import Home from './component/home';
import Logout from './component/logout';
import { useAppSelector } from './store/store';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";



function App() {
  // const {register,handleSubmit} = useForm<IFormInput>();
  // const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
  const isAuthUser = useAppSelector(state=>state.auth.isAuthenticated)
  const email = useAppSelector(state=>state.auth.username)
  const password = useAppSelector(state=>state.auth.password)

  console.log("userState is ",isAuthUser);
  console.log("email is ",email);
  console.log("password is ",password);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            
            {isAuthUser? (
              <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to = '/logout'>Logout</Link>
              </li>
              </>
            ):(
            <li>
              <Link to="/login">Login</Link>
            </li>
            )
            }
          </ul>
        </nav>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<RegisterForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

// export default App;


    // <div className="App">
    //   {/* <form onSubmit={handleSubmit(onSubmit)}>
    //     <input {...register("firstname", { required: true, maxLength: 20 })} />
    //     <input {...register("lastname", { pattern: /^[A-Za-z]+$/i })} />
    //     <input type="number" {...register("age", { min: 18, max: 99 })} />
    //     <input type="submit" />
    //   </form><br/><br/> */}
    //   <RegisterForm />
    // </div>