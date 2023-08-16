<template>
    <v-app id="inspire">
  
      <v-main style="background-color: #3B4048;">
        <v-container class="px-2 py-2" fluid>
          <v-card class="right-panel-hot">
  
            <v-list lines="two" style="background-color: #181B21;">
  
              <div style="height: 10px;"></div>
  
              <div style="display: flex;">
                <v-list-subheader class="right-panel-hot-classify-text" style="flex-direction: row; word-spacing: 100px; margin-left: 10px; margin-right:30px;">
                  <b style="margin-right: 30px;">전체</b>
                  <b style="margin-right: 30px;">팔로잉</b>
                  <b style="margin-right: 30px;">인기</b>
                </v-list-subheader>
  
                <input
                  class="search-bar"
                  v-model="textInput"
                  placeholder="검색"
                  @keyup.enter="searchBarInput"
                >
              </div>
  
              <div style="height: 20px;"></div>
  
              <v-list-subheader class="right-panel-hot-classify-text" style="margin-left: 20px;">
                <b>이번 주 HOT 게시글 🔥</b>
              </v-list-subheader>
  
              <div style="height: 20px;"></div>
  
              <template v-for="n in 6" :key="n">
                <v-list-item style="background-color: #834B4B; color: #FFFFFF; margin: 5px; border-radius: 20px; width:99%;">
  
                  <div style="display: flex;">
                    <v-list-item-title class="right-panel-hot-title">
                      <v-avatar class="right-panel-hot-avatar"></v-avatar>
                      <b style="margin-left:8px;">{{ n }}번째 제목</b>
                    </v-list-item-title>
                  </div>
  
                  <div style="height: 10px;"></div>
  
                  <div class="right-panel-hot-content">
                    <v-list-item-subtitle>
                    <br>~ 루틴 보여주는 곳 ~<br>
                    </v-list-item-subtitle>
                  </div>
                  
                </v-list-item>
  
              </template>
            </v-list>
          </v-card>
  
          <div style="height: 8px;"></div>
  
          <v-card class="right-panel-new">
            <v-list lines="two" style="background-color: #181B21;">
  
              <div style="height: 20px;"></div>
  
              <v-list-subheader class="right-panel-hot-classify-text" style="margin-left: 35px;">
                <b>최신 게시글</b>
              </v-list-subheader>
  
              <div style="height: 20px;"></div>
  
              <template v-for="n in 6" :key="n">
                <v-list-item style="background-color: #1D2128; color: #FFFFFF; margin: 5px; border-radius: 20px;">
  
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
            </v-list>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
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
      title: ['Today', 'Yesterday'],
      drawer: null,
      links: [
        ['mdi-inbox-arrow-down', 'HOME'],
        ['mdi-send', '루틴 공유'],
        ['mdi-delete', '루틴 작성'],
        ['mdi-alert-octagon', '내 루틴 보관함'],
        ['mdi-alert-octagon', '설정']
      ],
      textInput: ""
    }),
    methods: {
      getPanelBackStyle(card) {
        if (card === "이번주 HOT 게시글 🔥") {
          return { backgroundColor: '#834B4B' };
        } else if (card === "최신 게시글") {
          return { backgroundColor: '#1D2128' };
        }
      },
      searchBarInput() {
        console.log(this.textInput); // Log the entered text to the console
      }
    }
  }
  </script>
  
  <style>
  .search-bar {
    color: #FFFFFF;
    border: 2px solid #3A4148;
    background-color: #24272B;
    border-radius: 20px;
    width: 850px;
    height: 60px;
    text-indent: 10px;
    margin-right: 20px;
  }
  
  .search-bar::placeholder {
    font-size: 26px;
    font-weight: bold;
    text-align: right;
    margin-right: 12px;
    padding-top: 10px;
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
  </style>