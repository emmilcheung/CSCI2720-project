import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { NewEventModel } from './NewEventModel'
import { PageButton } from './PageButton'
import { Search } from './Search'
import { Loading } from './Loading'
// import data from '../data/events.json'

import './DashBoard.css'

export const DashBoard = (props) => {
    // const origin = "http://csci2720-g20.cse.cuhk.edu.hk/"
    const origin = "/";
    var data = [];
    const initialState = {
        events: [],
        sort: 0,
        search: false,
        loading: false,
    }
    const [state, setState] = useState(initialState)
    const [toggle, setToggle] = useState(false)

    const pageSize = 20;


    useEffect(() => {
        async function fetchEvents() {
            var result;
            setState({ ...state, loading: true })
            await fetch(`${origin}event`)
                .then(res => res.json())
                .then(data => {
                    setState({ ...state, 
                        events: [...data], 
                        page: 1, 
                        loading: false, 
                        sort: 0,
                    })
                })
        }
        fetchEvents()
    }, [toggle])

    const pageRange = (page) => {
        var lower = (page - 1) * pageSize;
        var temp = []
        for (var i = lower; i < lower + pageSize; i++) {
            temp.push(i)
        }
        return temp
    }

    const changePage = (pageNum) => {
        setState({
            ...state,
            page: pageNum
        })
        props.history.push(`/${pageNum}`)
    }
    const testHistory = (id) => {
        props.history.push(`/event/${id}`)
    }

    const catagoryKey = ['event_id', 'event_summary', 'event_location', 'event_org']

    const sortByCatagory = (id) => {
        var target = 0
        if (state.sort == 0) {
            target = id;
        }
        else {
            if (state.sort != id) {
                target = id
            }
        }
        setState({
            ...state,
            sort: target,
        })
    }

    const searchWithParams = async (queryObj) => {
        setState({ ...state, loading: true })
        fetch(`${origin}event`)
            .then(res => res.json())
            .then(data => {
                var result = [...data]
                Object.keys(queryObj).forEach(key => {
                    var params = queryObj[key].split(' ')
                    params.forEach(element => {
                        result = result.filter(event => event[key].toLowerCase().includes(element.toLocaleLowerCase()))
                    });
                })
                setState({
                    ...state,
                    loading: false,
                    events: result,
                })
                props.history.push(`/1`)
            })
    }

    const flushEvent = () => {
        if(window.confirm("Are you sure to flush the database?")){
            fetch(`${origin}flush`)
                .then(res => {
                    if(res.status == 200){
                        setState({
                            ...state,
                            loading: true
                        })
                        setTimeout(() =>{
                            setToggle(!toggle)
                        }, 5000)
                    }
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
        <>
            <h1>Dashboard <small style={{ float: "center" }}>Welcome {"User A"}</small></h1>
            <p className="my-2">Events in total ({state.events.length})</p>
            <p className="my-2">Find your interested upcoming events in Hong Kong</p>
            <div className="justify-content-start">
                <button type="button" className="btn btn-success mr-3" data-toggle="modal" data-target="#new-event-model">New event</button>
                <button type="button" className="btn btn-danger mr-3"
                    onClick={flushEvent}
                >Flush Events</button>
                <button type="button" className="btn btn-outline-success mr-3" onClick={() => { setToggle(!toggle); props.history.push('/1') }}>
                    <i className="fas fa-sync-alt"></i>
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => setState({ ...state, search: !state.search })}>
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div className="justify-content-end">
            </div>
            <hr />
            <Search search={searchWithParams} display={state.search} />
            {
                state.events.length ?
                    (<>
                        <PageButton changePage={changePage} currentPage={parseInt(props.match.params.pageId)} eventSize={state.events.length} pageSize={pageSize} />
                        <table className="table table-striped mt-3">
                            <thead>
                                <tr>
                                    <th onClick={() => { sortByCatagory(1) }}>Summary</th>
                                    <th onClick={() => sortByCatagory(2)}>Location</th>
                                    <th onClick={() => sortByCatagory(3)}>Organizer</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.events
                                        .sort((a, b) => (!a[catagoryKey[state.sort]] || a[catagoryKey[state.sort]] > b[catagoryKey[state.sort]]) ? 1 : ((b[catagoryKey[state.sort]] > a[catagoryKey[state.sort]]) ? -1 : 0))
                                        .map((event, index) => {
                                            if (pageRange(parseInt(props.match.params.pageId)).includes(index)) {
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
                                                        <td></td>
                                                    </tr>
                                                )
                                            }
                                        })
                                }
                            </tbody>
                        </table>
                        <PageButton changePage={changePage} currentPage={parseInt(props.match.params.pageId)} eventSize={state.events.length} pageSize={pageSize} />
                    </>)
                    : <h1>No result is found.</h1>
            }
            <NewEventModel {...props} refresh={{ toggle: toggle, setToggle: setToggle }} />
        </>
    )
}
