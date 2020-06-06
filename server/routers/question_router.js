module.exports = questions => {
    /**** Database ****/
    //const questionDB = require('./question_db')(mongoose);
    let express = require('express');
    let router = express.Router();

    /**** Routes ****/
    router.get('/', async (req, res) => {
        const ques = await questionDB.getData();
        await res.json(ques);
        console.log(ques);  /// Tried to see if I could find why I dont get the data
    });

    router.get('/:id', async (req, res) => {
        let id = req.params.id;
        const ques = await questionDB.getQuestion(id);
        await res.json(ques);
        console.log(ques);
    });

    router.post('/', async (req, res) => {
        let question = {
            question : req.body.question,
            answers : [{text:'', votes:0}] // answers array
        };
        const newQuestion = await questionDB.CreateQuestion(question);
        await res.json(newQuestion);
    });



    router.post('/api/questions/:id/answers', async (req, res) => {
        const id = req.params.id;
        const answers = {text:req.body.answers, votes:0};

        const updatedQuestion = await questionDB.addAnswer(id, answers);
        await res.json(updatedQuestion);
    });

    router.put('/:id/answers/:aid', async (req,res) => {
        const id = req.params.id;
        const aid = req.params.aid;
        const updatedQuestion = await questionDB.addVote(id, aid);
        await res.json(updatedQuestion);
    });

    return router;
};