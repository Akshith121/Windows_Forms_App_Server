import express, { Router } from 'express';
import fs from 'fs';

const router = Router();
router.use(express.json());

type formParameters = {
    "name": string,
    "email": string,
    "phone": string,
    "github_link": string,
    "stopwatch_time": string
}

router.get('/ping', (req, res) => {
    res.json(true);
})

router.post('/submit', (req, res) => {
    const newForm: formParameters = req.body;
    try{
        let forms: Array<formParameters> = [];
        fs.readFile('./db.json', 'utf-8', (err, data) => {
            if(err){
                return err;
            }
            forms = [...JSON.parse(data), newForm];
            fs.writeFile('./db.json', JSON.stringify(forms), 'utf-8', (err) => {
                return err;
            })
            return res.status(201).json({msg: "successfully submitted!", formId: forms.length});
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "There is an issue with the server, please try after some time!"});
    }
})

router.get('/read', async (req, res) => {
    const index: number = parseInt((req.query.index) + "") || 0;
    try{
        let forms: Array<formParameters> = [];
        fs.readFile('./db.json', 'utf-8', (err, data) => {
            if(err){
                return err;
            }
            forms = JSON.parse(data);
            if(forms.length >= index){
                return res.status(200).json(forms[index-1]);
            }
            return res.status(400).json({msg: "try reducing the index value!"})
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "There is an issue with the server, please try after some time!"});
    }
})

export default router;