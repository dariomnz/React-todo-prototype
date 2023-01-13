const express = require("express");
const todos = require("./models/todos");
const router = express.Router();

// Get all posts
router.get("/todos", async (req, res) => {
  const _todos = await todos.find();
  res.send(_todos);
});

router.get("/todo/:id", async (req, res) => {
	try {
		const todo = await todos.findOne({ _id: req.params.id })
		res.send(todo)
	} catch {
		res.status(404)
		res.send({ error: "Todo doesn't exist!" })
	}
})

router.post("/todo", async (req, res) => {
	const _todos = new todos({
		name: req.body.name,
		content: req.body.content,
    	date: Date()
	})
	await _todos.save()
	res.send(_todos)
})

router.patch("/todo/:id", async (req, res) => {
	try {
		const todo = await todos.findOne({ _id: req.params.id })

		if (req.body.title) {
			todo.title = req.body.title
		}

		if (req.body.content) {
			todo.content = req.body.content
		}

		await todo.save()
		res.send(todo)
	} catch {
		res.status(404)
		res.send({ error: "Todo doesn't exist!" })
	}
})

router.delete("/todo/:id", async (req, res) => {
	try {
		await todos.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

module.exports = router;
