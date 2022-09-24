const { Thought, User } = require('../models');

module.exports = {
    // GET all thoughts 
    getAllThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },

    // GET a single thought by ID
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate({path: 'reactions'})
            .select('-__v')
            .then((dbThoughtData) => 
                !dbThoughtData ? res.status(404).json({ message: 'No thought found with that ID'}) 
                : res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
    },

    // Create a thought 
    createThought(req, res) {
        Thought.create(req.body)
            .then(thoughtInfo => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thoughtInfo._id }},
                    { new: true }
                )
            })
            .then((thoughtInfo) => res.json(thoughtInfo))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Update a thought 
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { new: true, runValidators: true }
        )
        .then((dbThoughtData) => 
            !dbThoughtData ? res.status(404).json({ message: 'No thought found with that ID'}) 
            : res.json(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    },

    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this Id' });
                }

                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId }},
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this Id' });
                }
                res.json({ message: 'Deleted thought successfully' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Add a new reaction to a thought 
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { new: true, runValidators: true }
        )
        .then((dbThoughtData) => 
            !dbThoughtData ? res.status(404).json({ message: 'No thought found with that ID'}) 
            : res.json(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    }, 

    // Delete a reaction from a thought 
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions: {_id: req.params.thoughtId}}},
            { new: true, runValidators: true }
        )
        .then((dbThoughtData) => 
            !dbThoughtData ? res.status(404).json({ message: 'No thought found with that ID'}) 
            : res.json(dbThoughtData))
        .catch((err) => res.status(500).json(err));
    }
}