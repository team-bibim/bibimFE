<template>
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer" class="left-panel">

      <div style="height: 50px;"></div>

      <v-list>
        <v-list-item v-for="(link, index) in links" :key="index">
          <router-link :to="link[2]" class="left-panel-box">
            <v-list-item-content>
              <v-list-item-title @click="loginCheck" class="left-panel-text">{{ link[1] }}</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
        <button type="submit" v-if="!getToken" @click="login" class="login-btn">로그인</button>
        <button type="submit" v-if="getToken" @click.prevent="logout" class="logout-btn">로그아웃</button>
      </v-list>

      <div style="height:50px;"></div>

      <div class="text-center" style="color: #FFFFFF; font-size:10;">
        이용약관<br>개인정보처리방침<br>2023 Seeds Bibim
      </div>

    </v-navigation-drawer>

    <v-main style="background-color: #3B4048;">
      <v-container class="px-5" fluid>
        <router-view></router-view> <!-- 각 페이지를 보여주는 곳 -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const cards = ['루틴 작성', '최신 게시글']
const links = [
  ['mdi-inbox-arrow-down', 'HOME', '/main'],    /* 3번째 변수(route) 추가 */
  ['mdi-send', '루틴 공유', '/share'],
  ['mdi-delete', '루틴 작성', '/write'],
  //['mdi-alert-octagon', '내 루틴 보관함', '/'],
  ['mdi-alert-octagon', '마이페이지', '/mypage'],
  //['mdi-alert-octagon', '로그인', '/login'],
]

const drawer = ref(null)
</script>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

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
  }),
  computed: {
    ...mapGetters(['getToken']),
  },
  methods: {
    async logout() {
      try {
        await axios.delete('/api/accounts/auth/');

        this.$store.dispatch('logout');
        this.$router.push('/login');

        localStorage.clear(); // 로컬저장소 초기화(routineId 초기화)
      } catch (error) {
        console.error('로그아웃 실패', error);
        alert('로그아웃 실패');
      }
    },
    async login() {
      try {
        this.$router.push('/login');
      } catch (error) {
        console.error('로그인 실패', error);
        alert('로그인 실패');
      }
    },
    async loginCheck(event) {
      const token = this.getToken;

      if (!token) {
        alert('로그인이 필요합니다!');
        event.preventDefault();
        this.$router.push('/login');

      }
    }
  }
}
</script>

<style>
/* -----------------------------------좌측 영역 ------------------------------------- */
.left-panel {
  background-color: #181B21;
  border-radius: 0px 20px 20px 0px;
}

.left-panel-text {
  /* color: #FFFFFF; */
  /* hover 효과 적용 위해 임시 주석 처리 */
  text-align: center;
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
}

.v-list-item-title.left-panel-text {
  color: white;
}

.left-panel-box {
  text-decoration: none;

}

/* 좌측 영역의 메뉴 마우스 올려놓았을때 색상 변경*/
.v-list-item-title.left-panel-text:hover {
  color: #77C3EE;
  transition: color 0.5s ease;
}

.v-list-item-title.left-panel-text:not(:hover) {
  color: #FFFFFF;
  transition: color 0.5s ease;
}

.login-btn {
  padding: 10px 20px;
  margin-left: 33%;
  margin-top: 10%;
  background-color: #007bff !important;
  color: #ffffff !important;
  border: none;
  border-radius: 5px !important;
  font-size: 16px;
  cursor: pointer;
}

.logout-btn {
  padding: 10px 20px;
  margin-left: 30%;
  margin-top: 10%;
  background-color: #007bff !important;
  color: #ffffff !important;
  border: none;
  border-radius: 5px !important;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3
}

/* -----------------------------------우측 영역 ------------------------------------- */

.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
  /* 박스 스타일 조정 */
  border-radius: 20px;
  background-color: #181B21;
  padding: 10px;
}
</style>