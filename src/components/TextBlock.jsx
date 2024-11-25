import React, { useState, useContext, useEffect, useRef }  from "react"

const TextBlock = ({textData: intialData, blockId: blockId, updateTextBlock}) =>{

    const [textData, setTextData] = useState(intialData)
    const refTextData = useRef(null)
    const [focusOn, setFocusOn] = useState(false)

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

    return (
        <>
        { focusOn ? (
                <textarea
                    className="w-100 "
                    value={textData}
                    onChange={handleTextDataChange}
                    onBlur= {sendUpdatechange}
                    style= {{
                        overflow: "hidden",
                        height: "33vh" 
                    }}
                />
            ) : (
                <p
                    className="w-100 "
                    onClick={focusOnTrue}
                    value={textData}
                >
                    { intialData }
                </p>
            )
        }
       </>
    ) 
}
export default TextBlock