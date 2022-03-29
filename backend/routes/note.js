const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// Getting all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {

        const notes = await Notes.find({ user: req.user.id })
        // console.log(notes.map((ele)=>{
        //     return ele.title
        // }))
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// Add a new note
router.post('/addnote', fetchuser, [
    body('title', 'Title must be at least 3 characters').isLength({ min: 3 }),
    body('description', 'Description musy be at least 5 character  ').isLength({ min: 5 })
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        notes = await Notes.create({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id
        })

        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }

})

// Update an existing note
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        //Create a new object
        const newnote = {};
        if (title) { newnote.title = title }
        if (description) { newnote.description = description }
        if (tag) { newnote.tag = tag }

        //Find the note to be updated
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// Delete note 
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    try {
        
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Sucess":"Note has been deleted" ,note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router;