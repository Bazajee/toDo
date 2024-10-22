import { createContext, useState, useContext, useEffect } from "react";
import { getRequest } from "../apiService/requestToBack";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notesArray, setNotesArray] = useState(
        () => JSON.parse(localStorage.getItem("notesArray")) || []
    )

    const initNotes = async (notesResponse) => {
        console.log("note->", typeof notesResponse, notesResponse);
        localStorage.setItem("notesArray", JSON.stringify(notesResponse));
        setNotesArray(notesResponse);
    }

    return (
        <NotesContext.Provider value={{ notesArray, initNotes }}>
            {children}
        </NotesContext.Provider>
    );
};

export const noteData = () => {
    return useContext(NotesContext);
};
