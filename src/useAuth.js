import { useState, useEffect } from 'react';
import axios from 'axios'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios.post('https://musicsamples.herokuapp.com/login', {
            code,
        })
        .then(res => {
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({}, null, '/')
        })
        .catch(() => {
            window.location = "/";
        })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
        axios.post('https://musicsamples.herokuapp.com/refresh', {
            refreshToken,
        })
        .then(res => {
            setAccessToken(res.data.access_token);
            setExpiresIn(res.data.expires_in);
        })
        .catch(() => {
            window.location = "/";
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);
    return accessToken;
}