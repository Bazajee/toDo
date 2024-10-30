import { createContext, useState, useContext, useEffect } from "react";
import { getRequest } from "../apiService/requestToBack";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notesArray, setNotesArray] = useState(
        () => JSON.parse(localStorage.getItem("notesArray")) || []
    )

    const getNoteIndex = (noteId) => {
        const noteIndex = notesArray.findIndex(
            (note) => note.id == parseInt(noteId)
        )
        return noteIndex;
    };

    const initNotes =  (notesResponse) => {
        if (Array.isArray(notesResponse) && notesResponse.length >= 1) {
            localStorage.setItem("notesArray", JSON.stringify(notesResponse))
            setNotesArray(notesResponse)
            return notesArray
        }
    }

    const deleteNote = (noteId) => {
        const noteIndex = getNoteIndex(noteId)
        if (noteIndex >= 0 && noteIndex < notesArray.length){
            setNotesArray(notesArray.filter((_, i) => i !== noteIndex))
            
        }
    }

    return (
        <NotesContext.Provider value={{ notesArray, setNotesArray, initNotes, deleteNote }}>
            {children}
        </NotesContext.Provider>
    );
};

export const noteData = () => {
    return useContext(NotesContext);
};
