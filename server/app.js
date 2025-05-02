import { Hono } from "jsr:@hono/hono@4.6.5";
import { cors } from "jsr:@hono/hono@4.6.5/cors";

const app = new Hono();
app.use("/*", cors());

// GET /courses
app.get("/courses", (c) => {
  const courses = {
    "courses": [
      { "id": 1, "name": "Web Software Development" },
      { "id": 2, "name": "Device-Agnostic Design" },
    ],
  };
  return c.json(courses);
});

// GET /courses/:id
app.get("/courses/:id", (c) => {
  const id = Number(c.req.param("id"));
  const course = {
    course: { "id": id, "name": "Course Name" },
  };
  return c.json(course);
});

// POST /courses
app.post("/courses", async (c) => {
  const courses = await c.req.json();
  const course = {
    "course": { "id": 3, "name": courses.name },
  };
  return c.json( course );
});

let questions = [];

app.get("/courses/:id/questions", (c) => {
  return c.json(questions);
});

app.post("/courses/:id/questions", async (c) => {
  const body = await c.req.json();
  const newQuestion = {
    id: questions.length + 1,
    title: body.title,
    text: body.text,
    upvotes: 0,
  };
  questions.push(newQuestion);
  return c.json(newQuestion);
});

app.post("/courses/:id/questions/:qId/upvote", async (c) => {
  const qId = Number(c.req.param("qId"));
  const question = questions.find((q) => q.id === qId);
  if (question) {
    question.upvotes += 1;
  }
  return c.json(question);
});

app.delete("/courses/:id/questions/:qId", async (c) => {
  const qId = Number(c.req.param("qId"));
  const deleted = questions.find((q) => q.id === qId);
  questions = questions.filter((q) => q.id !== qId);
  return c.json(deleted);
});

export default app;