import React, { useState, useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { noteData } from "../appState/noteData"
import { postRequest, getRequest } from "../apiService/requestToBack"
import { useNavigate } from "react-router-dom"
import TextBlock from "../components/TextBlock"
import CreateTextBlock from "../components/CreateTextBlock"
import { useSpring, animated } from 'react-spring'

const NotePage = () => {
    const [note, setNote] = useState({})
    const [newNoteTitle, setNewNoteTitle] = useState("")
    const [loading, setLoading] = useState(true)
    // Is object with content data of the relative note 
    const [content, setContent] = useState({})
    // Is list of block (list or text) in displaying order
    const [contentData, setContentData] = useState([])
    const [displayAddButton, setDisplayAddButton] = useState(false)
    const [displayAddText, setDisplayAddText] = useState(false)
    const lastClickTimeAdd = useRef(Date.now())
    const animationProps = useSpring({ opacity : displayAddButton ? 1 : 0 })

    const { id } = useParams()
    const { notesArray, 
        notesContentArray,
        setNotesArray, 
        addNoteContent, 
        updateTextContent, 
        addTextContent 
    } = noteData()

    const navigate = useNavigate()

    const toggleAddButton = () => {
        const currentTime = Date.now();
        if (currentTime - lastClickTimeAdd.current > 150) {
          setDisplayAddButton(prevState => !prevState)
          lastClickTimeAdd.current = currentTime
        }
    }

    const toggleAddText = () => {
        const currentTime = Date.now();
        if (currentTime - lastClickTimeAdd.current > 150) {
            setDisplayAddText(!displayAddText)
            // close AddList
            lastClickTimeAdd.current = currentTime
        }
    }

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
    
    const createTextBlock = async (noteId, data) => {
        const response = await postRequest("/note-manager/create-content", 
            {
                "noteId":noteId,
                "place":contentData.length,
                "noteContent": {
                    "textData": data
                }
            }
        )
        addTextContent(response)
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
        initContentData(content)
        
    }, [content])
    
    return (
        <>
            {
                <div id="test" className="container p-0">
                    <div  className=" ">
                        {loading ? (
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        ) : (
                                <div>
                                    <div className="container m-0 p-0 d-flex justify-content-start align-items-start">
                                        <div className="d-flex col" >
                                            <div className="col-9 d-flex">
                                                <h1
                                                    className="text-truncate justify-content-start"
                                                    style={{ margin: 5 }}
                                                >
                                                    {note.title || "Note Title"}
                                                </h1>
                                                <p>{note.id}</p>
                                            </div>
                                            <div className=" col-3 d-flex justify-content-end">                                            
                                                <button 
                                                    className="btn btn-block d-flex"
                                                    onClick={toggleAddButton}
                                                >
                                                    <img
                                                        src={
                                                            displayAddButton ? "/src/assets/reduce.svg" : "/src/assets/add.svg"
                                                        }
                                                        style={{ width: "30px", height: "30px" }}
                                                        alt="openAdd"                                            
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: displayAddButton ? 'block' : 'none',
                                        }}
                                    >
                                        <animated.div style={animationProps}>
                                            <div                             
                                                className="container p-0 d-flex"
                                            >
                                                <div className="col-6 d-flex justify-content-center ">
                                                    <button 
                                                        className="btn w-100 btn-block d-flex justify-content-center align-items-center bg-yellow m-2"
                                                        onClick={toggleAddText}
                                                    >
                                                        <img
                                                            src="/src/assets/text.svg"
                                                            style={{ width: "25px", height: "25px" }}
                                                            alt="openAdd"                                            
                                                        />
                                                    </button>
                                                </div>
                                                <div 
                                                    
                                                    className="col-6 d-flex justify-content-center">
                                                    <button 
                                                        className="btn w-100 btn-block d-flex justify-content-center align-items-center bg-yellow m-2"
                                                        disabled = {true}
                                                    >
                                                        <img
                                                            src="/src/assets/list-check.svg"
                                                            style={{ width: "30px", height: "30px" }}
                                                            alt="openAdd"                                            
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </animated.div >
                                    </div>
                                    <div>
                                        <CreateTextBlock
                                            noteId={id}
                                            createTextBlock={createTextBlock}
                                            isDisplay={displayAddText}
                                            setDisplayAddText={setDisplayAddText}
                                        />
                                    </div>
                                    <div className="">
                                        {
                                            contentData
                                            .slice()
                                            .reverse()
                                            .map( block => {
                                                    if (block.type == 'text' && block.isDeleted == false) {
                                                        return <TextBlock 
                                                            key={block.id} 
                                                            blockId={block.id} 
                                                            textData={block.text}
                                                            initContentData={initContentData}
                                                            content={content}
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
