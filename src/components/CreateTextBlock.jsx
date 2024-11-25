import React, { useState, useContext, useEffect, useRef }  from "react"

const CreateTextBlock = () =>{

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

    useEffect(() => {
        refTextData.current.focus()
      }, [])

    return (
        <>
        {
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
        }
       </>
    ) 
}
export default CreateTextBlock
