const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect("mongodb://localhost/mongoose-population")

const solarSystemSchema = new Schema({
  planets: [{type: Schema.Types.ObjectId, ref: 'Planet'}],
  starName: String
})

const planetSchema = new Schema({
  name: String,
  system: {type: Schema.Types.ObjectId, ref: 'SolarSystem'},
  visitors: [{type: Schema.Types.ObjectId, ref: 'Visitor'}]
})

const visitorSchema = new Schema({
  name: String,
  homePlanet: {type: Schema.Types.ObjectId, ref: 'Planet'},
  visitedPlanets: [{type: Schema.Types.ObjectId, ref: 'Planet'}]
})

const SolarSystem = mongoose.model("SolarSystem", solarSystemSchema)
const Planet = mongoose.model("Planet", planetSchema)
const Visitor = mongoose.model("Visitor", visitorSchema)

let s1 = new SolarSystem({
  planets: [],
  starName: "patrick"
})

let p1 = new Planet({
  name: "bob",
  system: s1,
  visitors: []
})

let v1 = new Visitor({
  name: "vis",
  homePlanet: p1,
  visitedPlanets: []
})

let p2 = new Planet({
  name: "hello",
  system: s1,
  visitors: []
})

// v1.visitedPlanets.push(p2)
// v1.visitedPlanets.push(p1)

// s1.planets.push(p1)
// p1.visitors.push(v1)
// p2.visitors.push(v1)

// s1.save()
// p1.save()
// p2.save()
// v1.save()

//visitor's list of visited planets
Visitor.findOne({}).populate("visitedPlanets").exec(function(err, visited){
  visited.visitedPlanets.forEach(v => console.log(v.name))
})

//all the visitors on a planet
Planet.findOne({}).populate("visitors").exec(function(err, planet){
  planet.visitors.forEach(v => console.log(v.name))
})

//all the visitors in a system (subdocuments!)
SolarSystem.findOne({})
    .populate({
        path: 'planets',
        populate: {
            path: 'visitors'
        }
    })
    .exec(function (err, system) {
      for(let planet of system.planets){
        planet.visitors.forEach(v => console.log(v.name))
      }
    })

