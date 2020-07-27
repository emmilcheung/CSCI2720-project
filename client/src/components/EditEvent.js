import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { Loading } from './Loading'

export const EditEvent = (props) => {
    // const origin = "http://csci2720-g20.cse.cuhk.edu.hk/"
    const origin = "/";
    // var event = data.find(ele => ele['event_id'] === parseInt(props.match.params.eventId));
    const initialState = {
        event_summary: "",
        event_location: "",
        event_org: "",
        event_desc: "",
        event_date: "",
        loading: false,
    }

    const [state, setState] = useState(initialState)

    useEffect(() => {
        async function fetchEvents() {
            var result;
            setState({ ...state, loading: true })
            await fetch(`${origin}event/${props.match.params.eventId}`)
                .then(res => res.json())
                .then(data => {
                    setState({
                        ...state,
                        event_summary: data.event_summary,
                        event_location: data.event_location,
                        event_org: data.event_org,
                        event_desc: data.event_desc,
                        event_date: data.event_date,
                        loading: false,
                    })
                })
        }
        fetchEvents()
    }, [])

    const submitChangedEvent = () => {
        if (window.confirm("Summit this change?")) {
            var data = {
                summary: state.event_summary,
                location: state.event_location,
                org: state.event_org,
                date: state.event_date,
                desc: state.event_desc,
            }
            console.log(data)
            fetch(`${origin}event/${props.match.params.eventId}`, {
                method: "put",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (res.status == 202) {
                        return res.json()
                    }
                    else {
                        setTimeout(() => {
                            alert("Somethings went wrong, please try again later")

                        }, 2000)
                        throw new Error("nothing");
                    }
                })
                .then(data => {
                    console.log(data)
                    setTimeout(() => {
                        props.history.push(`/event/${props.match.params.eventId}`)
                    }, 1000)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }


    if (!props.isLogin) {
        return <Redirect to="/login" />
    }

    if (state.loading) {
        return <Loading />
    }

    return (
        <div className="px-0 w-80">
            <Link to={`/event/${props.match.params.eventId}`}><b>Back to event</b></Link>
            <div className="event-details my-5">
                <div className="form-group row">
                    <label htmlFor="event-summary" className="col-form-label col-sm-3"><b>Event summary:</b></label>
                    <input type="text" className="form-control col-sm-9" id="event-summary"
                        value={state.event_summary}
                        onChange={e => { setState({ ...state, event_summary: e.target.value }) }}
                    />
                </div>
                <div className="form-group row">
                    <label htmlFor="event-location" className="col-form-label col-sm-3"><b>Location:</b></label>
                    <input type="text" className="form-control col-sm-9" id="event-location"
                        value={state.event_location}
                        onChange={e => { setState({ ...state, event_location: e.target.value }) }}
                    />
                </div>
                <div className="form-group row">
                    <label htmlFor="event-orginazer" className="col-form-label col-sm-3"><b>Organizer:</b></label>
                    <input type="text" className="form-control col-sm-9" id="event-organizer"
                        value={state.event_org}
                        onChange={e => { setState({ ...state, event_orginazer: e.target.value }) }}
                    />
                </div>
                <div className="form-group row">
                    <label htmlFor="event-date" className="col-form-label col-sm-3"><b>Date:</b></label>
                    <input type="text" className="form-control col-sm-9" id="event-date"
                        value={state.event_date}
                        onChange={e => { setState({ ...state, event_date: e.target.value }) }}
                    />
                </div>
                <div className="form-group row">
                    <label htmlFor="event-description" className="col-form-label col-sm-3"><b>Description:</b></label>
                    <textarea className="form-control col-sm-9" id="event-description" rows="4"
                        value={state.event_desc}
                        onChange={e => { setState({ ...state, event_desc: e.target.value }) }}
                    ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary"
                        onClick={submitChangedEvent}
                    >Change</button>
                </div>
            </div>
        </div >
    )
}
