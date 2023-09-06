<template>
    <v-app id="inspire">

        <v-main style="background-color: #3B4048;">
            <v-container class="px-2 py-2" fluid>
                <v-card class="right-panel-hot">

                    <v-list lines="two" style="background-color: #181B21;">
                        <v-list-subheader class="right-panel-hot-classify-text" style="margin: 35px;">
                            <b>루틴 작성</b>
                        </v-list-subheader>
                        <input class="search-bar" v-model="titleInput" placeholder="제목" @keyup.enter="searchBarInput">
                        <div class="routine-add-container">
                            <div class="day-routine-box">
                                <div class="day-routine-box-title">Day 1</div>
                                <!-- <div class="day-routine-subbox">
                                    <div class="exercise-title">바벨 숄더 프레스</div>
                                    <div class="exercise-time">30m</div>
                                </div> -->
                                <div v-for="(exercise, index) in exercises" :key="index" class="day-routine-subbox">
                                    <input v-model="exercise.title" class="exercise-title" placeholder="운동 이름">
                                    <input v-model="exercise.time" class="exercise-time" placeholder="시간">
                                </div>
                                <button v-if="exercises.length < 5" class="day-routine-subbox" @click="addExercise">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23"
                                        fill="none">
                                        <path
                                            d="M23 13.1429H13.1429V23H9.85714V13.1429H0V9.85714H9.85714V0H13.1429V9.85714H23V13.1429Z"
                                            fill="#CCCCCC" />
                                    </svg>
                                </button>
                            </div>
                            <button class="day-routine-box" style="display:flex;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23"
                                    fill="none">
                                    <path
                                        d="M23 13.1429H13.1429V23H9.85714V13.1429H0V9.85714H9.85714V0H13.1429V9.85714H23V13.1429Z"
                                        fill="#CCCCCC" />
                                </svg>
                            </button>

                        </div>
                        <div class="routine-end-container">
                            <!-- enter가 가능하도록 input태그 대신 다른 태그 사용 필요 -->
                            <textarea class="explanation-bar" v-model="expInput" placeholder="설명"
                                @keyup.enter="ExplanationInput"></textarea>

                            <v-btn class="r-submit-button" color="#CD4444" @click="submitData">작성 완료</v-btn>
                            <!-- Add this button -->
                        </div>

                    </v-list>
                </v-card>

                <div style="height: 8px;"></div>

                <v-card class="right-panel-new">
                    <!-- <v-list lines="two" style="background-color: #181B21;">

                        <div style="height: 20px;"></div>

                        <v-list-subheader class="right-panel-hot-classify-text" style="margin-left: 35px;">
                            <b>최신 게시글</b>
                        </v-list-subheader>

                        <div style="height: 20px;"></div>

                        <template v-for="n in 6" :key="n">
                            <v-list-item
                                style="background-color: #1D2128; color: #FFFFFF; margin: 5px; border-radius: 20px; width:99%">

                                <div style="display: flex;">
                                    <v-list-item-title class="right-panel-new-title">
                                        <v-avatar class="right-panel-new-avatar"></v-avatar>
                                        <b style="margin-left:8px;">{{ n }}번째 제목</b>
                                    </v-list-item-title>
                                </div>

                                <div style="height: 10px;"></div>

                                <div class="right-panel-new-content">
                                    <v-list-item-subtitle>
                                        <br>~ 루틴 보여주는 곳 ~<br>
                                    </v-list-item-subtitle>
                                </div>

                            </v-list-item>

                        </template>
                    </v-list> -->
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import WritePage from '@/views/routine-write.vue'

const cards = ['루틴 작성', '최신 게시글']
const links = [
    ['mdi-inbox-arrow-down', 'HOME'],
    ['mdi-send', '루틴 공유'],
    ['mdi-delete', '루틴 작성'],
    ['mdi-alert-octagon', '내 루틴 보관함'],
    ['mdi-alert-octagon', '설정'],
]

const exercises = ref([
    { title: '바벨 숄더 프레스', time: '30m' }
]);

const addExercise = () => {
    if (exercises.value.length < 5) {
        exercises.value.push({ title: '', time: '' });
    }
};

const drawer = ref(null)

