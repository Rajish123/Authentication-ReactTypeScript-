import React from 'react';
import './App.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import RegisterForm from './component/registerForm';

interface IFormInput {
  firstname:string;
  lastname:string;
  age:number;
}

function App() {
  const {register,handleSubmit} = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
  return (
    <div className="App">
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstname", { required: true, maxLength: 20 })} />
        <input {...register("lastname", { pattern: /^[A-Za-z]+$/i })} />
        <input type="number" {...register("age", { min: 18, max: 99 })} />
        <input type="submit" />
      </form><br/><br/> */}
      <RegisterForm />
    </div>
  );
}

export default App;
