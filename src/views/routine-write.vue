<template>
    <v-app id="inspire">
        <!-- 추가 기능 구현 목록 -->
        <!-- 작성된 내용이 있을 때 작성완료 버튼을 누르지 않은 채 페이지를 이동할 때 경고문 띄우기 필요 -->

        <!-- 문제점 -->
        <!-- 화면을 확대했을 때, 5개의 day 루틴이 짤리는 경우 발생, 하단에 스크롤바 활성은 되지만 여전히 짤림 -->
        <!-- 해결책 -->
        <!-- 미디어쿼리 이용하여, 화면이 확대될 때(크롬 80% 이상) routine-add-container의 padding-left:30% 지정하기 -->
        <!-- 또는 routine-add-container의 max-width:100%; 지정 -> center 정렬 깨짐 -->
        <v-main style="background-color: #3B4048;">
            <v-container class="px-2 py-2" fluid>
                <v-card class="right-panel">
                    <v-list lines="two" style="background-color: #181B21;">
                        <v-list-subheader class="right-panel-classify-text" style="margin: 35px;">
                            <b>루틴 작성</b>
                        </v-list-subheader>

                        <v-row>
                            <v-col cols="12">
                                <v-text-field outline class="search-bar" v-model="titleInput" label="제목"
                                    @keyup.enter="searchBarInput" variant="outlined" bg-color="#24272B" color="#3A4148"
                                    rounded="xl" :style="{ 'border-radius': '20px !important' }"></v-text-field>
                                <v-alert v-if="showWarning" type="error" class="warning-message" outlined>
                                    제목을 작성해주세요.
                                </v-alert>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12">
                                <div class="routine-add-container">
                                    <div class="day-routine-box" v-for="(box, dayindex) in boxes" :key="dayindex">
                                        <div class="day-routine-box-title">Day {{ dayindex + 1 }}
                                            <v-btn class="delete-button" @click="deleteDayBox(dayindex)" elevation="0">
                                                <!--  elevation="0" 을 사용하여 배경 그림자 제거 -->
                                                <v-icon size="24">
                                                    mdi-delete
                                                </v-icon>
                                            </v-btn>
                                        </div>

                                        <div v-for="(exercise, index) in box.exercises" :key="index"
                                            class="day-routine-subbox">
                                            <!-- <v-text-field v-model="exercise.title" class="exercise-title" label="운동 이름"
                                                readonly></v-text-field>
                                            <v-text-field v-model="exercise.time" class="exercise-time" label="시간"
                                                readonly></v-text-field> -->

                                            <!-- <textarea v-model="exercise.title" class="exercise-title" placeholder="운동 이름"
                                                readonly></textarea> -->
                                            <input v-model="exercise.ExerciseArea" class="exercise-title"
                                                placeholder="운동 부위" readonly>
                                            <input v-model="exercise.ExerciseName" class="exercise-time" placeholder="운동 이름"
                                                readonly>
                                            <div class="icon-box">
                                                <v-btn class="edit-button" @click="editExercise(exercise)" elevation="0">
                                                    <img width="24" height="24"
                                                        src="https://img.icons8.com/fluency-systems-filled/24/FFFFFF/pencil-tip.png"
                                                        alt="pencil-tip" />
                                                </v-btn>
                                                <v-btn class="delete-button" @click="deleteExercise(box, index)"
                                                    elevation="0">
                                                    <img width="24" height="24"
                                                        src="https://img.icons8.com/ios-glyphs/24/FFFFFF/filled-trash.png"
                                                        alt="filled-trash" />
                                                </v-btn>
                                            </div>
                                        </div>

                                        <!-- <v-btn v-if="box.exercises.length < 5" class="day-routine-subbox"
                                            @click="addExercise(box)">
                                            <v-icon color="white">
                                                mdi-plus
                                            </v-icon>
                                        </v-btn> -->
                                        <!-- <ModalComponent v-if="showModal" :showModal="showModal" :box="activeBox"
                                            :exerciseData="editExerciseData" :isEditModal="isEditModal"
                                            @close-modal="showModal = false; isEditModal = false" /> -->
                                        <Modal v-if="box.exercises.length < 5" @exercise-selected="updateExerciseData">
                                        </Modal>
                                    </div>
                                    <!-- <v-btn v-if="boxes.length < 5" class="day-routine-box" style="display:flex;"
                                        @click="addDayBox">
                                        <v-icon color="white">
                                            mdi-plus
                                        </v-icon>
                                    </v-btn> -->
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
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12" class="routine-end-container">
                                <v-textarea class="explanation-bar" v-model="expInput" label="설명" bg-color="#24272B"
                                    color="#3A4148" clearable no-resize rows="6" row-height="25" variant="outlined"
                                    rounded="xl"></v-textarea>
                                <!-- <v-btn class="r-submit-button" :style="{ filter: showModal ? 'brightness(30%)' : 'none' }"
                                    color="#CD4444" @click="submitData" :disabled="showModal">작성 완료</v-btn> -->
                                <v-btn class="r-submit-button" color="#CD4444" @click="submitData">작성 완료</v-btn>
                            </v-col>
                        </v-row>
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
import Modal from '@/components/Write-Modal02.vue';

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
            selectedExerciseArea: '', // 선택한 운동 부위를 저장할 데이터 속성 추가
            selectedExerciseName: '', // 선택한 운동 이름을 저장할 데이터 속성 추가
            // showModal: false,

            // activeBox: null,
            drawer: null,
            titleInput: '',
            expInput: '',

            showWarning: false,

            // editExerciseData: null, // Exercise data to edit
            // isEditModal: false,    // Flag to control whether the modal is in edit mode
        };
    },
    components: {
        WritePage,
        ModalComponent,
        Modal,
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
                // this.activeBox = box;
                // this.showModal = true;
            }
        },

        deleteExercise(box, index) {
            box.exercises.splice(index, 1);
        },
        // editExercise(exercise) {
        //     // Set the exercise data to edit
        //     // this.editExerciseData = exercise;
        //     // this.isEditModal = true; // Show the modal in edit mode
        //     // this.showModal = true; // Ensure the modal is displayed
        // },
        addDayBox() {
            if (this.boxes.length < 5) {
                this.boxes.push({ exercises: [] });
            }
        },
        deleteDayBox(dayindex) {
            // 해당 인덱스의 day-routine-box를 삭제합니다.
            this.boxes.splice(dayindex, 1);
        },
        // onModalClose(updatedExercise) {
        //     if (updatedExercise) {
        //         // Update the exercise data in the main component
        //         if (this.isEditModal) {
        //             // Find and update the existing exercise data
        //             const exerciseIndex = this.activeBox.exercises.findIndex(
        //                 exercise => exercise === this.editExerciseData
        //             );
        //             if (exerciseIndex !== -1) {
        //                 this.activeBox.exercises[exerciseIndex] = updatedExercise;
        //             }
        //         } else {
        //             // Add the new exercise data
        //             this.activeBox.exercises.push(updatedExercise);
        //         }
        //     }
        //     // this.showModal = false;
        //     this.isEditModal = false;
        // },
        // addDayBox() {
        //     if (this.boxes.length < 5) {
        //         this.boxes.push({ exercises: [] });
        //     }
        // },
        updateExerciseData(data) {
            // Modal에서 emit한 이벤트를 처리하는 메서드
            this.selectedExerciseArea = data.ExerciseArea;
            this.selectedExerciseName = data.ExerciseName;
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
                    const warningMessage = this.$el.querySelector('.warning-message');
                    if (warningMessage) {
                        warningMessage.scrollIntoView({
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
.v-row {
    /* 스크롤바 보이는 현상 해결*/
    margin: 0;
}

.search-bar {
    color: #FFFFFF;
    height: 60px;
    text-indent: 10px;
    margin: 10px 35px;
}

.search-bar::placeholder {
    font-size: 26px;
    font-weight: bold;
    text-align: left;
    margin-right: 12px;
    padding-top: 10px;
}



.right-panel-classify-text {
    background-color: #181B21;
    color: #FFFFFF;
    font-size: 30px;
    line-height: 30px;
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
    min-width: 208px;
    height: max-content;
    min-height: 450px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #4C6672;
    margin: 0px 10px;
    overflow: hidden;
}

.day-routine-box-title {
    color: #FFF;
    font-family: Inter;
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 25px;

    display: flex;
    justify-content: space-between;
}


.exercise-title,
.exercise-time {
    color: #FFF;
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;

    white-space: normal !important;
    /* 기본 줄바꿈 설정을 적용합니다 */
    overflow: visible !important;
    /* 내용이 넘치더라도 숨기지 않도록 설정합니다 */
}

.day-routine-subbox {
    display: flex;
    padding: 10px 25px;
    flex-direction: column;
    align-items: inherit;
    /* inherit으로 수정 */
    gap: 7px;
    border-radius: 20px;
    background: #27373E;

    width: 189px;
    /* height: 104px; */
    min-height: 100px;
    /* 104px로 수정 */
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
    justify-content: center;
    gap: 13px;
}


.explanation-bar {
    color: #FFFFFF;
    text-indent: 10px;
    margin: 0px 35px;
    padding-top: 20px;
}

.explanation-bar::placeholder {
    font-size: 26px;
    font-weight: bold;
    text-align: left;
    margin-right: 12px;
    /* padding-top: 10px; */
}

.r-submit-button {
    display: flex;
    width: 200px;
    height: 178px;
    padding: 68px;
    margin: 20px 10px;
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
    /* color: #CD4444; */
    /* Set the color of the warning message */
    /* font-size: 16px; */
    margin: 0 35px;
}

.icon-box {
    display: flex;
    justify-content: center;
}

/* 삭제 버튼 스타일 */
.delete-button {
    color: #FFF;
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 10px;
    width: fit-content;
    /* 필요한 경우 여백 조정 */
}

.edit-button {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 10px;
    width: fit-content;
}
</style>