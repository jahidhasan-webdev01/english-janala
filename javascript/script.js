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
        const btnLesson = document.createElement("div");

        btnLesson.innerHTML = `
         <button onclick="getLessonWords(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>
                Lesson - ${lesson.level_no}
         </button>
        `
        lessonContainer.appendChild(btnLesson)
    }
}

const getLessonWords = async (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    const result = await fetch(url);
    const data = await result.json();

    if (data?.data.length > 0) {
        showLessonWords(data?.data);

        document.getElementById("not-select-lesson").classList.add("hidden");
        document.getElementById("no-word-lesson").classList.add("hidden");
    } else {
        document.getElementById("word-section").classList.add("hidden");
        document.getElementById("not-select-lesson").classList.add("hidden");
        document.getElementById("no-word-lesson").classList.remove("hidden");
        return;
    }

}

const showLessonWords = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    for (const word of words) {
        console.log(word);
        const wordCard = document.createElement("div");
        wordCard.classList.add("bg-white", "py-15", "px-10", "rounded-xl");
        wordCard.innerHTML = `
                <div class="text-center space-y-3">
                    <h1 class="text-2xl font-bold">${word.word ? word.word : "<del class=text-red-500>শব্দ পাওয়া যায়নি</del>"}</h1>
                    <p class="text-sm text-gray-400">Meaning /Pronounciation</p>
                    <h1 class="text-xl font-bold text-gray-700">${word.meaning ? word.meaning : "<del class=text-red-500>অর্থ পাওয়া যায়নি</del>"} / ${word.pronunciation ? word.pronunciation : "<del class=text-red-500>উচ্চারণ পাওয়া যায়নি</del>"}}</h1>
                </div>
                <div class="flex justify-between mt-10">
                    <div class="bg-sky-100 hover:bg-sky-300 p-2 rounded cursor-pointer">
                        <i class="fa-solid fa-circle-info"></i>
                    </div>
                    <div class="bg-sky-100 hover:bg-sky-300 p-2 rounded cursor-pointer">
                        <i class="fa-solid fa-volume-high"></i>
                    </div>
                </div>
    `;

        wordContainer.appendChild(wordCard);
        document.getElementById("word-section").classList.remove("hidden");
    }

}
getAllLessons();