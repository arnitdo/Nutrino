import { create } from "zustand";

const store = create((set) => ({
  message: "",
  setMessage: (item) => set(() => ({ message: item })), // set is a function that takes a function
  toast: false,
  setToast: (item) => set(() => ({ toast: item })),
  user: null,
  setUser: (item) => set(() => ({ user: item })),
  auth: false,
  setAuth: (item) => set(() => ({ auth: item })),
  Logout: () => set(() => ({ user: null, auth: false })),
  getUser: (token) => set(async () => ({user: await getMe(token)})),
}));

const getMe = async(token) => {
  console.log("fired 2")
  const url = import.meta.env.VITE_BACKEND_URL
  const res = await fetch(`${url}/auth/me`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "auth-token": token
      }
  })
  const data = await res.json()
  if(!data.error){
    return data.user
  }else {
    return null
  }
}

export default store;