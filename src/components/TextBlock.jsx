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
            ) : (
                <p
                    className="w-100 p-2 bg-grey rounded justify-content-start align-content-start "
                    onClick={focusOnTrue}
                    // value={textData}
                    style={{
                        whiteSpace: "pre-line",
                    }}
                >
                    { intialData }
                </p>
            )
        }
       </>
    ) 
}
export default TextBlock