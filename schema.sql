CREATE DATABASE teachers_app;
USE teachers_app;

CREATE TABLE teachers (
  teacher_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  is_active BOOLEAN NOT NULL,
  designation VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL,
  FOREIGN KEY (teacher_id) REFERENCES teachers (teacher_id)
);

INSERT INTO courses (teacher_id, name, start_date, end_date, description, is_active) VALUES
  (1, 'Introduction to DevOps', '2024-01-01', '2024-02-02', 'Basic concepts of DevOps', true),
  (2, 'Web Development Fundamentals', '2024-03-01', '2024-04-15', 'Introduction to web development', true),
  (3, 'Data Science Essentials', '2024-02-15', '2024-04-30', 'Data science concepts and tools', false),
  (4, 'Machine Learning Basics', '2024-03-15', '2024-05-15', 'Introduction to machine learning', true);
