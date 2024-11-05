// Array to hold the students and their grades
let students = JSON.parse(localStorage.getItem("students")) || [];

// Event listener for adding a grade
document.getElementById('add-grade-btn').addEventListener('click', function () {
  const studentName = document.getElementById('student-name').value;
  const studentId = document.getElementById('student-id').value;
  const subject = document.getElementById('subject').value;
  const grade = document.getElementById('grade').value;

  if (studentName && studentId && subject && grade) {
    // Check if student already exists
    const existingStudentIndex = students.findIndex(student => student.id === studentId);
    
    if (existingStudentIndex === -1) {
      // New student, create and add
      students.push({
        id: studentId,
        name: studentName,
        grades: [{ subject, grade: parseFloat(grade) }]
      });
    } else {
      // Add grade to existing student
      students[existingStudentIndex].grades.push({ subject, grade: parseFloat(grade) });
    }

    // Save updated students to localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Clear the form after submission
    document.getElementById('report-card-form').reset();
    displayGrades();
  } else {
    alert("Please fill out all fields.");
  }
});

// Function to display grades below the form (optional)
function displayGrades() {
  const gradesList = document.getElementById('grades-list');
  gradesList.innerHTML = ''; // Clear any previous grades

  const lastStudent = students[students.length - 1]; // Get the last added student
  lastStudent.grades.forEach(grade => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = `${grade.subject}: ${grade.grade}`;
    gradesList.appendChild(li);
  });
}
