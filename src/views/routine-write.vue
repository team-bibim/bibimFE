<template>
    <v-app id="inspire">
        <!-- 추가 기능 구현 목록 -->
        <!-- 작성된 내용이 있을 때 작성완료 버튼을 누르지 않은 채 페이지를 이동할 때 경고문 띄우기 필요 -->
        <!-- 각 루틴안의 운동 및 루틴(day)의 삭제 기능 구현 -->

        <!-- 문제점 -->
        <!-- 화면을 확대했을 때, 5개의 day 루틴이 짤리는 경우 발생, 하단에 스크롤바 활성은 되지만 여전히 짤림 -->
        <v-main style="background-color: #3B4048;">
            <v-container class="px-2 py-2" fluid>
                <v-card class="right-panel-hot">
                    <v-list lines="two" style="background-color: #181B21;">
                        <v-list-subheader class="right-panel-hot-classify-text" style="margin: 35px;">
                            <b>루틴 작성</b>
                        </v-list-subheader>
                        <div style="display:flex; justify-content: center;">
                            <input class="search-bar" v-model="titleInput" placeholder="제목" @keyup.enter="searchBarInput"
                                ref="warningMessage">
                        </div>
                        <div v-if="showWarning" class="warning-message">
                            제목을 작성해주세요.
                        </div>

                        <div class="routine-add-container">
                            <div class="day-routine-box" v-for="(box, dayindex) in boxes" :key="dayindex">
                                <div class="day-routine-box-title">Day {{ dayindex + 1 }}</div>
                                <div v-for="(exercise, index) in box.exercises" :key="index" class="day-routine-subbox">
                                    <input v-model="exercise.title" class="exercise-title" placeholder="운동 이름" readonly>
                                    <input v-model="exercise.time" class="exercise-time" placeholder="시간" readonly>
                                </div>
                                <button v-if="box.exercises.length < 5" class="day-routine-subbox"
                                    @click="addExercise(box)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23"
                                        fill="none">
                                        <path
                                            d="M23 13.1429H13.1429V23H9.85714V13.1429H0V9.85714H9.85714V0H13.1429V9.85714H23V13.1429Z"
                                            fill="#CCCCCC" />
                                    </svg>
                                </button>
                                <ModalComponent v-if="showModal" :showModal="showModal" :box="activeBox"
                                    @close-modal="showModal = false" />
                            </div>
                            <button v-if="boxes.length < 5" class="day-routine-box" style="display:flex;"
                                @click="addDayBox">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23"
                                    fill="none">
                                    <path
                                        d="M23 13.1429H13.1429V23H9.85714V13.1429H0V9.85714H9.85714V0H13.1429V9.85714H23V13.1429Z"
                                        fill="#CCCCCC" />
                                </svg>
                            </button>
                        </div>
                        <div class="routine-end-container">
                            <textarea class="explanation-bar" v-model="expInput" placeholder="설명"
                                @keyup.enter="submitData"></textarea>
                            <v-btn class="r-submit-button" :style="{ filter: showModal ? 'brightness(30%)' : 'none' }"
                                color="#CD4444" @click="submitData" :disabled="showModal">작성 완료</v-btn>
                        </div>
                    </v-list>
                </v-card>
                <div style="height: 8px;"></div>
            </v-container>
        </v-main>
    </v-app>
</template>
  

<script>
//import { ref } from 'vue';
import WritePage from '@/views/routine-write.vue';
import ModalComponent from '@/components/Write-Modal.vue';

