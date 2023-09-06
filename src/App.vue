<template>
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer" class="left-panel">

      <div style="height: 50px;"></div>

      <v-list>
        <v-list-item v-for="(link, index) in links" :key="index">
          <router-link :to="link[2]" class="left-panel-box">
            <v-list-item-content>
              <v-list-item-title class="left-panel-text">{{ link[1] }}</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
      </v-list>

      <div style="height:50px;"></div>

      <div class="text-center" style="color: #FFFFFF; font-size:10;">
        이용약관<br>개인정보처리방침<br>2023 Seeds Bibim
      </div>

    </v-navigation-drawer>

    <v-main style="background-color: #3B4048;">
      <v-container class="px-5" fluid>

        <router-view></router-view> <!-- 각 페이지를 보여주는 곳 -->

        <!-- <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card class="right-panel">
              <div class="routine-write-top">루틴작성</div>
              <div class="routine-write-title">제목</div>
              <v-list lines="two" style="background-color: #181B21;">

                <template v-for="n in 5" :key="n">
                  <v-list-item style="background-color: #834B4B; color: #FFFFFF; margin: 10px; border-radius: 20px;">

                    <template v-slot:prepend>
                      <v-avatar color="#CC8484"></v-avatar>
                    </template>

                    <v-list-item-title>
                      안뇽 {{ n }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      <br>~ 루틴 보여주는 곳 ~<br>
                    </v-list-item-subtitle>
                  </v-list-item>

                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row> -->
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
  ['mdi-alert-octagon', '내 루틴 보관함', '/'],
  ['mdi-alert-octagon', '설정', '/'],
]

const drawer = ref(null)
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
  })
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

/* -----------------------------------우측 영역 ------------------------------------- */

.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
  /* 박스 스타일 조정 */
  border-radius: 20px;
  background-color: #181B21;
  padding: 10px;
}
</style>