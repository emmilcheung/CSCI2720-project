import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

export const Login = ({ isLogin, login }) => {
    // const origin = "http://csci2720-g20.cse.cuhk.edu.hk/"
    const origin = "/"
    const initialState = {
        username: "",
        password: "",
    }
    const [state, setState] = useState(initialState)
    if (isLogin) {
        return (<Redirect to="/" />)
    }

    const verify = async () => {
        await fetch(`${origin}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: state.username,
                password: state.password,
            })
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                else {
                    throw new Error("Unauthorized")
                }
            })
            .then(data => login(data.username, data.user_id))
            .catch(err => {
                setState({
                    ...initialState
                })
            })
    }

    return (
        <div>
            <h1>Login</h1>
            <div className="">
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text" name="username" className="form-control" value={state.username}
                        onChange={e => setState({
                            ...state,
                            username: e.target.value
                        })}
                    ></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" value={state.password}
                        onChange={e => setState({
                            ...state,
                            password: e.target.value
                        })}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login"
                    onClick={verify}
                ></input>
            </div>
        </div>
    )
}
