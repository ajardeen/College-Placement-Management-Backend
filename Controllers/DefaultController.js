const express = require("express");

//Home Page routing function
const homePage = (req,res)=>{
    res.send("College Placement Management System server is running");
}


module.exports = {
    homePage,

}
