import React, { useState, useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { noteData } from "../appState/noteData"
import { postRequest, getRequest } from "../apiService/requestToBack"
import { useNavigate } from "react-router-dom"

const NotePage = () => {
    
    const [newNoteTitle, setNewNoteTitle] = useState("")
    const refNewNoteTitle = useRef(null)

    const [textData, setTextData] = useState('')
    const refTextData = useRef(null)

    const [note, setNote] = useState({})
    const [disabledButton, setDisabledButton] = useState(true)
    const [displayButton, setDisplayButton] = useState(true)
    const [displayTextArea, setDisplayTextArea] = useState(false)
   

    const { notesArray, setNotesArray, addNoteContent, notesContentArray } = noteData()
    const navigate = useNavigate()
   
    const enabledButton = (title) => {
        if (title.length > 0) {
            setDisabledButton(false)
        } else { 
            setDisabledButton(true)
        } 
    }

    const createNewNote = async () => {
        if (newNoteTitle) {
            const response = await postRequest("/api/note-manager/new-note", 
                {
                    title: newNoteTitle,
                    noteContent : {
                        textData: textData
                    }
                }
            )
            setNotesArray([...notesArray, response.note])
            navigate(`/note/${response.note.id}`);
            setNewNoteTitle("")
        }
    }

    // rename
    const handleTextChange = (e) => {
        setNewNoteTitle(e.target.value);
    }

    const handleTextAreaChange = (e) => {
        setTextData(e.target.value)
    }

    const displayTextContent = () => {
        setDisplayButton(false)
        setDisplayTextArea(true)
        refTextData.current.focus()
    }
    useEffect(() => {
        enabledButton(newNoteTitle)
        refNewNoteTitle.current.focus()
    }, [newNoteTitle])

    useEffect(()=> {
        refTextData.current.focus()
    },[displayTextArea])

    return (
        <>
            <div className="container-fluid h-100">
                <div className="container-fluid p-3">
                    <input
                        className=" h-100 W-100"
                        ref={refNewNoteTitle}
                        id="newNoteTitle"
                        onChange={handleTextChange}
                        value={newNoteTitle}
                        placeholder="New Note"
                        
                    ></input>
                </div>
                <div 
                    className="container-fluid d-flex lign-items-center justify-content-center "
                    style={{
                        visibility: displayButton ? "visible" : "hidden"
                    }}
                >

                    <button 
                        disabled = {disabledButton}
                        id="createTextContent"
                        style={{maxWidth: 240}}
                        className="btn w-100 btn-block d-flex justify-content-center align-items-center bg-yellow mx-2 "
                        onClick={displayTextContent}
                    >
                        <img
                            src="src/assets/text.svg"
                            className=""
                            style={{ width: "25px", height: "25px" }}
                            alt="NewText"
                        />
                    </button>
                    <button 
                        disabled = {true}
                        id="createListContent"
                        style={{maxWidth: 240}}
                        className="btn w-100 btn-block d-flex justify-content-center align-items-center bg-yellow mx-2 "
                    >
                        <img
                            src="src/assets/list-check.svg"
                            className=""
                            style={{ width: "25px", height: "25px" }}
                            alt="NewList"
                        />
                    </button>
                </div>
                <div
                    className="w-100"
                    style={{
                        visibility: displayTextArea ? "visible" : "hidden",
                    }}

                >
                    <textarea
                        ref={refTextData}
                        onBlur={createNewNote}
                        className="w-100 "
                        value={textData}
                        onChange={handleTextAreaChange}
                        style={{
                             height: "33vh" 
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default NotePage;
