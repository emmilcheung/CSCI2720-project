import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Loading } from './Loading'
import icon from '../data/null.jpg'

import './Event.css'

export const Event = (props) => {
    const userId = props.eventId
    // const origin = "http://csci2720-g20.cse.cuhk.edu.hk/"
    const origin = "/";
    const initialState = {
        userId: userId,
        eventDetails: {},
        comments: [],
        loading: false,
        isFavour: false,
    }


    const [state, setState] = useState(initialState);
    const [toggle, setToggle] = useState(true);
    const [comment, setComment] = useState("")
    console.log(props.userId)
    useEffect(() => {
        async function fetchEvents() {
            setState({ ...state, userId: props.eventId, loading: true })
            await fetch(`${origin}event/${props.match.params.eventId}`)
                .then(res => res.json())
                .then(details => {
                    // setState({ ...state, eventDetails: data})
                    fetch(`${origin}comment/${props.match.params.eventId}`)
                        .then(res => res.json())
                        .then(comments => {
                            if (props.userId) {
                                fetch(`${origin}favourite/${props.userId}`)
                                    .then(res => res.json())
                                    .then(favourList => {
                                        console.log(favourList)
                                        var tempList = favourList.filter(ele => ele.event.event_id == props.match.params.eventId);
                                        var isFavour = (tempList.length) ? true : false;
                                        setState({ ...state, eventDetails: details, comments: comments, isFavour: isFavour, loading: false })
                                    })
                            }
                            else {
                                setState({ ...state, eventDetails: details, comments: comments, loading: false })
                            }
                        })
                })
        }
        fetchEvents()
    }, [toggle])

    const submitDeleteEvent = () => {
        if (window.confirm("Are you sure to delete this event?")) {
            fetch(`${origin}favourite/${props.userId}?eventid=${props.match.params.eventId}`, {
                method: "DELETE",
            })
                .then(res => {
                    if (res.status == 202) {
                        console.log("hi?")
                        fetch(`${origin}event/${props.match.params.eventId}`, {
                            method: "DELETE"
                        })
                            .then(res2 => {
                                if (res2.status == 202) {
                                    // setToggle(!toggle)
                                    setTimeout(() => {
                                        alert("Successfully deleted");
                                    }, 1000)
                                    props.history.push('/')
                                }
                            })
                        //             return
                    }
                    else {
                        setTimeout(() => {
                            alert("Somethings went wrong, please try again later")
                        }, 1000)
                        throw new Error("nothing");
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const submitComment = () => {
        var data = {
            comment: comment
        }
        fetch(`${origin}comment/${props.match.params.eventId}/${props.userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status == 201) {
                    setToggle(!toggle)
                }
                else {
                    setComment("")
                }
            })
    }

    const addToFavourite = () => {
        if (!state.isFavour) {

            fetch(`${origin}favourite/${props.userId}/?eventid=${props.match.params.eventId}`, {
                method: "POST",
            })
                .then(res => {
                    if (res.status == 201) {
                        alert("This event is add to your favourite list");
                        setToggle(!toggle)
                    }
                })
        }
        else{
            fetch(`${origin}favourite/${props.userId}?eventid=${props.match.params.eventId}`, {
                method: "DELETE",
            })
              .then(res => {
                  if(res.status == 202){
                      alert("This event is remove from your favourite list")
                      setToggle(!toggle)
                  }
              })
        }
    }

    if (!state.eventDetails) {
        return <Redirect to="/" />
    }

    if (!props.isLogin) {
        return <Redirect to="/login" />
    }


    if (state.loading) {
        return <Loading />
    }

    return (
        <div>
            <Link to="/" ><b>back to dashboard</b></Link>
            <div className="event-details">
                <div className="row">
                    <h1 className="col-sm-9">{state.eventDetails['event_summary']}</h1>
                    <div className="event-btn col-sm-3 d-flex justify-content-end">
                        <i className={state.isFavour ? "fas fa-heart fa-2x text-danger" : "fas fa-heart fa-2x"}
                            onClick={addToFavourite}
                        ></i>
                            &nbsp;&nbsp;&nbsp;
                            <Link to={`/edit-event/${props.match.params.eventId}`}><i className="fas fa-edit fa-2x text-dark"></i></Link>
                            &nbsp;&nbsp;&nbsp;
                            <i className="fas fa-times fa-2x"
                            onClick={submitDeleteEvent}
                        ></i>
                    </div>
                </div>
                <hr />
                <ul>
                    <li><p><b>Organized by:</b> {state.eventDetails['event_org']}</p></li>
                    <li><p><b>Location</b> {state.eventDetails['event_location']}</p></li>
                    <li><p><b>Date:</b> {state.eventDetails['event_date']}</p></li>
                    <li><p><b>Description:</b> {state.eventDetails['event_desc']}</p></li>
                </ul>
            </div>
            <article>

            </article>
            <h5 className="mt-5">Comments</h5>
            <hr />
            <table style={{ width: "100%" }}>
                {
                    state.comments.map((comment, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <td width='200' valign='top' align='center' style={{ border: "4px solid #cccccc", backgroundColor: "#FFFFFF" }}>
                                        User
                                    <br />
                                        <a >{comment.user.username}</a>
                                        <br />
                                        <img className="roundrect" src={icon} width="150" height="150" />
                                    </td>
                                    <td valign='top' style={{ border: "4px solid #8cca77", backgroundColor: "#F4FEDE", borderTopLeftRadius: "50px", borderBottomRightRadius: "10px" }}>
                                        <div style={{ minHeight: "200px", maxWidth: "850px" }}>
                                            <p align='left'>#{index + 1}</p><span style={{ float: "right" }}>Posted on Date: {comment.comment_date.slice(0, 10)}</span>
                                            <hr />
                                            <p>{comment.comment_content}</p>
                                            <br />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <br />
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
            <div className="form-group mt-5">
                <textarea className="form-control" id="event-comment" rows="3" placeholder="Write your comment here"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                ></textarea>
                <button type="button" className="btn btn-primary" onClick={submitComment}>Add comment</button>
            </div>
        </div>
    )
}
