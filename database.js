import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
}).promise();

export async function getTeacherById (id) {
	try {
		const [rows] = await pool.query('SELECT * FROM teachers WHERE teacher_id = ?', [id]);

		if (rows.length === 0) {
			return null;
		}

		const teacher = rows[0];
		const response = {
			teacher_id: teacher.teacher_id,
			name: teacher.name,
			is_active: teacher.is_active,
			designation: teacher.designation
		};

		return response;
	} catch (error) {
		console.error('Error fetching teacher record:', error);
		throw error;
	}
}

export async function getTeacherByField (filters) {
	try {
		// Construct the SQL query based on the provided filters
		const { name, is_active } = filters;

		let query = 'SELECT * FROM teachers WHERE 1=1';

		const values = [];

		if (name !== undefined) {
			query += ' AND name = ?';
			values.push(name);
		}

		if (typeof is_active === 'boolean') {
			query += ' AND is_active = ?';
			values.push(is_active);
		}

		const [rows] = await pool.query(query, values);

		// Prepare the response object
		const teachers = rows.map((teacher) => {
			return {
				teacher_id: teacher.teacher_id,
				name: teacher.name,
				is_active: teacher.is_active,
				designation: teacher.designation
			};
		});

		return teachers;
	} catch (error) {
		// Handle any errors that might occur during the database query
		console.error('Error fetching teacher records:', error);
		throw error;
	}
}


export async function addTeacher (teacherData) {
	try {
		const { teacher_id, name, is_active, designation } = teacherData;

		const result = await pool.query(
			'INSERT INTO teachers (teacher_id, name, is_active, designation) VALUES (?, ?, ?, ?)',
			[teacher_id, name, is_active, designation]
		);
		const response = {
			teacher_id,
			name,
			is_active,
			designation
		};

		return response;
	} catch (error) {
		console.error('Error adding teacher record:', error);
		throw error;
	}
}

export async function getCoursesByField (filters) {
	try {
		const { name, start_date, end_date, is_active } = filters;

		let query = 'SELECT * FROM courses WHERE 1=1';

		const values = [];

		if (name) {
			query += ' AND name = ?';
			values.push(name);
		}

		if (start_date) {
			query += ' AND start_date = ?';
			values.push(start_date);
		}

		if (end_date) {
			query += ' AND end_date = ?';
			values.push(end_date);
		}

		if (typeof is_active === 'boolean') {
			query += ' AND is_active = ?';
			values.push(is_active);
		}

		const [rows] = await pool.query(query, values);

		const courses = rows.map((course) => ({
			course_id: course.course_id,
			Course_mentor: {
				teacher_id: course.teacher_id,
				name: course.teacher_name,
				is_active: course.teacher_is_active,
				designation: course.teacher_designation,
			},
			name: course.name,
			start_date: course.start_date,
			end_date: course.end_date,
			description: course.description,
			is_active: course.is_active,
		}));

		return courses;
	} catch (error) {
		console.error('Error fetching courses:', error);
		throw error;
	}
}

export async function getCourseById (id) {
	try {
		const query = 'SELECT * FROM courses WHERE course_id = ?';
		const values = [id];

		const [rows] = await pool.query(query, values);

		if (rows.length === 0) {
			return null; // Course with the given ID not found
		}

		const course = {
			course_id: rows[0].course_id,
			Course_mentor: {
				teacher_id: rows[0].teacher_id,
				name: rows[0].teacher_name,
				is_active: rows[0].teacher_is_active,
				designation: rows[0].teacher_designation,
			},
			name: rows[0].name,
			start_date: rows[0].start_date,
			end_date: rows[0].end_date,
			description: rows[0].description,
			is_active: rows[0].is_active,
		};

		return course;
	} catch (error) {
		console.error('Error fetching course by ID:', error);
		throw error;
	}
}


export async function createCourse (courseData) {
	try {
		const {
			course_id,
			course_mentor,
			name,
			start_date,
			end_date,
			description,
			is_active,
		} = courseData;

		const query =
			'INSERT INTO courses (teacher_id, name, start_date, end_date, description, is_active) VALUES (?, ?, ?, ?, ?, ?)';
		const values = [
			course_mentor,
			name,
			start_date,
			end_date,
			description,
			is_active,
		];

		const [result] = await pool.query(query, values);

		const newlyCreatedCourse = await getCourseById(result.insertId);

		return newlyCreatedCourse;
	} catch (error) {
		console.error('Error creating course:', error);
		throw error;
	}
}



