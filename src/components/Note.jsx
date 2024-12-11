import React from "react"
import { useNavigate } from "react-router-dom"
import { postRequest, getRequest } from "../apiService/requestToBack"
import { noteData } from "../appState/noteData"

const HomeNote = ({ note, loading, setLoading }) => {
    const navigate = useNavigate()
    const {  deleteNote } = noteData()


    const clickOnNote = (id) => {
        navigate(`/note/${id}`)
    }

    const deleteHomeNote = async (noteId) => {
        setLoading(true)
        const deleteResponse = await getRequest(`/note-manager/delete-note?noteId=${noteId}`)
        if (deleteResponse){
            deleteNote(noteId)
        }
        setLoading(false)
    }

    return (
        <div className="container-fluid d-flex m-0 p-0 text-truncate bg-grey rounded">
            <div
                className="constainer-fluid w-100 justify-content-start  p-0 text-truncate "
                onClick={() => {
                    clickOnNote(note.id);
                }}
            >
                <h3 className="text-truncate ms-1 me-1 d-flex justify-content-start ">{note.title}</h3>
                <p className="text-truncate ms-1 me-1 d-flex justify-content-start ">{note.creationDate} </p>
            </div>
            <div className=" d-flex justify-content-end align-items-start">
                <button 
                    type="deleteButton" 
                    className="btn  d-flex"
                    onClick={() =>{deleteHomeNote(note.id)}}
                >
                    <img
						className=""
                        src="src/assets/delete.svg"
                        style={{ width: "30px", height: "30px" }}
                    ></img>
                </button>
            </div>
        </div>
    )
}

export default HomeNote
