import React, {SyntheticEvent, useEffect, useState} from 'react';
import {ErrorMessage} from "../../common/ErrorMessage/ErrorMessage";
import {Message} from "../../common/Message/Message";

import './AuthForms.scss';
import {apiUrl} from "../../../config/api";

interface RegistrationJsonResponse {
    success: true,
    message: string,
}

interface UserInFront {
    username: string;
    password: string;
    email: string;
}

export const Registration = () => {

    const [user, setUser] = useState<UserInFront>({
        username: '',
        password: '',
        email: '',
    });

    const [repeatedPassword, setRepeatedPassword] = useState<string>('')

    const changeValue = (key: string, value: any) => {
        setUser(form => ({
            ...form,
            [key]: value,
        }))
    }
    const [message, setMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        if(errorMessage.length > 0){
            setErrorMessage('')
            setMessage('')
        }
    }, [user.username, user.password])

    const sendData = async(e: SyntheticEvent) => {
        e.preventDefault();
        const res = await fetch(`${apiUrl}/auth/registry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password,
            }),
            credentials: "include",
        })
        const data: RegistrationJsonResponse  = await res.json();

        if (!data.success){
            setMessage('')
            setErrorMessage(data.message)
        }

        if (data.success){
            setErrorMessage('')
            setMessage(data.message)
        }
    }

    return (
        <div className="auth-form">
            <h1>Rejestracja</h1>
            {
                errorMessage.length > 0
                    ? <ErrorMessage message={errorMessage}/>
                    : null
            }
            {
                message.length > 0
                    ? <Message message={message}/>
                    : null
            }
            <form onSubmit={sendData} className="auth-form__form">
                <label>
                    <input
                      placeholder='Username'
                      value={user.username}
                      onChange={e => changeValue('username', e.target.value)}
                      type="text"/>
                </label>
                <label>
                    <input
                      placeholder='Password'
                      value={user.password}
                      onChange={e => changeValue('password', e.target.value)}
                      type="password"/>
                </label>
                <label>
                    <input
                      placeholder='Repeat password'
                      value={repeatedPassword}
                      onChange={e => setRepeatedPassword(e.target.value)}
                      type="password"/>
                </label>
                <label>
                    <input
                      placeholder='Email'
                      value={user.email}
                      onChange={e => changeValue('email', e.target.value)}
                      type="email"/>
                </label>
                <div className='auth-form__buttons'>
                    <button>Sign up</button>
                </div>
            </form>
        </div>
    )
}