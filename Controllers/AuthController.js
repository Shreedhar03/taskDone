const userModel = require('../Models/userModel')

const createUser = async (req, res) => {
    let { email } = req.body
    console.log("createUser", email)
    let user = await userModel.findOne({ email })
    if (user) {
        return res.json({ message: "User exists" })
    }
    let newUser = new userModel({ email })

    await newUser.save()
    res.json({ newUser })

}
const user_data = async (req, res) => {
    // let { email } = req.email
    console.log("fetching user data")
    let email = req.email
    console.log('email for data', req.email)
    let userData = await userModel.findOne({ email })
    res.json({ userData })
}
const newCollection = async (req, res) => {
    let { title } = req.body
    let email = req.email
    let user = await userModel.findOne({ email })
    user.collections.push({ title, tasks: [] })
    await user.save()
    res.json({ user })
}
const addTask = async (req, res) => {
    let { collectionName, taskTitle } = req.body
    let email = req.email
    let user = await userModel.findOne({ email })
    let collection = user.collections.find(c => c.title === collectionName)
    collection.tasks.push({ title: taskTitle })
    console.log('collection', collection.tasks)
    await user.save()
    res.json({ collection, user })
}
const dropCollection = async (req, res) => {
    let { name } = req.body
    let email = req.email
    let user = await userModel.findOne({ email })
    let newCollection = user.collections.filter(e => e.title !== name)
    user.collections = newCollection
    await user.save()
    res.json({ collection: user.collections })
}
const renameCollection = async (req, res) => {
    let { name, newTitle } = req.body
    let email = req.email
    let user = await userModel.findOne({ email })
    let currentCollection = user.collections.filter(e => e.title === name)
    currentCollection[0].title = newTitle
    await user.save()
    res.json({ collection: user.collections })
}
const deleteTask = async (req, res) => {
    let { taskTitle, collection } = req.body
    let email = req.email
    let user = await userModel.findOne({ email })
    let current_collection = user.collections.filter(e => e.title === collection)
    let newTasks = current_collection[0].tasks.filter(e => e.title !== taskTitle)
    current_collection[0].tasks = newTasks
    await user.save()
    res.json({ newTasks: current_collection.tasks })
}
const markDone = async (req, res) => {
    let { taskTitle, collection } = req.body
    let email = req.email
    let user = await userModel.findOne({ email })
    let current_collection = user.collections.filter(e => e.title === collection)
    let currentTask = current_collection[0].tasks.filter(e => e.title === taskTitle)
    let completed = currentTask[0].completed
    currentTask[0].completed = !completed
    await user.save()
    res.json({ "completed": currentTask[0].completed })
}
const editTask = async (req, res) => {
    let { taskTitle, collection, newTask } = req.body
    let email = req.email
    let user = await userModel.findOne({ email })
    let current_collection = user.collections.filter(e => e.title === collection)
    let currentTask = current_collection[0].tasks.filter(e => e.title === taskTitle)
    currentTask[0].title = newTask
    await user.save()
    res.json({ "completed": currentTask[0].completed })
}
module.exports = { createUser, user_data, newCollection, addTask, dropCollection,renameCollection, deleteTask, markDone, editTask }