import { createContext, useState, useContext, useEffect } from "react";
import { getRequest } from "../apiService/requestToBack";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notesArray, setNotesArray] = useState(
        () => JSON.parse(localStorage.getItem("notesArray")) || []
    )

    

    const initNotes =  (notesResponse) => {
        if (Array.isArray(notesResponse) && notesResponse.length >= 1) {
            localStorage.setItem("notesArray", JSON.stringify(notesResponse))
            setNotesArray(notesResponse)

            return notesArray
        }
    }


    return (
        <NotesContext.Provider value={{ notesArray, setNotesArray, initNotes }}>
            {children}
        </NotesContext.Provider>
    );
};

export const noteData = () => {
    return useContext(NotesContext);
};
