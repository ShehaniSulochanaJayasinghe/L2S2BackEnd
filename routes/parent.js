
const express = require('express')
const router = express.Router()
const Parent = require('../models/parent');

router.route('/signup').post((req, res) => {

    /* sample request
{
    "id": "1",
    "firstName": "Test",
    "lastName": "Test",
    "email": "Test",
    "password": "Test",
    "confirmpassword": "Test",
    "address": "Test",
    "noofchildren": 1,
    "childName": "Test",
    "childSchool": "Test",
    "contactNumbers": [
        {
            "contactNumber": 112123123
        }
    ],
    "childrenDetails": [
        {
            "name": "Rampe",
            "school": "BMMV"
        }
    ]
}
    */

    const { id,
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        address,
        noofchildren,
        childName,
        childSchool,
        contactNumbers,
    } = req.body;

    let childrenDetails = [];
    if (req.body?.childrenDetails?.length > 0) {
        req.body.childrenDetails.forEach((child) => {
            childrenDetails.push({
                name: child.name,
                school: child.school,
            })
        })
    }

    var newParent = new Parent({
        id,
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        address,
        noofchildren,
        childName,
        childSchool,
        contactNumbers,
        childrenDetails
    });

    newParent.save().then(() => {
        res.json("Parent Added.");
    }).catch((err) => {
        res.send(err);
    });
})

router.route('/').get((req, res) => {
    Parent.find().then((parent) => {
        res.json(parent);
    }).catch((err) => {
        res.send(err);
    });
})

router.route('/update/:id').put((req, res) => {
    var parentId = req.params.id;
    const { id,
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        address,
        noofchildren,
        childName,
        childSchool,
        contactNumbers,
        childrenDetails } = req.body;
    var updateParent = {
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        address,
        noofchildren,
        childName,
        childSchool,
        contactNumbers,
        childrenDetails

    };
    var update = Parent.findByIdAndUpdate(parentId, updateParent).then((update) => {
        res.json(update);
    }).catch((err) => {
        res.send(err);
    });
})

router.route('/delete/:id').delete((req, res) => {
    var parentId = req.params.id;
    Parent.findByIdAndDelete(parentId).then((parent) => {
        res.json(parent);
    }).catch((err) => {
        res.send(err);
    });
})

router.route('/:id').get((req, res) => {
    var parentId = req.params.id;
    Parent.findById(parentId).then((parent) => {
        res.json(parent);
    }).catch((err) => {
        res.send(err);
    });
})

module.exports = router;
