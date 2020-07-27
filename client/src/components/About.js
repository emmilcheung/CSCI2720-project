import React from 'react'
import schemaJPG from '../data/schema.jpg'

export const About = () => {
    return (
        <div>
            <section>
                <h2>About This Project</h2>
                <p>
                    <h3>workload distribution</h3>
                    <p>
                        Cheung Tsz Ho: Web Page design and implementation, frontend-backend framework<br />
                            Sze Muk Hei  : Restful API implemention<br />
                                Yeung Ching Fung: Restful API implemention<br />
                    </p>
                    <h2>how-to</h2>
                    <p>
                        <h4>frontend</h4>
                        <p>
                            <ul>
                                <li><h5>React</h5></li>
                                <li><h5>React-router</h5></li>
                                <li><h5>React-hooks</h5></li>
                                <li><h5>Ajax</h5></li>
                            </ul>
                        </p>
                        <h4>backend</h4>
                        <p>
                            we use mongodb, and built an restful api to receive requests from frontend and functions to CRUD the database for frontend developer to call
            </p>
                    </p>
                    <h3>Design of Data schema and model</h3>
                    <img src={schemaJPG} width="50%" height="auto"/>
                    <p>we have read this article carefully: <a href="http://www.cuhk.edu.hk/policy/academichonesty">http://www.cuhk.edu.hk/policy/academichonesty</a></p>


                </p>
            </section>
        </div>
    )
}
