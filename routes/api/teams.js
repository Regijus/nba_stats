const express = require('express');
const router = express.Router();

// Movie Model
const Team = require('../../models/Team');

// @route GET api/teams
// @desc Get All Teams
// @access Public
router.get('/', (req, res) => {
    Team.find().then(teams => res.json(teams));
});

// @route POST api/teams
// @desc Add A Team
// @access Public
router.post('/', (req, res) => {
    const newTeam = new Team({
        apiID: req.body.apiID,
        Name: req.body.Name,
        User: req.body.User
    });

    newTeam.save().then(team => res.json(team));
});

// @route DELETE /api/teams/:id
// @desc Delete A Team
// @access Public
router.delete('/:id', (req, res) => {
    Team.findById(req.params.id)
        .then(team => team.remove().then(() => res.json({ success: true })))
        .catch(error => res.status(404).json({ success: false, message: "Team not found" }));
});

module.exports = router;
