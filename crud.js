
let allStudents = [];

async function loadStudents() {
    const response = await fetch("https://6adea73d4e88f1bba4a53cc5.mockapi.io/students");

    if(!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const students = await response.json();
    allStudents = students;
    renderStudents(students);
} 

function renderStudents(students) {
    const list = document.querySelector("#studentList");
    list.replaceChildren();

    students.forEach(student => {
        const li = document.createElement("li");
        li.textContent = `${student.name} (${student.age}) | ${student.major} | ${student.grade}학년 `;

        const editBtn = document.createElement("button");
        editBtn.textContent = "수정";
        editBtn.addEventListener("click", function() {
            document.querySelector("#studentId").value = student.id;
            document.querySelector("#name").value = student.name;
            document.querySelector("#age").value = student.age;
            document.querySelector("#major").value = student.major;
            document.querySelector("#grade").value = student.grade;

            document.querySelector("#addbtn").textContent = "수정";
            document.querySelector("#cancelBtn").hidden = false;
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.addEventListener("click", async function() {
            if (!confirm("정말 삭제할까요?")) {
                return;
            }

            try {
                await deleteStudent(student.id);
                alert("삭제했습니다.");
            } catch (error) {
                alert(`삭제 실패: ${error.message}`);
            }
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
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
        method: "PUT",
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

const form = document.querySelector("#studentForm");
 
form.addEventListener("submit", async function(event) {
    event.preventDefault();
 
    const id = document.querySelector("#studentId").value;
    const name = document.querySelector("#name").value;
    const age = Number(document.querySelector("#age").value);
    const major = document.querySelector("#major").value;
    const grade = Number(document.querySelector("#grade").value);
 
    if (name.length < 2) {
        alert("이름은 2자 이상 입력하세요.");
        return;
    }
    if (age === "") {
        alert("나이를 입력하세요.");
        return;
    }
    if (major === "") {
        alert("전공을 입력하세요.");
        return;
    }
    if (grade < 1 || grade > 6) {
        alert("학년은 1~6 사이로 입력하세요.");
        return;
    }
 
    const student = {
        name: name,
        age: age,
        major: major,
        grade: grade
    };
 
    try {
        if (id === "") {
            await addStudent(student);
            alert("학생을 추가했습니다.");
        } else {
            await updateStudent(id, student);
            alert("학생 정보를 수정했습니다.");
        }
 
        form.reset();
        document.querySelector("#studentId").value = "";
        document.querySelector("#addbtn").textContent = "추가";
        document.querySelector("#cancelBtn").hidden = true;
    } catch (error) {
        alert(`요청 실패: ${error.message}`);
    }
});
 
const cancelBtn = document.querySelector("#cancelBtn");
 
cancelBtn.addEventListener("click", function() {
    form.reset();
    document.querySelector("#studentId").value = "";
    document.querySelector("#addbtn").textContent = "추가";
    cancelBtn.hidden = true;
});
 
const searchInput = document.querySelector("#searchInput");
 
searchInput.addEventListener("input", function() {
    const keyword = searchInput.value;
 
    if (keyword === "") {
        renderStudents(allStudents);
        return;
    }
 
    const result = allStudents.filter(function(student) {
        return student.name === keyword || student.major === keyword;
    });
 
    renderStudents(result);
});

loadStudents().catch(function(error) {
    alert(`목록 조회 실패: ${error.message}`);
});