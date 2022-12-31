import React from 'react'
import Addnote from './Addnote'
import Notes from './Notes'

function Home(props) {
    return (
        <div>
            <Addnote showalert={props.showalert}/>
            <Notes showalert={props.showalert}/>
        </div>
    )
}

export default Home
