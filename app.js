//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://loacalhost:27017/todolistDB", {useNewUrlParser: true});
//item schema
const itemsSchema = {
  name : String
};
//model singular form 
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name : "Buy groceries"
});
const item2 = new Item({
  name : "Complete Assignments"
});

const defaultItems = [item1,item2];

Item.insertMany(defaultItems, function(err){
  if (err){
    console.log(err);
  }else{
    console.log("Successfully saved default items");
  }
});
app.get("/", function(req, res) {

  res.render("list", {listTitle: "Today", newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
