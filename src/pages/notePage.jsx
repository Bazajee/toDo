import React, { useState, useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { noteData } from "../appState/noteData"
import { postRequest, getRequest } from "../apiService/requestToBack"
import { useNavigate } from "react-router-dom"
import TextBlock from "../components/TextBlock"

const NotePage = () => {
    const [note, setNote] = useState({})
    const [newNoteTitle, setNewNoteTitle] = useState("")
    const [loading, setLoading] = useState(true)
    // Is object with content data of the relative note 
    const [content, setContent] = useState({})
    // Is list of block (list or text) in displaying order
    const [contentData, setContentData] = useState([])

    const { id } = useParams()
    const { notesArray, notesContentArray, setNotesArray, addNoteContent, updateTextContent } = noteData()

    const navigate = useNavigate()

    const getNote = (noteId) => {
        const noteFound = notesArray.find(
            (note) => note.id == parseInt(noteId)
        )
        setNote(noteFound)
        return noteFound
    }

    const fetchNoteContent = async (noteId) => {
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

    function initContentData (contentObject) {
        let blocks=[]
        if ("textBlock" in contentObject) {
            const textBlock = contentObject.textBlock.map(element => {
                return {...element, type: "text"}
            })
            blocks =  [...blocks, ...textBlock]
        }
        if ("listBlock" in contentObject) {
            const listBlock = contentObject.listBlock.map(element => {
                return {...element, type: "list"}
            });
            blocks = [...blocks, ...listBlock]
        }
        const sortedBlocks = blocks.sort((a, b) => a.placeNumber - b.placeNumber)
        setContentData(sortedBlocks)
    }


    // Run in textBlock component 
    const updateTextBlock = async (blockId, newData) => {
        
        const update = await postRequest("/note-manager/update-text",
            {
                blockId: blockId,
                noteContent: {
                    textData: newData
                }
            }
        )
        updateTextContent(update)
        // initContentdata here because useEffect on content won't run (reactivity without setFunction)
        initContentData(content)
    }



    useEffect(() => {
        
        getNote(id)
        if (notesContentArray.length >= 0 && !notesContentArray.some(note => note.noteId == id)) {
            setLoading(false)
            fetchNoteContent(id)
        } else if (notesContentArray.length >= 0 && notesContentArray.some(note => note.noteId == id)) {
            setLoading(false)
            setContent(notesContentArray.find(note => note.noteId == id))
            
        }
    }, [id])

    useEffect( () => {
        // Why is not trigger when updateTextBlockRun ? 
        initContentData(content)
        
    }, [content])
    
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
                                        {
                                            contentData.map( block => {
                                                    if (block.type == 'text') {
                                                        return <TextBlock 
                                                            key={block.id} 
                                                            blockId={block.id} 
                                                            textData={block.text} 
                                                            updateTextBlock={updateTextBlock} 

                                                        />
                                                    }
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default NotePage
