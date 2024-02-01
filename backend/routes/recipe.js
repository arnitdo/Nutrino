import express from 'express';
const router = express.Router();
import fetchuser from '../middleware/fetchuser.js';
import Recipe from '../models/Recipe.js';
import { body, validationResult } from 'express-validator';
import Comment from '../models/Comment.js';

//ROUTE 1: fetch all notes using: GET '/api/notes/fetch'
router.get('/', async (req, res) => {
    try {
        const notes = await Recipe.find()
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json({ error });
    }

})

//ROUTE 2: add new note using: POST '/api/notes/'
router.post('/',fetchuser,async (req, res) => {
    try {
        const { title, image, steps } = req.body;
        const savedNote = await Recipe.create({
            title, image, steps,
            user: req.user.id,
            createdAt: Date.now()
        })

        return res.json(savedNote);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
})

//ROUTE 3: update a note using: PUT '/api/notes/:id'
router.put('/:id', fetchuser, async (req, res) => {
    try {

        const { title, content } = req.body;
        //store what user wants to update
        const newNote = {};
        if (title) { newNote.title = title }
        if (content) { newNote.content = content };
        newNote.updatedAt = Date.now();

        //VERIFY USER
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        //update note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        return res.json(note);
    } catch (error) {
        return res.status(500).json({ error });
    }
})

//ROUTE 4: delete a note using: DELETE '/api/notes/:id'
router.delete('/:id', fetchuser, async (req, res) => {
    try {

        //VERIFY USER
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        //delete note
        note = await Note.findByIdAndDelete(req.params.id);
        return res.json({ message: "This note was deleted", note });
    } catch (error) {
        return res.status(500).json({ error });
    }
})

//ROUTE 5: fetch note by id using: GET '/api/notes/fetch/:id'
router.get('/fetch/:id', async (req, res) => {
    try {
        const note = await Recipe.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }
        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ error });
    }

})

router.post('/comment/:id',fetchuser, async(req, res)=> {
    try {
        const {content} = req.body;
            const comment = await Comment.create({
                content,
                user:req.user.id,
                about:req.params.id,
                createdAt:Date.now()
            })
        return res.status(200).json(comment);
    } catch (error) {
        return res.status(500).json({ error });
    }
})

router.get('/comment/:id',fetchuser, async(req, res)=> {
    try {
        const comment = await Comment.find({about:req.params.id})
        return res.status(200).json(comment);
    } catch (error) {
        return res.status(500).json({ error });
    }
})
const RecipeRoute = router;
export default RecipeRoute;