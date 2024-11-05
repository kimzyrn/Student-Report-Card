document.addEventListener("DOMContentLoaded", function () {
    // Retrieve students from localStorage
    const students = JSON.parse(localStorage.getItem("students")) || [];
  
    // Get the table body element
    const tableBody = document.getElementById("student-table-body");
  
    // Function to calculate average grade (GWA)
    function calculateAverageGrade(grades) {
      const total = grades.reduce((sum, grade) => sum + grade.grade, 0);
      return (total / grades.length).toFixed(2); // Returning GWA with two decimal places
    }
  
    // Populate the table with students
    students.forEach(student => {
      // Calculate the GWA for this student
      const averageGrade = calculateAverageGrade(student.grades);
  
      // Create a table row
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${averageGrade}</td>
        <td>
          <button class="btn btn-info btn-sm" onclick="viewStudent(${student.id})">View</button>
          <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">Delete</button>
        </td>
      `;
  
      // Append the row to the table
      tableBody.appendChild(row);
    });
  
    // View student details
    window.viewStudent = function(studentId) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        document.getElementById("modal-name").textContent = student.name;
        document.getElementById("modal-id").textContent = student.id;
        document.getElementById("modal-grades").textContent = student.grades
          .map(g => `${g.subject}: ${g.grade}`).join(', ');
        $('#viewStudentModal').modal('show');
      }
    };
  
    // Delete student
    window.deleteStudent = function(studentId) {
      // Filter out the student to delete
      const updatedStudents = students.filter(student => student.id !== studentId);
  
      // Save the updated list back to localStorage
      localStorage.setItem("students", JSON.stringify(updatedStudents));
  
      // Reload the page to reflect the changes
      location.reload();
    };
  });
  