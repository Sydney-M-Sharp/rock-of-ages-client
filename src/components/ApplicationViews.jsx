import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { RockForm } from "./RockForm.jsx"
import { RockList } from "./RockList.jsx"
import { Register } from '../pages/Register.jsx'
import { UserRockList } from './UserRockList.jsx'


export const ApplicationViews = () => {
    const [rocksState, setRocksState] = useState([{
        id: 1,
        name: "Sample",
        type: {
            id: 1,
            label: "Volcanic"
        }
    }])

    const fetchRocksFromAPI = async () => {
        const response = await fetch("http://localhost:8000/rocks",
            {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
                }
            })
        const rocks = await response.json()
        setRocksState(rocks)
    }
    const fetchUserRocksFromAPI = async () => {
        const response = await fetch("http://localhost:8000/rocks?owner=current",
            {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
                }
            })
        const rocks = await response.json()
        setRocksState(rocks)
    }
    const deleteUserRockFromAPI = async (rockId) => {
        const response = await fetch(`http://localhost:8000/rocks/${rockId}`,
            {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
                },
                method: "DELETE"
            })
        
            const rocks = await fetchUserRocksFromAPI()
            setRocksState(rocks)
    }

    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/allrocks" element={<RockList rocks={rocksState} fetchRocks={fetchRocksFromAPI} deleteRock={deleteUserRockFromAPI} />} />
                <Route path="/create" element={<RockForm fetchRocks={fetchRocksFromAPI} />} />
                <Route path="/mine" element={<UserRockList rocks={rocksState} fetchUserRocks={fetchUserRocksFromAPI} deleteRock={deleteUserRockFromAPI}/>} />
            </Route>
        </Routes>
    </BrowserRouter>
}