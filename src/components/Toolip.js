import React from 'react'

const Toolip = ({message}) => {
    return (
        <div className="toolip__container">
            <div className="toolip__message">
                <p className="toolip__message-text">{message}</p>
            </div>
        </div>
    )
}

export default Toolip