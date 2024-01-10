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
        <div class="btn">
            <div data-bs-toggle="modal" data-bs-target="#routinedatamodal" style="margin-top: 10px;" @click="onModalShow">
                <i class="bi bi-search"></i>
            </div>
        </div>
</div>

<!-- 모달내용 -->
    <div class="modal fade" id="routinedatamodal" tabindex="-1"> 
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">내가 담은 루틴</h5> 
                </div>
            <div class="modal-body" id="routin-table">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Routine ID</th>
                        <th scope="col">User Routin ID</th>
                        <th scope="col">상세</th>
                        <!-- <th scope="col">수정</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="userData" v-for="(routine, index) in userData" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                            <td>{{ routine.routine }}</td>
                            <td>{{ routine.user }}</td>
                            <td>
                                <button @click="showRoutineId(routine)">더보기</button>
                            </td>
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
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRouter } from 'vue-router';



const userData = ref(null);
const selectedRoutine = ref(null);

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
        // console.log('Received userData:', userData.value);
    } catch (error) {
        console.error(error);
        userData.value = [];
    }
}
const showRoutineId = async (routine) => {
  try {
    const routineId = routine.routine; 
    const apiUrl = `/api/routine/check/${routineId}/`; 

    const response = await axios.get(apiUrl);
    console.log('Response from fetchRoutineId:', response);

    if (!response || !response.data) {
      console.error('Invalid response data');
      return;
    }

    console.log('Routine ID:', response.data.routine_id);
    console.log('Routine Name:', response.data.routine_name);

    selectedRoutine.value = response.data;
  } catch (error) {
    console.error('Error occurred while loading routine ID:', error);
    throw error;
  }
};

const goBack = () => {
  selectedRoutine.value = null;
};

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