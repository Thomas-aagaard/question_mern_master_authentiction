class Db {
    /**
     * Constructors an object for accessing kittens in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store question in MongoDB
        const questionSchema = new mongoose.Schema({
            question: String,
            answers: [{
                text: String,
                votes: Number
            }]
        });

        // This model is used in the methods of this class to access kittens
        this.questionModel = mongoose.model('question', questionSchema);
    }

    async getData() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getData:", error.message);
            return {};
        }
    }

    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestionByID:", error.message);
            return {};
        }
    }

    async CreateQuestion(newQuestion) {
        try {
            let ques = new this.questionModel(newQuestion);
            return await ques.save();
        }
        catch (error) {
            console.error("You didnt add question:", error.message);
            return {};
        }

    }

    async addAnswer(id, answers) {
        try  {
            const question = await this.getQuestion(id);
            question.answers.push(answers);
            return await question.save();
        }
        catch (error) {
            console.error("You didnt add answers:", error.message);
            return {};
        }
    }

    async addVote(id, aid) {
        try  {
            const question = await this.getQuestion(id);
            const answer = question.answers.id(aid);
            answer.votes++;
            return await question.save();
        }
        catch (error) {
            console.error("You didnt vote answers:", error.message);
            return {};
        }
    }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of question to add...
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap(count = 10) {
        const answers = ['this is a answer', 'answer 2', 'answer 3', 'answer 4'];
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        function getQuestions() {
            return ['What is React?', 'How do you fetch?', 'What is a REST API?', 'What is a full stacker?'][getRandomInt(0,3)]
        }

        function getRandomAnswers() {
            const shuffled = answers.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, getRandomInt(1,shuffled.length));
        }


        let l = (await this.getData()).length;
        console.log("Question collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let ques = new this.questionModel({
                    question: getQuestions(),
                    answers: [{text:'some text', votes:0}]
                });
                promises.push(ques.save());
            }

            return Promise.all(promises);
        }
    }

}

// We export the object used to access the kittens in the database
module.exports = mongoose => new Db(mongoose);