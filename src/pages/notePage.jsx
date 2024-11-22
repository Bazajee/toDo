import React, { useState, useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { noteData } from "../appState/noteData"
import { postRequest, getRequest } from "../apiService/requestToBack"
import { useNavigate } from "react-router-dom"

const NotePage = () => {
    const [note, setNote] = useState({})
    const [newNoteTitle, setNewNoteTitle] = useState("")
    const [loading, setLoading] = useState(true)
    // Is object with content data of the relative note 
    const [content, setContent] = useState({})
    // Is list of block (list or text) in displaying order
    const [contentData, setContentData] = useState([])

    const { id } = useParams()
    const { notesArray, notesContentArray, setNotesArray, addNoteContent,  } = noteData()

    const navigate = useNavigate()

    const getNote = (noteId) => {
        const noteFound = notesArray.find(
            (note) => note.id == parseInt(noteId)
        )
        setNote(noteFound)
        return noteFound
    }

    const fetchNoteContent = async (noteId) => {
        console.log('start fetch')
        try {
            const response = await getRequest(`/note-manager/get-note-content?noteId=${noteId}`)
            if (response.noteContent) {
                response.noteContent.isSync = true
                response.noteContent.latestSync = Date.now()
                addNoteContent(id, response.noteContent)
                setContent({ ...response.noteContent })
            }
        } catch (error) {
            console.log('catch:', error)
        }
    }

    // sort contentData
    // display contentData

    useEffect(() => {
        getNote(id)
        console.log(!notesContentArray.some(note => note.noteId == id), (notesContentArray.length >= 0 || !notesContentArray.some(note => note.noteId == id)))
        if (notesContentArray.length <= 0 || !notesContentArray.some(note => note.noteId == id)) {
            setLoading(false)
            console.log('fetch')
            fetchNoteContent(id)
            // setContentData

        } else if (notesContentArray.length >= 0 || notesContentArray.some(note => note.noteId == id)) {
            setLoading(false)
            // setContentData
            console.log(content)
        }
    }, [id])
    
    return (
        <>
            {
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
                                <div className="d-flex">
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
        </>
    );
};

export default NotePage
