import React, { useState, useContext, useEffect, useRef }  from "react"

const CreateTextBlock = ({createTextBlock, isDisplay, noteId, setDisplayAddText }) =>{

    const [textData, setTextData] = useState("")
    const refTextData = useRef(null)

    const sendUpdatechange = () => {
        if (intialData != textData) {
            intialData = textData
            updateTextBlock(blockId, textData)
        }
    }

    const handleTextDataChange = (e) => {
            setTextData(e.target.value)
    }
    const launchNewTextBlock = async  () => {
        await createTextBlock(noteId, textData)
        setDisplayAddText(false)
        setTextData('')
        
    } 

    useEffect(() => {
        refTextData.current.focus()
      }, [isDisplay])

    return (
        <>
        {
            <div className="container">
                <textarea
                    ref={refTextData}
                    className="w-100 p-2"
                    value={textData}
                    onChange={handleTextDataChange}
                    onBlur={launchNewTextBlock}
                    style={{
                        height: "33vh",
                        display: isDisplay ? 'block' : 'none'
                    }}
                />
            </div>
        }
       </>
    ) 
}
export default CreateTextBlock
