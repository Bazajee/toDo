import React, { useState, useContext, useEffect, useRef }  from "react"
import { postRequest, getRequest } from "../apiService/requestToBack"
import { noteData } from "../appState/noteData"

const TextBlock = ({
    textData: intialData, 
    blockId: blockId,
    initContentData, 
    content}) =>{

    const [textData, setTextData] = useState(intialData)
    const refTextData = useRef(null)
    const [focusOn, setFocusOn] = useState(false)
    const { 
        removeTextBlock, 
        updateTextContent 
    } = noteData()

    const sendUpdatechange = () => {
        if (intialData != textData) {
            intialData = textData
            updateTextBlock(blockId, textData)
        }
        setFocusOn(false)
    }

    const handleTextDataChange = (e) => {
            setTextData(e.target.value)
    }

    const focusOnTrue = () => {
        setFocusOn(true)
    }
    
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
        initContentData(content)
    }

    //
    const deleteTextBlock= async (textBlockId) => {
        const response = await getRequest(`/note-manager/delete-text-block?noteId=${textBlockId}`)
        if (response.id == textBlockId){
            removeTextBlock(response)
            initContentData(content)
        }
    }

    useEffect(() => {
        if (focusOn && refTextData.current) {
            const element = refTextData.current
            element.focus()
            const length = element.value.length
            element.setSelectionRange(length, length)
        }
      }, [focusOn]);

    return (
        <>
        { focusOn ? (
            <div className="justify-content-start">
                <textarea
                    ref={refTextData}
                    className="w-100 p-2"
                    value={textData}
                    onChange={handleTextDataChange}
                    onBlur={sendUpdatechange}
                    style={{
                        height: "33vh",
                    }}
                />
            </div>
            ) : (
                <div className="d-flex container-fluid p-0 w-100 m-2 p-2 bg-grey rounded ">
                    <div className="w-100 d-flex">
                        <p
                            className="text-start"
                            onClick={focusOnTrue}
                            style={{
                                whiteSpace: "pre-line",
                            }}
                        >
                            { intialData }
                        </p>
                    </div>
                    <div className=" d-flex justify-content-end align-items-start">
                        <button 
                            type="deleteButton" 
                            className="btn  d-flex"
                            onClick={()=>{deleteTextBlock(blockId)}}
                        >
                            <img
                                className=""
                                src="/src/assets/delete.svg"
                                style={{ width: "30px", height: "30px" }}
                            ></img>
                        </button>
                    </div>
                </div>
            )
        }
       </>
    ) 
}
export default TextBlock