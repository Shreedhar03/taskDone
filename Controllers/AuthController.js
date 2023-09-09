const userModel = require('../Models/userModel')

const user_data = async (req, res) => {
    let email = req.body.email
    console.log('email', email)
    let userData = await userModel.findOne({ email })
    res.json({userData})
}
const newCollection = async (req, res) => {
    let { email, title } = req.body
    let user = await userModel.findOne({ email })
    user.collections.push({ title, tasks: [] })
    await user.save()
    res.json({ user })
}
const addTask = async (req, res) => {
    let { email, collectionName, taskTitle } = req.body
    let user = await userModel.findOne({ email })
    let collection = user.collections.find(c => c.title === collectionName)
    collection.tasks.push({ title: taskTitle })
    console.log('collection', collection.tasks)
    await user.save()
    res.json({ collection, user })
}
const dropCollection = async (req, res) => {
    let { email, name } = req.body
    let user = await userModel.findOne({ email })
    let newCollection = user.collections.filter(e => e.title !== name)
    user.collections = newCollection
    await user.save()
    res.json({ collection: user.collections })
}
const deleteTask = async (req, res) => {
    let { email, taskTitle, collection } = req.body
    let user = await userModel.findOne({ email })
    console.log(user)
    let current_collection = user.collections.filter(e => e.title === collection)
    console.log(current_collection)
    let newTasks = current_collection[0].tasks.filter(e => e.title !== taskTitle)
    console.log("newTasks", newTasks)
    current_collection.tasks = newTasks
    await user.save()
    res.json({ newTasks: current_collection.tasks })
}
module.exports = { user_data, newCollection, addTask, dropCollection, deleteTask }