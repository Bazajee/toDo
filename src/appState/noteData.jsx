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

    // Add note content to noteContentDataArray. Content must be contentObject init with fetchNoteContent() in Homepage.
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

    // Update content of a note in noteContentArray
    const updateTextContent = (updatedTextBlock) => {
        const noteContentIndex = notesContentArray.findIndex(content => content.noteId == updatedTextBlock.noteId)
        const textBlockIndex = notesContentArray[noteContentIndex].textBlock.findIndex( textBlock => textBlock.id == updatedTextBlock.id )

        const updatedNotesArrayContent = notesContentArray.map(noteContent => {
            if (noteContent.noteId == updatedTextBlock.noteId && noteContent.textBlock[textBlockIndex].id == updatedTextBlock.id) {
                noteContent.textBlock[textBlockIndex] = updatedTextBlock
            }
            return noteContent

        })
        setNotesContentArray(updatedNotesArrayContent)
        localStorage.setItem('notesContent', JSON.stringify(updatedNotesArrayContent))
        return updatedTextBlock
    }

    return (
        <NotesContext.Provider value={{ notesArray, notesContentArray, setNotesArray, initNotes, deleteNote, addNoteContent, updateTextContent }}>
            {children}
        </NotesContext.Provider>
    );
};

export const noteData = () => {
    return useContext(NotesContext);
};
