import React, { useState } from 'react'

export const NewEventModel = (props) => {
    // t const origin = "http://csci2720-g20.cse.cuhk.edu.hk/"
    const origin = "/";
    // console.log(props)
    const initialState = {
        summary: "",
        location: "",
        org: "",
        desc: "",
        date: "",
    }

    const [state, setState] = useState(initialState)

    const submitNewEvent = () => {
        if (window.confirm("Summit this new event?")) {
            var data = {
                summary: state.summary,
                location: state.location,
                org: state.org,
                date: state.date,
                desc: state.desc,
            }
            console.log(data)
            fetch(`${origin}event`, {
                method: "post",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (res.status == 201) {
                        return res.json()
                    }
                    else {
                        setTimeout(() => {
                            alert("Somethings went wrong, please try again later")
                        }, 2000)

                    }
                })
                .then(data => {
                    document.querySelector('button.close-modal').click();
                    console.log(data)
                    setTimeout(() => {
                        alert("Successful")
                        props.history.push(`/event/${data.event_id}`)
                    }, 1000)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    return (
        <div className="modal fade bd-example-modal-lg" id="new-event-model" tabIndex="-1" role="dialog" aria-labelledby="new-event-modelLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="new-event-modelLabel">Create new event</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group row">
                            <label htmlFor="event-summary" className="col-form-label col-3">Event summary:</label>
                            <input type="text" className="form-control col-8" id="event-summary"
                                value={state.summary}
                                onChange={e => { setState({ ...state, summary: e.target.value }) }}
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="event-location" className="col-form-label col-3">Location:</label>
                            <input type="text" className="form-control col-8" id="event-location"
                                value={state.location}
                                onChange={e => { setState({ ...state, location: e.target.value }) }}
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="event-orginazer" className="col-form-label col-3">Organizer:</label>
                            <input type="text" className="form-control col-8" id="event-organizer"
                                value={state.org}
                                onChange={e => { setState({ ...state, org: e.target.value }) }}
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="event-date" className="col-form-label col-3">Date:</label>
                            <input type="text" className="form-control col-8" id="event-date"
                                value={state.date}
                                onChange={e => { setState({ ...state, date: e.target.value }) }}
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="event-description" className="col-form-label col-3">Description:</label>
                            <textarea className="form-control col-8" id="event-description"
                                value={state.desc}
                                onChange={e => { setState({ ...state, desc: e.target.value }) }}
                            ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary close-modal" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" onClick={submitNewEvent}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
