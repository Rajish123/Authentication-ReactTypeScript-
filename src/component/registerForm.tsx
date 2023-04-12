import React from 'react'
import {useForm, SubmitHandler,Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import { resolve } from 'path';

//  specifies the types for the form input fields, email and password.
interface IFormInput{
    email:string;
    password:string;
}

// define the rules for validation
const schema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().min(4).max(10).required(),
})

const RegisterForm:React.FC = () => {
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
        const {email,password} = data;
        const isAuthenticated = await login(email,password);
        console.log('isAuthenticated', isAuthenticated);
    };

  return (
    <div className='registerForm'>
        {/* pass the form data into handleSubmit  */}
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            <Controller 
                name = 'email'
                control={control}
                defaultValue='abc@email.com'
                render = {({field})=>(
                    // here ...field takes all value i.e, name,control,default and passing to textField
                    <TextField 
                        {...field}
                        label = "Email Address"
                        type='email'
                        error = {!!errors.email}
                        helperText = {errors.email ? errors.email?.message:''}

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
    </div>
  );
};

// TypeScript arrow function named Login that takes in two parameters: email and password, both of type string. The function returns a Promise that resolves to a boolean value.
const login = async(email:string, password:string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve,1000));

    if (email === "abc@gmail.com" && password === "password"){
        return true;
    }

    return false;
}

export default RegisterForm
