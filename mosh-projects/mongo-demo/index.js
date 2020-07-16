const mongoose = require("mongoose");

async function createCourse() {

  await mongoose.connect("mongodb://localhost/alexdb")

  const courseSchema = new mongoose.Schema({
    title: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
  });

  const Course = mongoose.model("Course", courseSchema);

  const course = new Course({
    title: "New course",
    tags: ["test", "new", "course"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCourse();
