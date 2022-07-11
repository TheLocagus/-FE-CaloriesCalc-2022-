import React, {SyntheticEvent, useEffect, useState} from 'react';
import {ErrorEntity, UserEntity } from 'types';
import {ErrorMessage} from "../../common/ErrorMessage/ErrorMessage";
import {Message} from "../../common/Message/Message";

import './Registration.css';

interface RegistrationJsonResponse {
    success: true,
    message: string,
}

export const Registration = () => {

    const [user, setUser] = useState<UserEntity>({
        username: '',
        password: '',
    })

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
        const res = await fetch('http://localhost:3002/auth/registry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password,
            })
        })
        const data: RegistrationJsonResponse | ErrorEntity = await res.json();

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
        <div className="signup-form-wrapper">
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
            <form onSubmit={sendData} className="signup-form">
                <label>Username
                    <input value={user.username} onChange={e => changeValue('username', e.target.value)} type="text"/>
                </label>
                <label>Password
                    <input value={user.password} onChange={e => changeValue('password', e.target.value)} type="password"/>
                </label>
                <button>Sign up</button>
            </form>
        </div>
    )
}