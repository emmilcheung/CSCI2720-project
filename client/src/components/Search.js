import React, { useState } from 'react'

export const Search = ({ search, display}) => {
    const initialState = {
        event_summary: "",
        event_location: "",
        event_org: "",
        event_desc: "",
        year: "",
        month: "",
        day: "",
    }
    const [state, setState] = useState(initialState)

    const submitQuery = () => {
        var obj = {
            event_summary: state.event_summary,
            event_location: state.event_location,
            event_org: state.event_org,
            event_desc: state.event_desc,
            event_date: `${state.year} ${state.month} ${state.date? ("0" + state.day).slice(-2): ""}`
        }
        search(obj)
        // setState(initialState)
    }

    return (
        <div className={display? "search-form": "search-form hide"}>
            <h2>Search event
            </h2>
            <small>Just leave it blank for any.</small>
            <div className="span8 page my-4 mx-auto" style={{ width: "60vw" }}>
                <div className="gb_form">
                    <div className="form-group row">
                        <label htmlFor="search-summary" className="col-sm-2 col-form-label">Summary</label>
                        <div className="col-sm-10">
                            <input id="search-summary" name="summary" type="text" className="form-control" placeholder="Summary"
                                value={state['event_summary']} onChange={e => setState({ ...state, event_summary: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="search-location" className="col-sm-2 col-form-label">Location</label>
                        <div className="col-sm-10">
                            <input id="search-location" name="location" type="text" className="form-control" placeholder="Location"
                                value={state['event_location']} onChange={e => setState({ ...state, event_location: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="search-orginazer" className="col-sm-2 col-form-label">Organizer</label>
                        <div className="col-sm-10">
                            <input id="search-orginazer" name="orginzaer" type="text" className="form-control" placeholder="Organizer"
                                value={state['event_org']} onChange={e => setState({ ...state, event_org: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="inputDate">Date</label>
                        <div className="col-sm-4">
                            <select id="year" name="year" className="form-control "
                                onChange={e => setState({ ...state, year: e.target.value })}
                            >
                                <option value="">Year</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                            </select>

                        </div>
                        <div className="col-sm-3">
                            <select id="month" name="month" className="form-control"
                                onChange={e => setState({ ...state, month: e.target.value })}
                            >
                                <option value="">Month</option>
                                <option value="Jan">1</option>
                                <option value="Feb">2</option>
                                <option value="Mar">3</option>
                                <option value="Apr">4</option>
                                <option value="May">5</option>
                                <option value="Jun">6</option>
                                <option value="Jul">7</option>
                                <option value="Aug">8</option>
                                <option value="Sep">9</option>
                                <option value="Oct">10</option>
                                <option value="Nov">11</option>
                                <option value="Dec">12</option>
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <select id="day" name="day" className="form-control"
                                onChange={e => setState({ ...state, day: e.target.value })}
                            >
                                <option value="">Day</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="search-description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <input id="search-description" name="description" type="text" className="form-control" placeholder="Description"
                                value={state['event_desc']} onChange={e => setState({ ...state, event_desc: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="controls">
                        <input type="submit" value="Search event" className="btn btn-primary"
                            onClick={submitQuery}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
