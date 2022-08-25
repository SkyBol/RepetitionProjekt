import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { login as login_accout, register as register_account } from '../service/AccountManagement';
import '../style/Login.css';

function Login({isLogin} : {isLogin : boolean}) {
    const [isSubmitting, setIsSubmitting] = useState<boolean>();
    const navigate = useNavigate();
    const startUsername = localStorage.getItem('username');

    let validationSchema = yup.object({
        username: yup.string()
            .min(1, 'Minimum of 1 Character expected')
            .max(100, 'Maximum of 100 characters')
            .required('Required'),
        password: yup.string()
            .min(1, 'Minimum of 1 Character expected')
            .max(100, 'Maximum of 100 characters')
            .required('Required'),
    });
    let formik = useFormik({
        initialValues: {
            username: startUsername && isLogin ? startUsername : '',
            password: ''
        },
        onSubmit: (values) => {
            setIsSubmitting(true);
            if (isLogin)
                login_accout({username : values.username, password : values.password})
                    .then( () => { navigate('/'); } )
                    .catch( () => { setIsSubmitting(false); } );
            else
                register_account({username : values.username, password : values.password})
                    .then( () => { navigate('/'); } )
                    .catch( () => { setIsSubmitting(false); } );
        },
        validationSchema: validationSchema
    });

    return (
        <div className="Login">
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    id='username'
                    name='username'
                    label='username'
                    onChange={formik.handleChange}
                    error={formik.errors.username ? true : false}
                    defaultValue={formik.initialValues.username}
                    helperText={formik.errors.username}
                /> <br />
                <TextField
                    id='password'
                    name='password'
                    label='password'
                    type='password'
                    onChange={formik.handleChange}
                    error={formik.errors.password && formik.touched.password ? true : false}
                    defaultValue={formik.initialValues.password}
                    helperText={formik.errors.password}
                /> <br />
                <Button variant="contained" type="submit" disabled={isSubmitting} color={isLogin ? 'primary' : 'secondary'} > 
                    { isLogin ? 'Login' : 'Register' }
                </Button>

                <Button variant="contained" disabled={isSubmitting} onClick={ () => {navigate(isLogin ? '/register' : '/login');} } color={isLogin ? 'secondary' : 'primary'} > 
                    { isLogin ? 'Switch to Register' : 'Switch to Login' }
                </Button>
            </form>
        </div>
    );
}

export default Login;