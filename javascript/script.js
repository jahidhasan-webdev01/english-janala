const getAllLessons = async () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    const result = await fetch(url);
    const data = await result.json();

    showLessons(data?.data)
}

const showLessons = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";
    
    for (const lesson of lessons) {
        const btnLesson = document.createElement("button");
        btnLesson.classList.add("btn", "btn-outline", "btn-primary")

        btnLesson.innerHTML = `
         <i class="fa-solid fa-book-open"></i>
                Lesson - ${lesson.level_no}
        `
        lessonContainer.appendChild(btnLesson)
    }
}
getAllLessons();