export default {
    data() {
        return {
            cards: ['루틴 작성', '최신 게시글'],
            links: [
                ['mdi-inbox-arrow-down', 'HOME'],
                ['mdi-send', '루틴 공유'],
                ['mdi-delete', '루틴 작성'],
                ['mdi-alert-octagon', '내 루틴 보관함'],
                ['mdi-alert-octagon', '설정'],
            ],
            exercises: [
                //{ title: '바벨 숄더 프레스', time: '30m' },
            ],
            boxes: [],
            showModal: false,
            activeBox: null,
            drawer: null,
            titleInput: '',
            expInput: '',
            showWarning: false,
        };
    },
    components: {
        WritePage,
        ModalComponent,
    },
    methods: {
        searchBarInput() {
            console.log(this.titleInput);
        },
        ExplanationInput() {
            console.log(this.expInput);
        },
        addExercise(box) {
            if (box.exercises.length < 5) {
                this.activeBox = box;
                this.showModal = true;
            }
        },
        addDayBox() {
            if (this.boxes.length < 5) {
                this.boxes.push({ exercises: [] });
            }
        },
        submitData() {
            // 각 day-routine-box를 확인하고 비어있는지 여부를 판단합니다.
            const emptyBoxes = this.boxes.filter(box => box.exercises.length === 0);

            if (emptyBoxes.length > 0) {
                // 비어있는 day-routine-box가 하나 이상 있다면 경고 메시지를 표시합니다.
                const emptyBoxNumbers = emptyBoxes.map((box, index) => `Day ${this.boxes.indexOf(box) + 1}`).join(', ');
                alert(`${emptyBoxNumbers}의 루틴 작성을 완료해주세요.`);  //비어 있는 상자의 번호를 가져와 쉼표로 구분된 문자열로 변환
            }
            else if (this.titleInput.trim() === '') {
                // 제목 입력란이 비어있을 때 경고 메시지를 표시합니다.
                this.showWarning = true;

                // Scroll to the warning message
                // Vue 컴포넌트가 완전히 마운트된 후에 refs를 사용하여 경고 메시지로 스크롤합니다.
                this.$nextTick(() => {
                    // Scroll to the warning message
                    if (this.$refs.warningMessage) {
                        this.$refs.warningMessage.scrollIntoView({
                            behavior: 'smooth', // 스크롤 동작을 "auto" 또는 "smooth"로 설정할 수 있습니다.
                            block: 'start',     // 요소의 맨 위로 스크롤합니다.
                        });
                    }
                });

            }
            else {
                // 제목 입력란이 비어 있지 않은 경우 데이터 제출을 진행합니다.
                this.showWarning = false; // 경고 메시지를 숨깁니다.

                const postData = {
                    title: this.titleInput,
                    explanation: this.expInput,
                    // ... other properties ...
                };

                // Assuming you have an API endpoint for data submission
                // 데이터 제출을 위한 POST 요청을 보냅니다. (API 엔드포인트를 사용해야 합니다.)

                // Replace 'your_api_endpoint' with the actual URL
                // 데이터 제출을 위해 fetch() 또는 axios를 사용하여 API 엔드포인트로 요청을 보냅니다.
                fetch('your_api_endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Data successfully submitted:', data);
                    })
                    .catch(error => {
                        console.error('Error submitting data:', error);
                    });
            }
        },

    },
    watch: {
        // titleInput의 변경을 감시합니다.
        titleInput(newTitleInput) {     // ()안은 변경된 새로운 값
            if (newTitleInput.trim() !== '') {
                // 제목 입력란이 더 이상 비어 있지 않으면 경고 메시지를 숨깁니다.
                this.showWarning = false;
            }
        },
    },
};
</script>

<style scoped>
.search-bar {
    color: #FFFFFF;
    border: 2px solid #3A4148;
    background-color: #24272B;
    border-radius: 20px;
    width: 100%;
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
    margin: 0px 10px;
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

/*  readonly 속성이 적용된 input 요소가 포커스를 받았을 때(클릭했을때) 테두리 스타일을 제거 */
.day-routine-subbox input[readonly]:focus {
    outline: none;
}

svg {
    margin: auto;
}

/* ---------------------------------------------------------------- */


.routine-end-container {
    display: flex;
    /* align-items: flex-start; */
    justify-content: center;
    gap: 13px;
}

.r-submit-button {
    display: flex;
    width: 200px;
    height: 178px;
    padding: 68px;
    margin: 10px;
    margin-right: 35px;
    /* ↓설명칸과 제출버튼간의 간격 조정 */
    margin-left: -10px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 20px;
    color: #FFFFFF;

    font-size: 25px;
    line-height: 25px;
    font-weight: bolder;
}

.explanation-bar {
    width: 100%;
}

/* ----------------routine-write.design.css 파일 옮겨옴---------------- */
.routine-write-top {
    color: #FFFFFF;
    font-size: 30px;
    line-height: 30px;
    font-weight: bolder;
    margin: 20px;
}

.routine-write-title {
    /* 제목 작성부분 디자인 */
    background-color: #24272B;
    border: 2px solid #3A4148;
    height: 60px;
    margin: 20px;
    border-radius: 20px;

    /* 글씨 색깔 변경*/
    color: #919BA9;
    font-weight: bolder;
    font-size: larger;
    /* 텍스트 좌측 정렬 */
    text-align: left;
    line-height: 60px;
    padding-left: 20px;
}

.v-list-item.v-theme--light.v-list-item--density-default.v-list-item--two-line.v-list-item--variant-text {
    width: 200px;
}

.warning-message {
    color: #CD4444;
    /* Set the color of the warning message */
    font-size: 16px;
    margin: 0 35px;
    padding-left: 10px;
}
</style>