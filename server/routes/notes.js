const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')

//Route 1:
//fetch all notes of a user using get/api/notes/fetchallnotes.login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Notes.find({userid: req.user.id})
        res.json(notes)
    }//catch the error
     catch (error) {
        console.error(error.message)
        res.status(500).send('INTERNAL SERVER ERROR')
    }
})

//Route 2:
//Add notes of a user using post/api/notes/addnote .login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res)=>{
    const {title, description, tag} = req.body
    //return bad request for validation error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = await Notes.create({
            title,
            description,
            tag,
            userid : req.user.id
        })
        res.json(note)
    }//catch the error 
    catch (error) {
        console.error(error.message)
        res.status(500).send('INTERNAL SERVER ERROR')
    }
})

//Route 3:
//Update notes of a user using put/api/notes/updatenote .login required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body
    const newnote = {}
    if(title){newnote.title = title}
    if(description){newnote.description = description}
    if(tag){newnote.tag = tag}
    try {
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if(note.userid.toString()!==req.user.id){return res.status(401).send("Not Allowed")}
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
        res.json(note)
    }//catch the error 
    catch (error) {
        console.error(error.message)
        res.status(500).send('INTERNAL SERVER ERROR')
    }
})

//Route 4:
//Delete notes of a user using delete/api/notes/deletenote .login required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try {
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if(note.userid.toString()!==req.user.id){return res.status(401).send("Not Allowed")}
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({status:"Note has been deleted", note: note})
    }//catch the error 
    catch (error) {
        console.error(error.message)
        res.status(500).send('INTERNAL SERVER ERROR')
    }
})

//Route 5:
//Delete all notes of a user using delete/api/notes/deleteallnotes.login required
router.delete('/deleteallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Notes.deleteMany({userid: req.user.id})
        res.json(notes)
    }//catch the error
     catch (error) {
        console.error(error.message)
        res.status(500).send('INTERNAL SERVER ERROR')
    }
})

module.exports = router
