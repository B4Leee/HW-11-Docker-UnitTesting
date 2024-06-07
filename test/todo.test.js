const app = require("../app");
const request = require("supertest");

const reqTodos = {
  id: 101,
  title: "Plan birthday party",
  description: "Organize event",
  status: "pending",
  createdAt: new Date(),
  updatedAt: new Date(),
  user_id: 8,
};

let todo_id = 0;

describe("POST /todos", () => {
  test("Create todos", async () => {
    return request(app)
      .post("/todos")
      .send(reqTodos)
      .expect(201)
      .then(({ body }) => {
        todo_id = body.id;
      });
  });
});

describe("GET /todos/:id", () => {
  test("GET detail todo", async () => {
    return request(app)
      .get(`/todos/${todo_id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("GET /todos", () => {
  test("GET all todo", async () => {
    return request(app)
      .get("/todos")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("DELETE /todos/:id", () => {
  test("Soft delete todo", async () => {
    return request(app)
      .delete(`/todos/${todo_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.message).toBe("Success Soft Delete data");
      });
  });

  // Verifikasi jika data berhasil terhapus
  test("Verify todo is soft deleted", async () => {
    return request(app).get(`/todos/${todo_id}`).expect(404);
  });
});
