import React, {SyntheticEvent, useEffect, useState} from 'react';
import {LoggedUserEntity, UserEntity} from 'types';
import {ErrorMessage} from "../../common/ErrorMessage/ErrorMessage";

import '../Registration/AuthForms.scss';
import {apiUrl} from "../../../config/api";

interface JsonLoginData {
  success: true,
  loggedUser: LoggedUserEntity,
}

interface JsonLoginDataFail {
  success: false,
  status: number,
  message: string,
}

export const Login = () => {
  const [user, setUser] = useState<UserEntity>({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (errorMessage.length > 0) {
      setErrorMessage('')
    }
  }, [user.username, user.password])

  const changeValue = (key: string, value: any) => {
    setUser(form => ({
      ...form,
      [key]: value,
    }))
  }

  const sendData = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      })
    })
    const data: JsonLoginDataFail | JsonLoginData = await res.json();
    if (!data.success) {
      setErrorMessage(data.message);
    }
    if (data.success) {

      localStorage.setItem('username', data.loggedUser.username);
      localStorage.setItem('id', data.loggedUser.id);
      // window.location.href = 'https://www.bkolsutjs-caloriescalc.networkmanager.pl'
      window.location.href = '/'
    }
  }

  return (
    <div className='signin-form-box'>
      <div className="auth-form">
        <h1 className='auth-form__h1'>Logowanie</h1>
        {
          errorMessage.length > 0
            ? <ErrorMessage message={errorMessage}/>
            : null
        }
        <form onSubmit={sendData} className="auth-form__form">
          <label>
            <input value={user.username} onChange={e => changeValue('username', e.target.value)} type="text" placeholder='Login'/>
          </label>
          <label>
            <input value={user.password} onChange={e => changeValue('password', e.target.value)}
                   type="password" placeholder='Password'/>
          </label>
          <div className='auth-form__form__buttons'>
            <button className='auth-form__form__buttons__forgot-password'>Forgot password</button>
            <button className='auth-form__form__buttons__sign-in'>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  )
}