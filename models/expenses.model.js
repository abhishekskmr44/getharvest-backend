const mongoose= require("mongoose");

const projectSchema = mongoose.Schema({
    date:String,
    project:String,
    category:String,
    notes:String,
    Amount:Number,
    userId:String
});

const ProjectModel = mongoose.model("project",projectSchema);

module.exports = {ProjectModel}
