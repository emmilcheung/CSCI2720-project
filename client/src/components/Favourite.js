import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Loading } from './Loading'
// import data from '../data/events.json'

import './DashBoard.css'

export const Favourite = (props) => {

    // const origin = "http://csci2720-g20.cse.cuhk.edu.hk/";
    const origin = "/";
    const userId = props.userId;
    const initialState = {
        events: [],
        loading: false,
    }
    const [state, setState] = useState(initialState)
    const [toggle, setToggle] = useState(false)
    
    const pageSize = 20;
    
    
    useEffect(() => {
        async function fetchEvents() {
            var result;
            setState({ ...state, loading: true })
            await fetch(`${origin}favourite/${userId}`)
            .then(res => res.json())
            .then(data => {
                setState({
                    ...state,
                    events: data.map(ele => ele.event),
                })
            })
        }
        if(props.userId)
            fetchEvents()
    }, [toggle])
    
    const testHistory = (id) => {
        props.history.push(`/event/${id}`)
    }
    
    const removeFavourite = async (eventId) => {
        await fetch(`${origin}favourite/${userId}?eventid=${eventId}`, {
            method: "DELETE"
        })
        .then(res => {
            if (res.status == 202) {
                alert("Event is removed from favourite list")
                setToggle(!toggle)
            }
        })
    }
    
    if (!props.isLogin) {
        return <Redirect to="/login" />
    }
    
    if (state.loading) {
        return <Loading />
    }
    
    return (
        <>
            <h1>Your favourite list <small style={{ float: "center" }}>Welcome {"User A"}</small></h1>
            {
                state.events.length ?
                    (<>
                        <table className="table table-striped mt-3">
                            <thead>
                                <tr>
                                    <th>Summary</th>
                                    <th>Location</th>
                                    <th>Organizer</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.events
                                        .map((event, index) => {

                                            // if (event['event_id'] == match.params.eventId){
                                            return (
                                                <tr key={index}
                                                    onDoubleClick={() => testHistory(event['event_id'])}>
                                                    <td><b>{event['event_summary'].length > 40 ? `${event['event_summary'].slice(0, 40)} ...` : event['event_summary']}</b></td>
                                                    <td>{event['event_location'].length > 40 ? `${event['event_location'].slice(0, 40)} ...` : event['event_location']}</td>
                                                    <td>{event['event_org'].length > 40 ? `${event['event_org'].slice(0, 40)} ...` : event['event_org']}</td>
                                                    <td>{event['event_date'].length > 30 ? `${event['event_date'].slice(0, 40)} ...` : event['event_date']}</td>
                                                    <td>{event['event_desc'].length > 30 ? `${event['event_desc'].slice(0, 40)} ...` : event['event_desc']}</td>
                                                    <td></td>
                                                    <td><i className="fas fa-trash"
                                                        onClick={() => removeFavourite(event['event_id'])}
                                                    ></i></td>
                                                </tr>
                                            )

                                        })
                                }
                            </tbody>
                        </table>
                    </>)
                    : <h3 className="my-5">You currently not favourite event.</h3>
            }
        </>
    )
}
