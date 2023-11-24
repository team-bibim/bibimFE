<template>
    <login-component></login-component>
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
        <div id="routineid" v-if="selectedRoutine">
      <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Routine ID: {{ selectedRoutine.routine_id }}</li>
          <li class="list-group-item">Routine Name: {{ selectedRoutine.routine_name }}</li>
          <li class="list-group-item">Routine Comment: {{ selectedRoutine.routine_comment }}</li>
          <li class="list-group-item">Recommend Count: {{ selectedRoutine.recommend_count }}</li>
          <li class="list-group-item">Routine Day: {{ selectedRoutine.routine_day }}</li>
          <li class="list-group-item">Nickname: {{ selectedRoutine.nickname }}</li>
          <li class="list-group-item">Created At: {{ selectedRoutine.created_at }}</li>
          <!-- 추가로 표시할 데이터가 있다면 여기에 계속 추가 -->
        </ul>
      </div>
    </div>
    <div class="btn"> <!-- 모달 열기 버튼-->
            <div data-bs-toggle="modal" data-bs-target="#routinedatamodal" style="margin-top: 10px;" @click="onModalShow">+</div>
        </div>
</div>

<!-- 모달내용 -->
    <div class="modal fade" id="routinedatamodal" tabindex="-1"> <!--@show="onModalShow"-->
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="routinedatamodal">내가 담은 루틴</h5>
                </div>
            <div class="modal-body" id="routin-table">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Routine ID</th>
                        <th scope="col">User Routin ID</th>
                        <th scope="col">버튼</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="userData" v-for="(routine, index) in userData" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                            <td>{{ routine.routine }}</td>
                            <td>{{ routine.user }}</td>
                            <td> <!--상세보기 버튼 클릭후 모달창이 닫히고 그것에 대한 routineid가 들어와야함-->
                                <button @click="showRoutineId(routine)">상세 보기</button>
                            </td>
                        </tr>
                    </tbody>  
                </table>
            </div>
                <div class="modal-footer">
                    <button type="button" data-bs-dismiss="modal" class="close-btn">닫기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoginComponent from './LoginView.vue'; // 실제 파일 경로로 변경

export default {
    components: {
        'login-component': LoginComponent,
    },
};
</script>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { store } from '@/store';


const showmodal = ref(false);
const userData = ref(null);
const selectedRoutine = ref(null);

watch(selectedRoutine, (newVal, oldVal) => {
    console.log('Selected Routine changed:', newVal);   
    showmodal.value = !!newVal;

});

const onModalShow = () => {
    fetchRoutineData();
    selectedRoutine.value = null;
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
    console.log('Clicked Routine ID:', routine);
    // console.log('All User Data:', userData.value);
    try {
        await store.dispatch('fetchRoutineId', routine.routine);
        const response = await store.dispatch('fetchRoutineId', routine.routine);
        console.log('Response from fetchRoutineId:', response);

        if (!response || !response.data) {
        return;
        }

        selectedRoutine.value = response.data;
        if (showmodal.value) {
            showmodal.value = false;
        }
      } catch (error) {
        console.error('루틴 ID를 불러오는 중 에러 발생:', error);
        throw error;
      }
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
</style>