// importing all functions from bookRepository.js as bookRepository
import * as bookRepository from "./bookRepository.js";

import { Hono } from "jsr:@hono/hono@4.6.5";
import { cors } from "jsr:@hono/hono@4.6.5/cors";
import postgres from "postgres";
import { z } from "zod";
import { zValidator } from "zValidator";

const app = new Hono();
app.use("/*", cors());

const sql = postgres();

const courseSchema = z.object({
  name: z.string().min(3),
});

const questionSchema = z.object({
  title: z.string().min(3),
  text: z.string().min(3),
});


app.post("/", async (c) => {
  const { query } = await c.req.json();
  const result = await sql.unsafe(query);
  return c.json(result);
});

app.post("/books", async (c) => {
  const book = await c.req.json();
  const newBook = await bookRepository.create(book);
  return c.json(newBook);
});

app.get("/books", async (c) => {
  const books = await bookRepository.readAll();
  return c.json(books);
});

app.get("/books/:id", async (c) => {
  const id = c.req.param("id");
  const book = await bookRepository.readOne(id);
  return c.json(book);
});

app.put("/books/:id", async (c) => {
  const id = c.req.param("id");
  const book = await c.req.json();
  const updatedBook = await bookRepository.update(id, book);
  return c.json(updatedBook);
});

app.delete("/books/:id", async (c) => {
  const id = c.req.param("id");
  const deletedBook = await bookRepository.remove(id);
  return c.json(deletedBook);
});

// other functionality

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


app.get("/api/courses", async (c) => {
  const courses = await sql`SELECT * FROM courses`;
  return c.json(courses);
});

app.get("/api/courses/:id", async (c) => {
  const id = c.req.param("id");
  const course = await sql`SELECT * FROM courses WHERE id = ${id}`;
  return c.json(course[0]);
});

app.post("/api/courses", zValidator("json", courseSchema), async (c) => {
  const body = await c.req.valid("json");
  const course = await sql`INSERT INTO courses (name) VALUES (${body.name}) RETURNING *`;
  return c.json(course[0]);
});

app.delete("/api/courses/:id", async (c) => {
  const id = c.req.param("id");
  const deleted = await sql`DELETE FROM courses WHERE id = ${id} RETURNING *`;
  return c.json(deleted[0]);
});

app.get("/api/courses/:id/questions", async (c) => {
  const courseId = c.req.param("id");
  const questions = await sql`SELECT * FROM questions WHERE course_id = ${courseId}`;
  return c.json(questions);
});

app.post("/api/courses/:id/questions", zValidator("json", questionSchema), async (c) => {
  const courseId = c.req.param("id");
  const body = await c.req.valid("json");
  const question = await sql`
    INSERT INTO questions (course_id, title, text)
    VALUES (${courseId}, ${body.title}, ${body.text})
    RETURNING *`;
  return c.json(question[0]);
});

app.post("/api/courses/:id/questions/:qId/upvote", async (c) => {
  const qId = c.req.param("qId");
  const updated = await sql`
    UPDATE questions SET upvotes = upvotes + 1
    WHERE id = ${qId}
    RETURNING *`;
  return c.json(updated[0]);
});

app.delete("/api/courses/:id/questions/:qId", async (c) => {
  const qId = c.req.param("qId");
  const deleted = await sql`DELETE FROM questions WHERE id = ${qId} RETURNING *`;
  return c.json(deleted[0]);
});

export default app;
