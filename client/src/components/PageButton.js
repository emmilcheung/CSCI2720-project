import React, { useState } from 'react'

export const PageButton = ({ changePage, currentPage, eventSize, pageSize }) => {
    const [state, setState] = useState({ goto: "" })

    var pageNumber = Math.floor(eventSize / pageSize);
    if (eventSize % pageSize !== 0) {
        pageNumber += 1;
    }
    const pageArray = () => {
        var array = []
        for (var i = 1; i <= pageNumber; i++) {
            array.push(i)
        }
        return array
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (/^\+?\d+$/.test(state.goto) && parseInt(state.goto) <= pageNumber) {
                changePage(parseInt(state.goto))
            }
            setState({
                ...state,
                goto: ""
            })
        }
    }

    return (
        <div className="page-btn">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {!(currentPage < 5) &&
                        <>
                            <li className="page-item"><span className="page-link" onClick={() => changePage(1)}>1</span></li>
                            <li className="page-item"><span className="page-link">...</span></li>
                        </>
                    }
                    {
                        pageArray().map(page => {
                            if (page >= currentPage - 3 && page <= currentPage + 3) {
                                return (
                                    <li className="page-item" key={page}>
                                        <span className={currentPage === page ? "page-link current-page" : "page-link"}
                                            onClick={() => changePage(page)}
                                        >{page}
                                        </span>
                                    </li>
                                )
                            }
                        })
                    }
                    {(currentPage < pageNumber - 3) &&
                        <>
                            <li className="page-item"><span className="page-link">...</span></li>
                            <li className="page-item"><span className="page-link" onClick={() => changePage(pageNumber)}>{pageNumber}</span></li>
                        </>
                    }
                    <li className="page-item">
                        <input className="page-link page-input"
                            placeholder="Goto page"
                            value={state.goto}
                            onChange={(e) => setState({ ...state, goto: e.target.value })}
                            onKeyPress={handleKeyPress}
                        >
                        </input>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