const submitData = () => {
    const postData = {
        title: titleInput,
        explanation: expInput,
        // ... other properties ...
    };

    // Assuming you have an API endpoint for data submission
    // Replace 'your_api_endpoint' with the actual URL
    fetch('your_api_endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
        .then(response => response.json())
        .then(data => {
            // Handle success response from the server if needed
            console.log('Data successfully submitted:', data);
        })
        .catch(error => {
            // Handle error if data submission fails
            console.error('Error submitting data:', error);
        });
}


</script>

<script>
export default {
    data: () => ({
        cards: ['Today', 'Yesterday'],
        drawer: null,
        links: [
            ['mdi-inbox-arrow-down', 'HOME'],
            ['mdi-send', '루틴 공유'],
            ['mdi-delete', '루틴 작성'],
            ['mdi-alert-octagon', '내 루틴 보관함'],
            ['mdi-alert-octagon', '설정']
        ],
        // textInput: "",
        titleInput: "",
        expInput: "",
    }),
    components: {
        'WritePage': WritePage
    },
    methods: {
        searchBarInput() {
            console.log(this.titleInput); // Log the entered text to the console
        },
        ExplanationInput() {
            console.log(this.expInput);
        },
    }
}
</script>

<style scoped>
.search-bar {
    color: #FFFFFF;
    border: 2px solid #3A4148;
    background-color: #24272B;
    border-radius: 20px;
    width: 93%;
    /* width: 1150px; */
    height: 60px;
    text-indent: 10px;
    margin: 10px 35px;
}

.explanation-bar {
    color: #FFFFFF;
    border: 2px solid #3A4148;
    background-color: #24272B;
    border-radius: 20px;
    width: 900px;
    height: 178px;
    text-indent: 10px;
    margin: 10px 35px;
    padding-top: 20px;

    /* Prevent users from resizing the textarea */
    resize: none;

}

.search-bar::placeholder {
    font-size: 26px;
    font-weight: bold;
    text-align: left;
    margin-right: 12px;
    padding-top: 10px;
}

.explanation-bar::placeholder {
    font-size: 26px;
    font-weight: bold;
    text-align: left;
    margin-right: 12px;
    /* padding-top: 10px; */
}

.right-panel-hot-classify-text {
    background-color: #181B21;
    color: #FFFFFF;
    font-size: 30px;
    line-height: 30px;
}

.right-panel-hot {
    background-color: #CC8484;
    border-radius: 30px;
}

.right-panel-hot-title {
    background-color: #CC8484;
    border-radius: 20px;
    align-items: center;
    width: 12%;
}

.right-panel-hot-content {
    background-color: #CC8484;
    border-radius: 20px;
    margin: auto;
    height: 100px;
    align-items: center;
    text-align: center;
}

.right-panel-hot-avatar {
    background-color: #FFFFFF;
    margin: auto;
    align-items: center;
    text-align: center;
}

.right-panel-new {
    background-color: #1D2128;
    border-radius: 30px;
}

.right-panel-new-title {
    background-color: #344054;
    border-radius: 20px;
    align-items: center;
    width: 12%;
}

.right-panel-new-content {
    background-color: #344054;
    border-radius: 20px;
    margin: auto;
    height: 100px;
    align-items: center;
    text-align: center;
}

.right-panel-new-avatar {
    background-color: #FFFFFF;
    margin: auto;
    align-items: center;
    text-align: center;
}

/* ---------------------------------------------------------------- */

.routine-add-container {
    display: flex;
    justify-content: center;
    /* width: 1088px; */
    align-items: flex-start;
    gap: 12px;
    margin: 35px 0;
}

.day-routine-box {
    width: 208px;
    height: 600px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #4C6672;
}

.day-routine-box-title {
    color: #FFF;
    font-family: Inter;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin: 25px;

}

.exercise-title,
.exercise-time {
    color: #FFF;
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.day-routine-subbox {
    display: flex;
    padding: 14px 25px;
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
    border-radius: 20px;
    background: #27373E;

    width: 189px;
    height: 84px;
    margin: 10px auto;
}

.day-routine-subbox-plus {
    display: flex;
    padding: 14px 25px;
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
    border-radius: 20px;
    background: #27373E;

    width: 189px;
    height: 84px;
    margin: 10px auto;
}

svg {
    margin: auto;
}

/* ---------------------------------------------------------------- */


.routine-end-container {
    display: flex;
    align-items: flex-start;
    gap: 13px;
}

.r-submit-button {
    display: flex;
    width: 200px;
    height: 178px;
    padding: 68px;
    margin: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 20px;
    color: #FFFFFF;

    font-size: 25px;
    line-height: 25px;
    font-weight: bolder;
}
</style>