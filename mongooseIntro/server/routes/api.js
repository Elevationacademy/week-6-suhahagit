const express = require('express')
const router = express.Router()

const Person = require('../models/Person')

router.get('/people', function (req, res) {
    Person.find({}, function (err, people) {
        res.send(people)
    })
})

router.post('/person', function (req, res) {
    let p1  = new Person({firstName: req.body.firstName, 
                        lastName: req.body.lastName,
                        age: req.body.age})
    p1.save()
    res.end()
})

router.put('/person/:id', function (req, res) {
    let id = req.params.id
    Person.findByIdAndUpdate(id, { age: 80 }, function (err, person) {
        res.end()
    })
})

router.delete('/apocalypse', function (req, res) {
    Person.find({}, function (err, person) {
        people.forEach(p => p.remove())
    })
    res.end()
})

module.exports = router