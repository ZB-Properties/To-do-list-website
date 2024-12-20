
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["Get foodstuffs", "Cook the preferred meal of choice", "Serve and Eat the meal"];
let workItems = [];

app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

app.get("/", function(req, res){

    let day = date();

    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }


});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});


app.listen(4000, function(){
    console.log("Server running on port 4000");
})