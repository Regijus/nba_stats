const express = require('express');
const router = express.Router();

// Movie Model
const Player = require('../../models/Player');

// @route GET api/players
// @desc Get All Players
// @access Public
router.get('/', (req, res) => {
    Player.find().then(players => res.json(players));
});

// @route POST api/players
// @desc Add A Player
// @access Public
router.post('/', (req, res) => {
    const newPlayer = new Player({
        apiID: req.body.apiID,
        Name: req.body.Name,
        Team: req.body.Team,
        User: req.body.User
    });

    newPlayer.save().then(player => res.json(player));
});

// @route DELETE /api/players/:id
// @desc Delete A Player
// @access Public
router.delete('/:id', (req, res) => {
    Player.findById(req.params.id)
        .then(player => player.remove().then(() => res.json({ success: true })))
        .catch(error => res.status(404).json({ success: false, message: "Player not found" }));
});

module.exports = router;
