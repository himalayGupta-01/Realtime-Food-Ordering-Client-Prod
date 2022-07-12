import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
    return (
        <>
            <section className="error">
            <div id="notfound">
                <div className="notfound">
                    <div className=" notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>We are sorry, page not found.</h2>
                    <p>
                    The page you are looking for might have been removed, had its name changed or is     temporarily unavailable
                    </p>
                    <NavLink className="nav-link inline-block mt-6 px-4 py-2 rounded-full " id="error-btn" to="/">Back to Homepage</NavLink>
                </div>
            </div>
            </section>
        </>
    )
}

export default Error
