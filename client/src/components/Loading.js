import React from 'react'
import loading from '../data/giphy.gif'

export const Loading = () => {
    return (
        <div>
            <img src={loading} className="loading" />
        </div>
    )
}
