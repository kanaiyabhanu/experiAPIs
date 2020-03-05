let express = require("express");
let app = express();
let Joi = require("@hapi/joi");
app.use(express.json());
// console.log(process);
let port = process.env.PORT || 4500;
// console.log(express);
// console.log(app);


let users = [{
    id: 1,
    name: "John DOE"
},
{
    id: 2,
    name: "EMMA DOE"
},
{
    id: 3,
    name: "AJAY DOE"
},
{
    id: 4,
    name: "MANISH CHANDWANI"
}
];



//get

app.get("/api/user", (req, res) => {
    res.send("hello user");
});

app.get("/api/courses", (req, res) => {
    res.send(["angular", "reactjs", "nodejs"]);
});

// app.get("/api/:year/:month", (req, res) => {
//     res.send(req.params);
// });

app.get("/api/users", (req, res) => {
    res.send(users);
});

app.get("/api/user/:id", (req, res) => {
    let user = users.find((item) => item.id === parseInt(req.params.id));
    if (!user) { return res.status(404).send({ message: "invalid user " }) };
    res.send(user);
});

//create a new user
app.post("/api/users/newuser", (req, res) => {
    let schema = Joi.object({
        name: Joi.string().min(3).max(100).required()

    });
 
    let result = ValidationError(req.body);
    let { error } = result;
    // console.log(result);
    if(error) {return res.send(error.details[0].message)}
    let user = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user);
    res.send(users);
});


app.put("/api/user/updateuser/:id", (req, res) => {
    let user = users.find(data => data.id === parseInt(req.params.id));
    if (!user) { return res.status(404).send({ message: "Invalid user id" }) };
   
    let result = ValidationError(req.body);
    let { error } = result;
    // console.log(result);
    if (error) { return res.send(error.details[0].message) };
    user.name = req.body.name;
    res.send(users);
});

app.delete("/api/user/removeuser/:id", (req, res) => {
    let user = users.find(data => data.id === parseInt(req.params.id));
    if (!user) { return res.status(404).send({ message: "Invalid id" }) };
    let index = users.indexOf(user);
    console.log(index);
    users.splice(index, 1);
    res.send(users);
    
});




function ValidationError(error) {
    let schema = Joi.object({
        name: Joi.string().min(3).max(100).required()

    });
   return schema.validate(error);
}

app.listen(port, () => console.log(`port is working on ${port}`));