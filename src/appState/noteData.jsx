import { createContext, useState, useContext, useEffect } from "react";
import { getRequest } from "../apiService/requestToBack";

const NotesContext = createContext();

// This useContext provide note data. We use local storage for save the data and useState for return it.
// /!\ Local storage only needs to be updated here /!\
export const NotesProvider = ({ children }) => {

    const [notesArray, setNotesArray] = useState(
        () => JSON.parse(localStorage.getItem("notesArray")) || []
    )

    const [notesContentArray, setNotesContentArray] = useState(
        () => JSON.parse(localStorage.getItem("notesContent")) || []
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

    const addNoteContent = (noteId, content) => {
        content["noteId"] = noteId
        if (notesContentArray.length == 0 ) {
            localStorage.setItem('notesContent', JSON.stringify([content]))
            setNotesContentArray([content])

        }else if (!notesContentArray.find( note => note.noteId === noteId)) {
            const updateContent = [...notesContentArray, content]
            setNotesContentArray(updateContent)
            localStorage.setItem('notesContent', JSON.stringify(updateContent))
        }   
    }

    

    return (
        <NotesContext.Provider value={{ notesArray, notesContentArray, setNotesArray, initNotes, deleteNote, addNoteContent }}>
            {children}
        </NotesContext.Provider>
    );
};

export const noteData = () => {
    return useContext(NotesContext);
};
