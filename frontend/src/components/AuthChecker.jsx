import React, {useEffect} from 'react'
import store from '../lib/zustand'

export default function AuthChecker() {
	const {setUser, user, auth, backend_url, setAuth, Logout} = store()
	const getMe = async (token) => {
		const res = await fetch(`${backend_url}/auth/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": token
			}
		})
		const data = await res.json()
		if (!data.error) {
			setUser(data.user)
		}

	}
	useEffect(() => {
		if (auth) {
			const token = localStorage.getItem('auth-token')
			if (token)
				getMe(token)
			else
				Logout()
		}
	}, [auth])

	return (
		<></>
	)
}
