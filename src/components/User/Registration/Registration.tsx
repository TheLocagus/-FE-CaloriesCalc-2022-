import React, {SyntheticEvent, useState} from 'react';
import { UserEntity } from 'types';

export const Registration = () => {

    const [data, setData] = useState<UserEntity>({
        username: '',
        password: '',
    })

    const changeValue = (key: string, value: any) => {
        setData(form => ({
            ...form,
            [key]: value,
        }))
    }

    const sendData = async(e: SyntheticEvent) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3002/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            })
        })
        const datas = await res.json()
        console.log(datas.error)
    }

    return (
        <div className="signup-form-wrapper">
            <h1>Rejestracja</h1>
            <form onSubmit={sendData} className="signup-form">
                <label>Username
                    <input value={data.username} onChange={e => changeValue('username', e.target.value)} type="text"/>
                </label>
                <label>Password
                    <input value={data.password} onChange={e => changeValue('password', e.target.value)} type="password"/>
                </label>
                <button>Sign up</button>
            </form>
        </div>
    )
}