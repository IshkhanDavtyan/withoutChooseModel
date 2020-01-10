const express = require('express')
const router = new express.Router()
const fs = require('fs')
const objectModel = require('../models/model')

// router.get('/sendModelsObject',async (req,res)=>{
//     try{
//         const modelsObject = fs.readFileSync('objects.json')
//         res.send(modelsObject)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

router.post('/main', async (req, res) => {
    
    const allModels = JSON.parse(fs.readFileSync('objects.json'));
    allModels[req.body.key]=req.body.value;
    console.log(allModels)
    try {
        fs.writeFileSync('objects.json', JSON.stringify(allModels))
        res.send({ message: "success" })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.get('/main', async (req, res) => {
    let file = JSON.parse(fs.readFileSync('selectedObject.json'))
    res.send(file)
    try {
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/create', async (req, res) => {
    try {
        const user = new objectModel(req.body)
        await user.save()
        res.send({ message: "Your data created" })
    } catch (e) {
        console.log(e)
        res.send({ message: "Your data dont created" })
    }
})

router.post('/selectedObject',(req,res)=>{
    try{
        const modelsObject = JSON.parse(fs.readFileSync('objects.json'))
        let newObj = {}
        let count = 0
        let keysArr = []
        for(let[key,value]of Object.entries(modelsObject)){
            if(key===req.body.name){
                newObj[key] = value
                fs.writeFileSync('selectedObject.json',JSON.stringify(newObj))
                console.log(newObj)
                for(let[vk,vv] of Object.entries(value)){
                    count+=1
                    keysArr.push(vk)
                }
                res.send({count,keysArr})
            }
        }
    }catch(e){

    }
})



module.exports = router