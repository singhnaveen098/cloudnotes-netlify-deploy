import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem'
import { useHistory } from 'react-router-dom'

function Notes(props) {
    const context = useContext(NoteContext)
    let history = useHistory()
    const { notes, fetchnote, editnote } = context
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchnote()
        }
        else {
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const ref = useRef(null)
    const refclose = useRef(null)
    const updatenote = (currentnote) => {
        ref.current.click()
        setnote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })
    }
    const handleclick = (e) => {
        editnote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click()
        props.showalert('Note updated successfully', 'success')
    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
                Launch edit modal
            </button>
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary text-gray-600" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary text-sky-600" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <h1 className='text-2xl font-bold'>Your Notes :</h1>
                {notes.length === 0 && "No notes to display."}
                <div className="row my-3">
                    {notes.map((note) => {
                        return <Noteitem key={note._id} updatenote={updatenote} note={note} showalert={props.showalert} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
