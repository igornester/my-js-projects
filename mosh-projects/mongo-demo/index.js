const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/alexdb")
  .then(() => {
    console.log("Mongo DB connected..");
  })
  .catch((e) => {
    console.error(`Connection error ${e}`);
  });

const courseSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    title: "New course",
    tags: ["test", "new", "course"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCourse();
