import React, { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useAuth } from '../appState/authData'
import { noteData } from '../appState/noteData'


const NotePage = () => {
    const [ note, setNote ] = useState({})
    const [loading, setLoading] = useState(true)

    const { id } = useParams()
    const { user, setUser, login } = useAuth()
    const { notesArray, setNotesArray, initNotes } = noteData()

    const getNote = (noteId) => { 
		const noteFound = notesArray.find(note => note.id == parseInt(noteId))
        setNote(noteFound)
		return noteFound
	}

    useEffect(
          () =>  {
            getNote(id)
            setLoading(false)
    },[id, notesArray])

    return (
        <>
            <div id="test" className='container'>
                
                {/* <div >
                    <div className="d-flex justify-content-start align-items-center" >
                        <h1 className="text-truncate" style={{ margin: 0 }} >{note.title+note.title}</h1>
                        <p >{id}</p>
                    </div>
                    <div>
                    </div>
                </div>
                <div className='container'>
                    <div className='row'/>
                </div> */}


                <div id="test" className='container'>
                    {loading ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <div>
                            <div className="d-flex justify-content-start align-items-center">
                                <h1 className="text-truncate" style={{ margin: 0 }}>{note.title || "Note Title"}</h1>
                                <p>{id}</p>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

}

export default NotePage