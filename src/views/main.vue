<template>
    <div class="ex1">
        <div class="container">
            <v-btn @click="$router.push('/write')" div class="box1">
                <div class="box1_text">루틴 작성하기</div>
            </v-btn>
            <v-btn @click="$router.push('/')" div class="box2">
                <div class="box2_text">루틴 보관함</div>
            </v-btn>
            <v-btn @click="$router.push('/share')" div class="box3">
                <div class="box3_text">루틴 공유하기</div>
            </v-btn>
        </div>
    </div>

    <div class="ex3">
        <div class="btn" v-if="!ROUTINE_ID">
            <div data-bs-toggle="modal" data-bs-target="#routinedatamodal" style="margin-top: 10px;" @click="onModalShow">
                <i class="bi bi-search"></i>
            </div>
        </div>
        <div class="daily" v-if="ROUTINE_ID">
            <!-- 루틴 아이디에 따른 exercise detail 불러오기 작업 필요 -->
        </div>
    </div>

    <!-- 모달내용 -->
    <div class="modal fade" id="routinedatamodal" tabindex="-1"> <!--@show="onModalShow"-->
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">내가 담은 루틴</h5> <!--id="routinedatamodal"-->
                </div>
                <div class="modal-body" id="routin-table">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Routine ID</th>
                                <th scope="col">User Routin ID</th>
                                <th scope="col">상세</th>
                                <th scope="col"></th>
                                <!-- <th scope="col">수정</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="userData" v-for="( routine, index ) in  userData " :key="index">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ routine.routine }}</td>
                                <td>{{ routine.user }}</td>
                                <td>
                                    <button @click="showRoutineId(routine)">더보기</button>
                                </td>
                                <td>
                                    <v-btn elevation="1" data-bs-dismiss="modal" @click="saveRoutineId(routine)">
                                        선택
                                    </v-btn>
                                </td>
                                <!-- <td>
                                <button @click="editRoutine(routine)">수정버튼</button>
                            </td> -->
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="selectedRoutine">
                        <div class="goback-btn">
                            <button @click="goBack" id="goback">접기</button>
                        </div>
                        <div class="card">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Routine ID: {{ selectedRoutine.routine_id }}</li>
                                <li class="list-group-item">Routine Name: {{ selectedRoutine.routine_name }}</li>
                                <li class="list-group-item">Routine Comment: {{ selectedRoutine.routine_comment }}</li>
                                <li class="list-group-item">Recommend Count: {{ selectedRoutine.recommend_count }}</li>
                                <li class="list-group-item">Routine Day: {{ selectedRoutine.routine_day }}</li>
                                <li class="list-group-item">Nickname: {{ selectedRoutine.nickname }}</li>
                                <li class="list-group-item">Created At: {{ selectedRoutine.created_at }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" data-bs-dismiss="modal" class="close-btn">닫기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
//import { store } from '@/store';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const userData = ref(null);
const selectedRoutine = ref(null);

const router = useRouter();
const store = useStore(); // 밖으로 빼서 선언해야함.

const ROUTINE_ID = ref(false);

watchEffect(() => {
    const storedRoutineId = localStorage.getItem('routineId');

    // Check if routineId is set in localStorage
    if (storedRoutineId) {
        // Update ROUTINE_ID to true
        ROUTINE_ID.value = true;
    } else {
        // Update ROUTINE_ID to false if routineId is not set
        ROUTINE_ID.value = false;
    }
});


const onModalShow = () => {
    fetchRoutineData();
};

onMounted(async () => {
    try {
        await fetchRoutineData();
    } catch (error) {
        console.error(error);
    }
});

const fetchRoutineData = async () => {
    try {
        const response = await axios.get('/api/routine/box/check/');
        userData.value = response.data;
        console.log('Received userData:', userData.value);
    } catch (error) {
        console.error(error);
        userData.value = [];
    }
};
const showRoutineId = async (routine) => {
    try {
        const routineId = routine.routine; // Assuming routine ID is extracted correctly
        const apiUrl = `/api/routine/check/${routineId}/`; // Your API address

        const response = await axios.get(apiUrl);
        console.log('Response from fetchRoutineId:', response);

        if (!response || !response.data) {
            console.error('Invalid response data');
            return;
        }

        // Display routine details in the modal
        console.log('Routine ID:', response.data.routine_id);
        console.log('Routine Name:', response.data.routine_name);

        selectedRoutine.value = response.data;
    } catch (error) {
        console.error('Error occurred while loading routine ID:', error);
        throw error;
    }
};

const saveRoutineId = async (routine) => {
    try {
        const routineId = routine.routine;
        // Access the store directly from the context
        store.commit('setChosenRoutineId', routineId);  // 루틴 아이디 상태관리 변수에 저장
        // localStorage에 routineId 저장(새로고침, 페이지 이동, 창 끄기 방지)
        localStorage.setItem('routineId', routineId);
        location.reload();  // 페이지 새로고침
    } catch (error) {
        console.error('Error occurred while saving routine ID:', error);
        throw error;
    }
}

const goBack = () => {
    selectedRoutine.value = null;
};

// const router = useRouter();

// const editRoutine = async (routine) => {
//   try {
//     const routineId = routine.routine;
//     // Assuming your edit route is named 'edit'
//     router.push({ name: 'edit', params: { id: routineId } });
//   } catch (error) {
//     console.error('Error navigating to edit page:', error);
//   }
// };

</script>

<style scoped>
.ex1 {
    position: relative;
    background-color: #181B21;
    border-radius: 20px;
    height: 490px;
    margin-bottom: 10px;
}

/*-------------------------------- 위에 박스 세개---------------------------- */
.container {
    display: flex;
}

.box1 {
    position: relative;
    background-color: #6790CE;
    border-radius: 20px;
    width: 420px;
    height: 400px;
    margin-top: 50px;
    margin-left: 10px;
    float: left;
}

.box1_text {
    position: relative;
    color: white;
    font-size: 40px;
    padding-bottom: 50px;
}

.box2 {
    position: relative;
    background-color: #C75B6F;
    border-radius: 20px;
    width: 420px;
    height: 400px;
    margin-top: 50px;
    margin-left: 10px;
    float: left;
}

.box2_text {
    position: relative;
    color: white;
    font-size: 40px;
    padding-bottom: 50px;
}

.box3 {
    position: relative;
    background-color: #8EC693;
    border-radius: 20px;
    width: 420px;
    height: 400px;
    margin-top: 50px;
    margin-left: 10px;
    float: left;
}

.box3_text {
    position: relative;
    color: white;
    font-size: 40px;
    padding-bottom: 50px;
}

/* ------------------------------위에 박스 세개 ---------------------------*/
.ex3 {
    background-color: #181B21;
    border-radius: 20px;
    height: 650px;
    margin-bottom: 10px;
}

/* ----------------------모달 ------------------------------------*/
.btn {
    position: relative;
    background-color: #55B570;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    color: white;
    font-size: 40px;
    top: 250px;
    margin-left: 600px;
}

.modal-content {
    background-color: #181B21;
    width: 1100px;
    height: 600px;
    border-radius: 20px;
}

.modal-title {
    font-size: 30px;
    color: white;
    padding-top: 25px;
}

.close-btn {
    color: white;
    font-size: 20px;
    margin: 0 auto;
}

.object {
    background-color: #3D5143;
    border-radius: 20px;
    padding: 80px;
    margin-top: 30px;
    color: white;
}

.login {
    color: white;
}

#routin-table {
    background-color: white;
}

.login-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.modal {
    transition: opacity 0.5s ease;
}

.modal.fade:not(.show) {
    opacity: 0;
}
</style>