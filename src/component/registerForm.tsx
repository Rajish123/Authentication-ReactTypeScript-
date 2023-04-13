import React, {useState} from 'react'
import {useForm, SubmitHandler,Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { useAppDispatch } from '../store/store';
import { login } from '../store/features/authSlice';
import { redirect } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import axios from 'axios';

//  specifies the types for the form input fields, email and password.
interface IFormInput{
    username:string;
    password:string;
}

// define the rules for validation
const schema = yup.object().shape({
    username:yup.string().required(),
    password:yup.string().min(4).max(10).required(),
})

const RegisterForm:React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');


    // grab methods from useForm
    const {
        // references the input that you are trying to access as variable, register must have key
        register,
        // allows to add this functionality to UI component
        control,
        handleSubmit,
        watch,
        formState: {errors},
        
    } = useForm<IFormInput>({
        // inorder for schema to be integrated in our form
        // now reacthookform knows that the validation will come from schema
        resolver : yupResolver(schema),
    });

    // console.log('errors',errors);
    // console.log("keep eye on email",watch('email'));

    const formSubmitHandler : SubmitHandler<IFormInput> = async(data:IFormInput)=>{
        console.log(data);
        const {username,password} = data;
        const isAuthenticated = await logincredentials(username,password);
        console.log('isAuthenticated', isAuthenticated);
        console.log(dispatch(login));
        if (isAuthenticated) {
            dispatch(login({ username, password }));
            navigate('/profile');
        }else{
            setErrorMessage('Invalid login credentials');
        }

    };

  return (
    <div className='registerForm'>
        {/* pass the form data into handleSubmit  */}
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            <Controller 
                name = 'username'
                control={control}
                render = {({field})=>(
                    // here ...field takes all value i.e, name,control,default and passing to textField
                    <TextField 
                        {...field}
                        label = "Username"
                        error = {!!errors.username}
                        helperText = {errors.username ? errors.username?.message:''}

                    />
                )}
            /><br/><br/>

            <Controller 
                name = 'password'
                control={control}
                render={({field})=>(
                    <TextField 
                        {...field}
                        label = "Password"
                        type = "password"
                        error = {!!errors.password}
                        helperText = {errors.password ? errors.password?.message:''}  
                    />
                )}
            /><br/><br/>
            {/* <input defaultValue="" {...register('email')} /><br/> */}
            {/* <input {...register('password')} /> <br/> */}
            {/* {errors.password && errors.password?.message && <span>{errors.password.message}</span>}<br/>  */}
            <input type='submit' />
        </form>
        {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

// TypeScript arrow function named Login that takes in two parameters: email and password, both of type string. The function returns a Promise that resolves to a boolean value.
const logincredentials = async(username:string, password:string): Promise<boolean> => {
    try{
        const response = await axios.post("https://dummyjson.com/auth/login",{
            username:username,
            password:password
        });
        console.log("data",response.data);
        if (response.data.token){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
        return false
    }
};
    
    
    // await new Promise(resolve => setTimeout(resolve,1000));

    // if (email === "abc@gmail.com" && password === "password"){
    //     return true;
    // }
    // else{
    //     return false;
    // }

export default RegisterForm
