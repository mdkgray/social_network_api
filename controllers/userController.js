const { Thought, User } = require('../models');

module.exports = {
    // GET all users 
    getAllUsers(req, res) {
        User.find({})
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    }, 
    
    // GET a single user 
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then((dbUserData) => 
                !dbUserData ? res.status(404).json({ message: 'No user found with that ID'}) 
                : res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Create a new user 
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
        .then((dbUserData) => 
            !dbUserData ? res.status(404).json({ message: 'No user found with that ID'}) 
            : res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    // Delete a user 
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with that Id' })
                }
                // Delete thoughts associated with that user
                return Thought.deleteMany(
                    { _id: { $in: dbUserData.thoughts }},
                )
            })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this Id' });
                }
                res.json({ message: 'Deleted user successfully' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Add a friend to a user 
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { new: true, runValidators: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this Id' });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Delete a friend from a user 
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true, runValidators: true }
        )
        .then((dbUserData) => 
            !dbUserData ? res.status(404).json({ message: 'No user found with that ID'}) 
            : res.json(dbUserData)
        )
        .catch((err) => res.status(500).json(err));
    },
}