async function loadStudents() {
    const response = await fetch("https://6adea73d4e88f1bba4a53cc5.mockapi.io/students");

    if(!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const students = await response.json();
    renderStudents(students);
} 

function renderStudents(students) {
    const list = document.querySelector("#studentList");
    list.replaceChildren();

    students.forEach(student => {
        const li = document.createElement("li");
        li.textContent = `${student.name} (${student.age})`;
        list.appendChild(li);
    })
}

async function addStudent(student) {
    const response = await fetch("https://6adea73d4e88f1bba4a53cc5.mockapi.io/students", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(student)
    });

    if(!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    await loadStudents();
}

async function updateStudent(id, updateDate) {
    const response = await fetch(`${"https://6adea73d4e88f1bba4a53cc5.mockapi.io/students"}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(updateDate)
    });

    if(!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    await loadStudents();
}

async function deleteStudent(id) {
    const response = await fetch(`${"https://6adea73d4e88f1bba4a53cc5.mockapi.io/students"}/${id}`, {
        method:"DELETE"
    });

    if(!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    await loadStudents();
}