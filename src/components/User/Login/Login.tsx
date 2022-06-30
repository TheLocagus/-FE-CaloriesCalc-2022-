import React, {SyntheticEvent, useEffect, useState} from 'react';
import {LoggedUserEntity, UserEntity } from 'types';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../actions/caloriesCalclator";
import {RootState} from "../../../store";
import {useNavigate} from "react-router-dom";

interface JsonData {
    status: string,
    token?: string,
    error?: string,
    loggedUser: LoggedUserEntity,
}

export const Login = () => {
    
    const [data, setData] = useState<UserEntity>({
        username: '',
        password: '',
    });
    const {user} = useSelector((store: RootState) => store.caloriesCalculator)
    const nav = useNavigate();

    const changeValue = (key: string, value: any) => {
        setData(form => ({
            ...form,
            [key]: value,
        }))
    }

    const sendData = async(e: SyntheticEvent) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3002/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            })
        })
        const datas: JsonData = await res.json();
        if (datas.status === 'ok'){
            localStorage.setItem('token', datas.token as string);
            window.location.href = 'http://localhost:3000'
        }
    }

    return (
        <div className="signin-form-wrapper">
            <h1>Logowanie</h1>
            <form onSubmit={sendData} className="signin-form">
                <label>Username
                    <input value={data.username} onChange={e => changeValue('username', e.target.value)} type="text"/>
                </label>
                <label>Password
                    <input value={data.password} onChange={e => changeValue('password', e.target.value)} type="password"/>
                </label>
                <button>Sign in</button>
            </form>
        </div>
    )
}