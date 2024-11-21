import React, { useState, useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { noteData } from "../appState/noteData"
import { postRequest, getRequest } from "../apiService/requestToBack"
import { useNavigate } from "react-router-dom"

const NotePage = () => {
    const [note, setNote] = useState({})
    const [newNoteTitle, setNewNoteTitle] = useState("")
    // const [newNote, setNewNote] = useState({});
    const [loading, setLoading] = useState(true)
    const refNewNoteTitle = useRef(null)
    const [content, setContent] = useState({})

    const { id } = useParams();
    // const { user, setUser, login } = useAuth();
    const { notesArray, setNotesArray, addNoteContent, notesContentArray } = noteData()
    const navigate = useNavigate();

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
                console.log(response.noteContent)
                addNoteContent(id, response.noteContent)
                setContent({ ...response.noteContent });
                // console.log(response.noteContent)
            }
        console.log('after fetch',content)
        } catch (error) {
            console.log('catch:', error)
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
            setNewNoteTitle("");
        }
    };

    const handleTextChange = (e) => {
        setNewNoteTitle(e.target.value);
    };

    useEffect(() => {
        if (id) {
            getNote(id)
            fetchNoteContent(id)
            // setLoading(false)
        } else {
            refNewNoteTitle.current.focus();
        }
    }, [id])
    useEffect(() => {
        if (content.textBlock)
            setLoading(false)
            console.log('Updated content:', content);
            // console.log('Updated content:', content.textBlock[0].text);

    }, [content]);
    
    // console.log('content->',content)

    return (
        <>
            {!id ? (
                // create
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
                                createNewNote()
                                // add content creation logic and displaying.  -> create textblock and listBlock component 
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
                                <div className="d-flex">
                                    {/* <p>{ content.textBlock[0].text }</p> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default NotePage;
