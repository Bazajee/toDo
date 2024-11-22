import React from "react"

const TextBlock = ({textData}) =>{


    return (
        <textarea
            readOnly
            className="w-100 "
            value={textData}
            style={{
                overflow: "hidden",
                height: "33vh" 
            }}
    
        >{{ textData }}</textarea>
    )


}
export default TextBlock