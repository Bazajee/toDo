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