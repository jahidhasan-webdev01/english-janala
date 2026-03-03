const getAllLessons = async () => {
    isLoading(true);

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
         <button id="lesson-btn-${lesson.level_no}" onclick="getLessonWords(${lesson.level_no})" class="lesson-btn btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>
                Lesson - ${lesson.level_no}
         </button>
        `
        lessonContainer.appendChild(btnLesson)
    }

    isLoading(false);
    document.getElementById("not-select-lesson").classList.remove("hidden");
}

const getLessonWords = async (id) => {
    isLoading(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    const result = await fetch(url);
    const data = await result.json();

    const clickedBtn = document.getElementById(`lesson-btn-${id}`);

    makeBtnInactive();
    clickedBtn.classList.remove("btn-outline");

    if (data?.data.length > 0) {
        showLessonWords(data?.data);

        document.getElementById("not-select-lesson").classList.add("hidden");
        document.getElementById("no-word-lesson").classList.add("hidden");
    } else {
        document.getElementById("word-section").classList.add("hidden");
        document.getElementById("not-select-lesson").classList.add("hidden");
        isLoading(false);
        document.getElementById("no-word-lesson").classList.remove("hidden");
        return;
    }

    isLoading(false);
}

const showLessonWords = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    for (const word of words) {
        const wordCard = document.createElement("div");
        wordCard.classList.add("bg-white", "py-15", "px-10", "rounded-xl");
        wordCard.innerHTML = `
                <div class="text-center space-y-3">
                    <h1 class="text-2xl font-bold">${word.word ? word.word : "<del class=text-red-500>শব্দ পাওয়া যায়নি</del>"}</h1>
                    <p class="text-sm text-gray-400">Meaning /Pronounciation</p>
                    <h1 class="text-xl font-bold text-gray-700 font-bangla">${word.meaning ? word.meaning : "<del class=text-red-500>অর্থ পাওয়া যায়নি</del>"} / ${word.pronunciation ? word.pronunciation : "<del class=text-red-500>উচ্চারণ পাওয়া যায়নি</del>"}</h1>
                </div>
                <div class="flex justify-between mt-10">
                    <button onclick="getWordDetail(${word.id})" class="bg-sky-100 hover:bg-sky-300 p-2 rounded cursor-pointer">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="bg-sky-100 hover:bg-sky-300 p-2 rounded cursor-pointer">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
    `;

        wordContainer.appendChild(wordCard);
        document.getElementById("word-section").classList.remove("hidden");
    }

}

const makeBtnInactive = () => {
    const allLessonBtn = document.querySelectorAll(".lesson-btn");

    for (const btn of allLessonBtn) {
        btn.classList.add("btn-outline");
    }
}

const getWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const result = await fetch(url);
    const data = await result.json();

    showWordDetail(data?.data)
}

const showWordDetail = (word) => {
    const wordDetailContainer = document.getElementById("modal-box");
    wordDetailContainer.innerHTML = `
    <div class="space-y-5 border border-sky-100 p-4 rounded">
        <h1 class="text-2xl font-bold">
            ${word.word} 
            ( <i class="fa-solid fa-microphone-lines"></i>: 
            <span class="font-bangla">${word.pronunciation}</span> )
        </h1>

        <div class="space-y-1">
            <p class="font-bold">Meaning</p>
            <p class="font-bangla">${word.meaning}</p>
        </div>

        <div class="space-y-1">
            <p class="font-bold">Example</p>
            <p>${word.sentence}</p>
        </div>

        <div class="space-y-1">
            <p class="font-bangla font-bold">সমার্থক শব্দ গুলো</p>
            <div class="flex flex-wrap gap-2">
                ${word.synonyms.map(syn =>
        `<button class="btn bg-sky-100">${syn}</button>`
    ).join("")}
            </div>
        </div>
    </div>
    <button onclick="closeModal()" class="btn btn-primary mt-5">Complete Learning</button>
    `

    document.getElementById("word_modal").showModal();
}

const closeModal = () => {
    document.getElementById("word_modal").close();
}

const isLoading = (status) => {
    if (status) {
        document.getElementById("loading-spinner").classList.remove("hidden")
    } else {
        document.getElementById("loading-spinner").classList.add("hidden")
    }
}
getAllLessons();