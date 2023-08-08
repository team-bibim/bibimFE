<template>
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer" class="left-panel">

      <div style="height: 100px;"></div>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>

          <v-list-item-title class="left-panel-text">
            {{ text }}
          </v-list-item-title>

        </v-list-item>
      </v-list>

      <div style="height:50px;"></div>

      <div class="text-center" style="color: #FFFFFF; font-size:10;">
        이용약관<br>개인정보처리방침<br>2023 Seeds Bibim
      </div>

    </v-navigation-drawer>

    <v-main style="background-color: #3B4048;">
      <v-container class="px-5" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card class="right-panel">

              <v-list lines="two" style="background-color: #181B21;">
                <v-list-subheader class="right-panel-title">
                  <b>{{ card }}</b>
                </v-list-subheader>

                <template v-for="n in 6" :key="n">
                  <!-- ↓ margin:5px에서 10px로 변경 ↓ -->
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
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const cards = ['이번주 HOT 게시글 🔥', '최신 게시글']
const links = [
  ['mdi-inbox-arrow-down', 'HOME'],
  ['mdi-send', '루틴 공유'],
  ['mdi-delete', '루틴 작성'],
  ['mdi-alert-octagon', '내 루틴 보관함'],
  ['mdi-alert-octagon', '설정'],
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
  }),
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

/* 좌측 영역의 메뉴 마우스 올려놓았을때 색상 변경*/
.v-list-item.v-list-item--link.v-theme--light.v-list-item--density-default.v-list-item--one-line.v-list-item--variant-text:hover {
  color: #77C3EE;
}

/* 좌측 영역의 메뉴 마우스 올려놓았을때 색상 변경*/
.v-navigation-drawer__content {
  color: white;
  /* 글씨 기본 값 설정*/
}

/* -----------------------------------우측 영역 ------------------------------------- */

.right-panel {
  background-color: #181B21;
  border-radius: 30px;
}

.right-panel-title {
  background-color: #181B21;
  color: #FFFFFF;
  font-size: 30px;
  line-height: 30px;
}

.v-card.v-theme--light.v-card--density-default.v-card--variant-elevated {
  /* 박스 스타일 조정 */
  border-radius: 20px;
  background-color: #181B21;
  padding: 10px;
}
</style>