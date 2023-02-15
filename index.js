const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const conn = require("./db/conn");
const Note = require("./db/schema");
const { default: mongoose } = require("mongoose");
const path = require("path");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`server started : ${port}`);
});

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("client/build"));
}
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//post
app.post("/submit", (req, res) => {
  const { title, content, id } = req.body;
  const noteitem = new Note({
    
    title: title,
    content: content,
  });
  noteitem.save((err) => {
    if (!err) {
      res.send("");
    }
  });

});

app.get("/delete/:id", (req, res) => {
  var id_ = req.params.id;
  Note.findByIdAndDelete({_id:id_},(err)=>{
    console.log(err);
  })

});

app.get("/getdata", (req, res) => {
  var users = {};
  Note.find({}, function (err, users) {
    users.forEach(function (user) {
      users[user._id] = user;
    });
    res.send(users);
  });
});
