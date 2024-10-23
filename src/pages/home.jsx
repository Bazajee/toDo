import React, { useState, useContext, useEffect } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { postRequest, getRequest } from "../apiService/requestToBack";
import { useAuth } from "../appState/authData";
import { noteData } from "../appState/noteData";
import HomeNote from "../components/Note";

const home = () => {
    
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const { user, setUser, login } = useAuth()
    const { notesArray, setNotesArray, initNotes } = noteData();

    const initData = async () => {
        setLoading(true)
        const notesResponse = await getRequest("/note-manager/get-notes");
        if (user && notesResponse.notes) {
            const init = await initNotes(notesResponse.notes);
        }
        setLoading(false)
    }

    const clickOnNote = (id) => {
        navigate(`/note/${id}`)
    }

    useEffect(() => {
        initData();
        console.log(notesArray);
    }, [user]);

    return (
        <>
            <div id="home-container" className="container">
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-light btn-lg btn-block d-flex justify-content-center align-items-center ">
                        <img src="src/assets/pen.svg" className="" style={{ width: '20px', height: '20px' }} alt="New" />
                        
                    </button>
                    {/* <button type="button" className="btn btn-light btn-lg btn-block d-flex justify-content-center align-items-center">
                        <img src="src/assets/add.svg" style={{ width: '20px', height: '20px' }} ></img>
                    </button> */}
                </div>
                <div className="container-fluid">

                    {notesArray.map((note) => (
                        <div key={note.id} 
                        className="btn"
                        onClick={()=>{clickOnNote(note.id)}}
                        >
                            <HomeNote  note={note} />
                        </div>
                    ))}
                    

                </div>
            </div>
        </>
    );
};
export default home;
