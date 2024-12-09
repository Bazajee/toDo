import React, { useState, useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { noteData } from "../appState/noteData"
import { postRequest, getRequest } from "../apiService/requestToBack"
import { useNavigate } from "react-router-dom"

const NotePage = () => {
    const [note, setNote] = useState({})
    const [newNoteTitle, setNewNoteTitle] = useState("")
    const refNewNoteTitle = useRef(null)
    const refTextData = useRef(null)
    const [disabledButton, setDisabledButton] = useState(true)
    const [displayButton, setDisplayButton] = useState(true)
    const [displayTextArea, setDisplayTextArea] = useState(false)
    const [textData, setTextData] = useState('')

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
            const response = await postRequest("/note-manager/new-note", 
                {
                    title: newNoteTitle,
                    noteContent : {
                        textData: 'test of test'
                    }
                }
            )
            setNotesArray([...notesArray, response.note]);
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
    }

    useEffect(() => {
        enabledButton(newNoteTitle)
        
    }, [newNoteTitle])


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
                            alt="New"
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
                            alt="New"
                        />
                    </button>
                </div>
                <div
                    className="w-100"
                    style={{
                        visibility: displayTextArea ? "visible" : "hidden",
                        

                    }}
                    ref={refTextData}
                    onChange={handleTextAreaChange}
                    onBlur={createNewNote}
                >
                    <textarea
                        className="w-100 h-"
                        value={textData}
                        style={{
                            overflow: "hidden",
                             height: "33vh" 
                        }}
                    
                    />


                </div>
            </div>
        </>
    );
};

export default NotePage;
