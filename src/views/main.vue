<template>
<div class="ex1">
    <Login />
    <div class="ex1_center_text">오늘의 운동 진행률</div>

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
<!--버튼-->
<div class="ex3">
    <div class="btn">
        <div data-bs-toggle="modal" data-bs-target="#routinedatamodal" style="margin-top: 10px;">+</div>
    </div>
</div>
<!--모달내용-->
<div class="modal fade" id="routinedatamodal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="routinedatamodal">내가 담은 루틴</h5>
                    </div>
                    <div class="modal-body">
                        <div v-if="userData">
          <div v-for="routine in userData" :key="routine.id" class="routine-item">
            {{ routine.name }} <!-- 루틴 데이터의 'name' 필드를 가정하고 있습니다. -->
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
import { ref } from 'vue';

const showmodal = ref(false);

const dialog = ref(false); //모달창이 열려있는지 여부를 나타냄
const userData = ref(null); //유저 데이터를 담는 ref

const reverseMessage = () => {
  store.commit('reverseMessage');
};
const fetchUserData = async () => {
  try {
    const response = await axios.get('http://52.78.77.1:8000/routine/box/', {
      params: {
        user_routine_id: 0,
        routine_id: 0
      }
    });
    userData.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
</script>

<script>
import Login from '@/components/Login.vue';
import { ref } from 'vue';
import { store } from '@/store/index'; // Vuex 스토어를 가져옴

  export default {
    components : {
        Login
    },
    setup() {
        const showmodal = ref(false);

        const login = () => {
        store.commit('login'); // 로그인 액션을 호출하여 상태 변경
        };

        const logout = () => {
        store.commit('logout'); // 로그아웃 액션을 호출하여 상태 변경
        };

        return {
            showmodal,
            login,
            logout,
            showmodal
        };
    }
};
</script>

<style scoped>
.ex1 {
        position: relative;
        background-color: #181B21;
        border-radius: 20px;
        height: 520px;
        margin-bottom: 10px;
}
.ex1_center_text {
    position: relative;
    text-align: center;
    color: white;
    font-size: 40px;
    padding-top: 50px;
    font-weight: bold;
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
    height: 290px;
    margin-top: 110px;
    margin-left: 10px;
    float: left;
}
.box1_text {
    position: relative;
    color: white;
    font-size: 40px;
    padding-bottom: 100px;
}

.box2 {
    position: relative;
    background-color: #C75B6F;
    border-radius: 20px;
    width: 420px;
    height: 290px;
    margin-top: 110px;
    margin-left: 10px;
    float: left;
}
.box2_text {
    position: relative;
    color: white;
    font-size: 40px;
    padding-bottom: 100px;
}

.box3 {
    position: relative;
    background-color: #8EC693;
    border-radius: 20px;
    width: 420px;
    height: 290px;
    margin-top: 110px;
    margin-left: 10px;
    float: left;
}
.box3_text {
    position: relative;
    color: white;
    font-size: 40px;
    padding-bottom: 100px;
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
</style>