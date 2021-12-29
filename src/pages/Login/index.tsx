import React, { useEffect } from 'react';
import { Button } from 'antd';
import io from 'socket.io-client';
import { SOCKET_OPTIONS, SOCKET_URL } from '../../const/config';

const socket = io(SOCKET_URL, SOCKET_OPTIONS);

const Login = () => {

    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.io);
        })
        socket.on('disconnect', reason => {
            console.log(reason)
            if (reason === 'io server disconnect') {
                socket.connect();
            }
        })
    }, []);

    return (
        <>
            <Button onClick={() => {
                socket.emit('click', { button: 1 })
            }} >click</Button>
        </>
    )
}

export default Login;