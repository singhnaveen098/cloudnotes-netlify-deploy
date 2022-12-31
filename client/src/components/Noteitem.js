import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

function Noteitem(props) {
    const context = useContext(NoteContext)
    const { deletenote } = context
    const { note, updatenote } = props
    return (
        <div className="col-md-4">
            <div className="card m-3 border-gray-400 shadow-lg rounded-xl">
                <div className="card-body">
                    <h5 className="card-title w-10/12 font-bold text-xl">{note.title}</h5>
                    <div className='absolute top-4 right-2'>
                        <i className="fa fa-trash-o mx-2 justify-content-end cursor-pointer" onClick={() => { deletenote(note._id); props.showalert('Note deleted successfully', 'success') }}></i>
                        <i className="fa fa-pencil-square-o mx-2 justify-content-end cursor-pointer" onClick={() => { updatenote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
