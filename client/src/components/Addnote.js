import React, { useContext, useState, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext'

function Addnote(props) {
    const context = useContext(NoteContext)
    const { addnote } = context
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const refadd = useRef(null)
    const refcloseadd = useRef(null)
    const handleclick = (e) => {
        e.preventDefault()
        addnote(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
        refcloseadd.current.click()
        props.showalert('Note Added successfully', 'success')
    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button ref={refadd} type="button" className="mt-4 btn btn-primary text-sky-600 font-bold" data-bs-toggle="modal" data-bs-target="#addModal">
                Add Note
            </button>
            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addModalLabel">Add a Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refcloseadd} type="button" className="btn btn-secondary text-gray-600" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn btn-primary text-sky-600" onClick={handleclick}>Add Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addnote
