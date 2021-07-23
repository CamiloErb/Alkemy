import React, { useState } from "react"
import { useFormik } from 'formik';
import axios from "axios"
import { Redirect } from "react-router";


const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 4) {
        errors.password = 'Must be at least 4 characters';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

export const LoginForm = () => {
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState("")

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: async values => {
            await axios.post("http://challenge-react.alkemy.org/", {
                email: values.email,
                password: values.password
            }).then(response => {
                localStorage.setItem("token", JSON.stringify(response.data.token))
                setRedirect(true)
                window.location.reload();

            }).catch(error => {
                setError(error)
            })
        },
    });
    if(redirect) {
        return <Redirect to="/"></Redirect>
    } else {
    return (
        <div className="w-75 m-auto mt-5 border border-dark border-2 rounded bg-light" >
            <div className="mt-5 d-block m-auto w-75"><h4> log in to continue.</h4></div>
            <form className="w-75 m-auto mt-5 mb-5" onSubmit={formik.handleSubmit}  >
                <div className="mb-5">
                    <label className="form-label">Email</label>
                    <input id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        type="email" className="form-control" />
                    {formik.touched.email && formik.errors.email ? <div className="alert alert-light p-0 mt-3">{formik.errors.email}</div> : null}
                </div>
                <div className="mb-5">
                    <label className="form-label">Password</label>
                    <input id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        type="password" className="form-control" />
                    {formik.touched.password && formik.errors.password ? <div className="alert alert-light p-0 mt-3">{formik.errors.password}</div> : null}
                    {error ? <div className="alert alert-light p-0 mt-3">Email or password incorrect.</div> : null}
                </div>
                <button type="submit" className="btn btn-success">Send</button>
            </form>
        </div>
    )
}
}