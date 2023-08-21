import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

export const Form = () => {
    // Define validation schema using yup
    const schema = yup.object().shape({
        fullName: yup.string().required("Your Full Name is Required"),
        email: yup.string().email().required("Your Email is Required"),
        age: yup.number().positive().integer().min(18).required("Your Age is Required"),
        password: yup.string().min(4).max(20).required("Your Password is Required"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password Don't Match").required(),
    });

    // Use the useForm hook to manage form state and validation
    const {
        register,           // Function to register input elements
        handleSubmit,       // Function to handle form submission
        formState: { errors }, // Object containing validation errors
    } = useForm({
        resolver: yupResolver(schema), // Apply yup validation schema
    });

    // Function to be executed when the form is submitted
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Input fields with registration and error messages */}
            <input type="text" placeholder="Full Name..." {...register("fullName")} />
            <p className='errormsg'>{errors.fullName?.message}</p>

            <input type="text" placeholder="Email..." {...register("email")} />
            <p className='errormsg'>{errors.email?.message}</p>

            <input type="number" placeholder="Age..." {...register("age")} />
            <p className='errormsg'>{errors.age?.message}</p>

            <input type="text" placeholder="Password..." {...register("password")} />
            <p className='errormsg'>{errors.password?.message}</p>

            <input type="text" placeholder="Confirm Password..." {...register("confirmPassword")} />
            <p className='errormsg'>{errors.confirmPassword?.message}</p>

            <input type="submit" value="Submit" />
        </form>
    );
};
