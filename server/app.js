import { Hono } from "@hono/hono";
import { logger } from "@hono/hono/logger";

const app = new Hono();
app.use("/*", logger());

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

// GET /courses/:id/topics
app.get("/courses/:id/topics", (c) => {
  const topics = {
    "topics": [
      { "id": 1, "name": "Topic 1" },
      { "id": 2, "name": "Topic 2" }
    ],
  };
  return c.json(topics);
});

// GET /courses/:cId/topics/:tId/posts
app.get("/courses/:cId/topics/:tId/posts", (c) => {
  const posts = {
    "posts": [
      {"id": 1, "title": "Post 1" },
      {"id": 2, "title": "Post 2" }
    ],
  };
  return c.json(posts);
});

// GET /courses/:cId/topics/:tId/posts/:pId
app.get("/courses/:cId/topics/:tId/posts/:pId", (c) => {
  const pId = Number(c.req.param("pId"));
  const post = {
    post: { "id": pId, "title": "Post Title" },
    answers: [
      { "id": 1, "content": "Answer 1" },
      { "id": 2, "content": "Answer 2" },
    ],
  };
  return c.json(post);
});

export default app;
