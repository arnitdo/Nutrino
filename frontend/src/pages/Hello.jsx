import React from 'react'
import store from '../lib/zustand'

export default function Hello() {
	const {user, Logout, setMessage, setType, setToast} = store()
	return (
		<div>{JSON.stringify(user)}
			<button className=' bg-red-500 p-2 hover:scale-95 ' onClick={() => {
				Logout();
				setMessage("Logged Out");
				setToast(true)
				setType("info")
			}}>Logout
			</button>
		</div>
	)
}
