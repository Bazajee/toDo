import React, { useState, useContext, useEffect, useRef }  from "react"

const TextBlock = ({textData: intialData, blockId: blockId, updateTextBlock}) =>{

    const [textData, setTextData] = useState(intialData)
    const refTextData = useRef(null)

    const sendUpdatechange = () => {
        console.log((intialData !=  textData))
        if (intialData != textData) {
            intialData = textData
            updateTextBlock(blockId, textData)
        }
        console.log(intialData)
    }

    const handleTextDataChange = (e) => {
            setTextData(e.target.value)

        
    }

    return (
        <textarea
            // readOnly
            className="w-100 "
            value={textData}
            onChange={handleTextDataChange}
            onBlur= {sendUpdatechange}
            style= {{
                overflow: "hidden",
                height: "33vh" 
            }}
        />
    ) 
}
export default TextBlock