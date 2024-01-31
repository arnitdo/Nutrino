import {create} from "zustand";

const store = create((set) => ({
	backend_url: "https://nutrino-backend.up.railway.app/api",
	api: "2ae82fab405848378532bb0ebb6b37b8",
	message: "",
	setMessage: (item) => set(() => ({message: item})), // set is a function that takes a function
	type: "info",
	setType: (item) => set(() => ({type: item})),
	toast: false,
	setToast: (item) => set(() => ({toast: item})),
	user: null,
	setUser: (item) => set(() => ({user: item})),
	auth: false,
	setAuth: (item) => set(() => ({auth: item})),
	Logout: () => set(() => ({user: null, auth: false})),
	getUser: (token) => set(async () => ({user: await getMe(token)})),
}));

const getMe = async (token) => {
	const url = import.meta.env.VITE_BACKEND_URL
	const res = await fetch(`${url}/auth/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"auth-token": token
		}
	})
	const data = await res.json()
	if (!data.error) {
		return data.user
	} else {
		return null
	}
}

export default store;