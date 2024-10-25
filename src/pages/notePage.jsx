import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../appState/authData";
import { noteData } from "../appState/noteData";
import { postRequest } from "../apiService/requestToBack";
import { useNavigate } from "react-router-dom";

const NotePage = () => {
    const [note, setNote] = useState({});
    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [newNote, setNewNote] = useState({});
    const [loading, setLoading] = useState(true);
    const refNewNoteTitle = useRef(null);

    const { id } = useParams();
    const { user, setUser, login } = useAuth();
    const { notesArray, setNotesArray, addNewNote } = noteData();
    const navigate = useNavigate();

    const getNote = (noteId) => {
        const noteFound = notesArray.find(
            (note) => note.id == parseInt(noteId)
        );
        setNote(noteFound);
        return noteFound;
    };

    const createNewNote = async () => {
        if (newNoteTitle) {
            const response = await postRequest("/note-manager/new-note", {
                title: newNoteTitle,
            });
            setNotesArray([...notesArray, response.note]);
            navigate(`/note/${response.note.id}`);
            setNewNoteTitle("");
        }
    };

    const handleTextChange = (e) => {
        setNewNoteTitle(e.target.value);
    };

    useEffect(() => {
        if (id) {
            getNote(id);
            setLoading(false);
        } else {
            refNewNoteTitle.current.focus();
        }
    }, [id, notesArray]);

    return (
        <>
            {!id ? (
                <div className="container-fluid">
                    <input
                        className=" h-100 W-100"
                        ref={refNewNoteTitle}
                        id="newNoteTitle"
                        onChange={handleTextChange}
                        onBlur={createNewNote}
                        value={newNoteTitle}
                        placeholder="New Note"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                createNewNote();
                            }
                        }}
                    ></input>
                </div>
            ) : (
                <div id="test" className="container">
                    <div id="test" className="container">
                        {loading ? (
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        ) : (
                            <div>
                                <div className="d-flex justify-content-start align-items-start">
                                    <h1
                                        className="text-truncate"
                                        style={{ margin: 0 }}
                                    >
                                        {note.title || "Note Title"}
                                    </h1>
                                    <p>{id}</p>
                                </div>
                                <div></div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default NotePage;
