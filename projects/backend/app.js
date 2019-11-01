const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Recipe = require("./models/recipe");

const app = express();

// mongoose
//     .connect("mongodb://localhost/backend", { useNewUrlParser: false })
//     .then(result => {
//         console.log({ result: "connected" });
//     })
//     .catch(err => {
//         console.log(err);
//     });
mongoose.connect('mongodb+srv://roman21:roman2147@cluster0-kbmjr.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true }).then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log('connection error');
    });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.post("/api/recipes", (req, res, next) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
    });
    recipe
        .save()
        .then(() => {
            console.log(req.body);
            res.status(201).json({ message: "recipe successfully created" });
        })
        .catch(err => {
            res.status(400).json({
                err: err
            });
        });
});

app.get("/api/recipes/:id", (req, res, next) => {
    Recipe.findOne({
            _id: req.params.id
        })
        .then(recipe => {
            res.status(200).json(recipe);
        })
        .catch(err => {
            res.status(404).json({ err: err });
        });
});
app.put("/api/recipes/:id", (req, res, next) => {
    const recipe = new Recipe({
        _id: req.params.id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
    });
    Recipe.updateOne({ _id: req.params.id }, thing)
        .then(() => {
            res.status(201).json({ message: "recipe updated" });
        })
        .catch(err => {
            res.status(400).json(error);
        });
});
// app.use((req, res) => {
//     res.json({ message: 'server is well listening your requests' });
// })
app.use("/api/recipes", (req, res, next) => {
    Recipe.find()
        .then(recipes => {
            res.status(200).json(recipes);
        })
        .catch(err => {
            res.status(400).json({ err: err });
        });

    app.delete("/api/recipes/:id", (req, res, next) => {
        Recipe.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(200).json({ message: "recipe deleted" });
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });
});

module.exports = app;