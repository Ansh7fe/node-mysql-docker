import express from 'express';

const app = express();

import { getTeacherById, addTeacher, getTeacherByField, getCoursesByField, getCourseById, createCourse } from './database.js';

app.use(express.json());

app.get('/teacher/:id', async (req, res) => {
	const id = req.params.id
	const teacher = await getTeacherById(id)
	res.status(200).json(teacher)
})

app.get('/teacher', async (req, res) => {
	const filters = req.query;
	console.log(filters)
	const teachers = await getTeacherByField(filters);
	res.status(200).json(teachers);
});

app.post('/teacher', async (req, res) => {
	const { name, is_active, designation } = req.body;
	const teacher = await addTeacher(req.body);
	res.status(201).json(teacher);
})

app.get('/course', async (req, res) => {
	const filters = req.query;
	const courses = await getCoursesByField(filters);
	res.status(200).json(courses);
});

app.get('/course/:id', async (req, res) => {
	const id = req.params.id
	const course = await getCourseById(id)
	res.status(200).json(course)
})

app.post('/course', async (req, res) => {
	const course = await createCourse(req.body);
	res.status(201).json(course);
})

app.use((err, req, res, next) => {
	res.status(500).send('Something broke!')
})

app.listen(8080, () => {
	console.log('Server is running on the port 8080')
})