import React, { useState, useContext, useEffect } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { postRequest, getRequest } from "../apiService/requestToBack";
import { useAuth } from "../appState/authData";
import { noteData } from "../appState/noteData";
import HomeNote from "../components/Note";

const home = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { user, setUser, login } = useAuth();
    const { notesArray, setNotesArray, initNotes  } = noteData();

    const initData = async () => {
        setLoading(true);
        const notesResponse = await getRequest("/api/note-manager/get-notes");
        if (user && notesResponse.notes) {
            const init = await initNotes(notesResponse.notes);
        }
        setLoading(false);
    };

    const clickOnNewNote = () => {
        navigate("/create-note");
    };

    useEffect(() => {
        initData();
    }, [user])

    useEffect(() => {

    }, [loading])

    return (
        <>
            <div id="home-container " className="container  p-0 text-truncate border-success">
                <div className="bg-yellow rounded mt-1 mb-1 ">
                    <button
                        type="button bg-yellow "
                        className="btn w-100 btn-lg btn-block d-flex justify-content-center align-items-center "
                        onClick={clickOnNewNote}
                    >
                        <img
                            src="/assets/pen.svg"
                            className=""
                            style={{ width: "25px", height: "25px" }}
                            alt="New"
                        />
                    </button>

                </div>
                <div className="container-fluid text-truncate p-0">
                    {notesArray
                        .slice()
                        .reverse()
                        .map((note) => (
                            <div
                                key={note.id}
                                className="btn p-0 d-flex justify-content-start align-items-start text-truncate text-secondary "
                            >
                                <HomeNote note={note} loading={loading} setLoading={setLoading} />
                            </div>

							
                        ))}
                </div>
            </div>
        </>
    )
}
export default home
