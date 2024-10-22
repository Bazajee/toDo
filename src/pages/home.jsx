import React, { useState, useContext, useEffect } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css"
import { postRequest, getRequest } from "../apiService/requestToBack"
import { useAuth } from "../appState/authData"
import { noteData }  from "../appState/noteData"



const home = () => {
    const [count, setCount] = useState(0)
    const { user, setUser, login } = useAuth()
    const { notesArray, setNotesArray, initNotes }= noteData()


    const initData = async () => {
        const notesResponse = await getRequest('/note-manager/get-notes')
        if (user && notesResponse.notes) {
            const init = await initNotes(notesResponse.notes)
        }
    } 


    useEffect(() => {
        initData()
    }, [user])


    return (
        <>
            <div>
                <div>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img
                            src={reactLogo}
                            className="logo react"
                            alt="React logo"
                        />
                    </a>
                </div>
                <h1>Vite + React</h1>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        </>
    );
};
export default home;
