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

//ping
router.get('/ping', (req, res) => {
    res.json(true);
})

//submit new form
router.post('/submit', (req, res) => {
    const newForm: formParameters = req.body;
    console.log(newForm);
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

//get form by index
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
                console.log(forms[index]);
                return res.status(200).json(forms[index]);
            }
            return res.status(400).json({msg: "try reducing the index value!"})
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "There is an issue with the server, please try after some time!"});
    }
})

//get form by emailId
router.get('/read/form', async (req, res) => {
    const emailId: string = (req.query.emailId + "") || ""
    try{
        let forms: Array<formParameters> = [];
        fs.readFile('./db.json', 'utf-8', (err, data) => {
            if(err){
                return err;
            }
            forms = JSON.parse(data);
            const reqForm = forms.find(form => {
                return (form.email === emailId)
            })
            if(reqForm === null){
                return res.status(200).json({msg: "There are no forms with the provided email address!"})
            }
            return res.status(200).json(reqForm);
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "There is an issue with the server, please try after some time!"});
    }
})

//get the count of Number of forms
router.get('/length', async (req, res) => {
    try{
        let forms: Array<formParameters> = [];
        fs.readFile('./db.json', 'utf-8', (err, data) => {
            if(err){
                return err;
            }
            forms = JSON.parse(data);
            const length = forms.length;
            return res.status(200).json(length);
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "There is an issue with the server, please try after some time!"});
    }
})

//update submitted form
router.put('/update', (req, res) => {
    const emailId: string = (req.query.emailId + "") || ""
    const newForm: formParameters = req.body;
    try{
        let forms: Array<formParameters> = [];
        fs.readFile('./db.json', 'utf-8', (err, data) => {
            if(err){
                return err;
            }
            forms = JSON.parse(data);
            forms = forms.map(form => {
                if(form.email == emailId){
                    return newForm
                }
                return form
            })
            console.log(forms);
            fs.writeFile('./db.json', JSON.stringify(forms), 'utf-8', (err) => {
                return err;
            })
            return res.status(201).json({msg: "updated successfully!"});
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "There is an issue with the server, please try after some time!"});
    }
})

//delete submitted forms
router.delete('/delete', (req, res) => {
    const emailId: string = (req.query.emailId + "") || ""
    try{
        let forms: Array<formParameters> = [];
        fs.readFile('./db.json', 'utf-8', (err, data) => {
            if(err){
                return err;
            }
            forms = JSON.parse(data);
            let newForms: Array<formParameters> = []
            for(let i=0;i<forms.length;i++){
                if(forms[i].email !== emailId){
                    newForms.push(forms[i]);
                }
            }
            console.log(newForms);
            fs.writeFile('./db.json', JSON.stringify(newForms), 'utf-8', (err) => {
                return err;
            })
            return res.status(200).json({msg: "deleted successfully!"});
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({err: "There is an issue with the server, please try after some time!"});
    }
})


export default router;