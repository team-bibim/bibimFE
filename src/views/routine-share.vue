<template>
  <v-app id="inspire">
    <v-main style="background-color: #3B4048;">
      <v-container class="px-0 py-0" fluid>
        <v-card class="right-panel-hot">
          <v-list lines="two" style="background-color: #181B21;">
            <div style="height: 10px;"></div>
            <div style="display: flex;">
              <v-list-subheader class="right-panel-hot-classify-text">
                <b style="margin-right: 30px;">전체</b>
                <b style="margin-right: 30px;">팔로잉</b>
                <b style="margin-right: 30px;">인기</b>
              </v-list-subheader>
              <input class="search-bar" v-model="textInput" placeholder="검색" @keyup.enter="searchBarInput">
            </div>
            <div style="height: 20px;"></div>
            <v-list-subheader class="right-panel-hot-classify-text" style="margin-left: 20px;">
              <b>이번 주 HOT 게시글 🔥</b>
            </v-list-subheader>
            <div style="height: 20px;"></div>
            <template v-if="filteredAndSortedHotPostings.length === 0">
              <div class="no-search-results">검색 결과가 없습니다</div>
            </template>
            <template v-else>
              <template v-for="(post, index) in filteredAndSortedHotPostings" :key="index">
                <v-list-item
                  style="background-color: #834B4B; color: #FFFFFF; margin: 5px; border-radius: 20px; width:99%;">
                  <div style="display: flex;">
                    <v-list-item-title class="right-panel-hot-title">
                      <v-avatar class="right-panel-hot-avatar"></v-avatar>
                      <b style="margin-left:8px; color:#F4D3D3">{{ post.title }}</b>
                    </v-list-item-title>
                  </div>
                  <div style="height: 10px;"></div>
                  <v-list-item-title class="right-panel-hot-content">
                    {{ post.content }}
                  </v-list-item-title>
                </v-list-item>
              </template>
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
            <template v-if="filteredAndSortedNewPostings.length === 0">
              <div class="no-search-results">검색 결과가 없습니다</div>
            </template>
            <template v-else>
              <template v-for="(post, index) in filteredAndSortedNewPostings" :key="index">
                <v-list-item
                  style="background-color: #1D2128; color: #FFFFFF; margin: 5px; border-radius: 20px; width:99%;">
                  <div style="display: flex;">
                    <v-list-item-title class="right-panel-new-title">
                      <v-avatar class="right-panel-new-avatar"></v-avatar>
                      <b style="margin-left:8px; color:#F4D3D3">{{ post.title }}</b>
                    </v-list-item-title>
                  </div>
                  <div style="height: 10px;"></div>
                  <div class="right-panel-new-content">
                    <v-list-item-title>
                      {{ post.content }}
                    </v-list-item-title>
                  </div>
                </v-list-item>
              </template>
            </template>
          </v-list>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<!--

Title : 안녕하세요.
Content : 여러분.
Title : Hello.
Content : Guys.

-->

<script>
export default {
  data: () => ({
    hotPostings: [
      { title: '강아지는 귀엽다', content: '강아지는 진짜 너무 귀여운 것 같아.' },
      { title: '고양이도 귀엽다', content: '고양이도 만만찮게 귀엽던데' },
      { title: '안녕', content: '하세요'}
    ],
    newPostings: [
      { title: '뻘글입니다.', content: '뻘글입니다.' },
      { title: '가나다라마바사아', content: 'ABCDEFG' },
      { title: '니하오', content: '곤니치와'},
    ],
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
  computed: {
    filteredAndSortedHotPostings() {
      return this.hotPostings
        .filter(post => {
          const searchText = this.textInput.toLowerCase();
          const title = post.title.toLowerCase();
          const content = post.content.toLowerCase();
          return title.includes(searchText) || content.includes(searchText);
        })
        .sort((a, b) => a.title.localeCompare(b.title));
    },
    filteredAndSortedNewPostings() {
      return this.newPostings
        .filter(post => {
          const searchText = this.textInput.toLowerCase();
          const title = post.title.toLowerCase();
          const content = post.content.toLowerCase();
          return title.includes(searchText) || content.includes(searchText);
        })
        .sort((a, b) => a.title.localeCompare(b.title));
    },
  },
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
  
<style scoped>
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

.no-search-results {
  color: #FFFFFF;
  text-align: center;
}

.right-panel-hot-classify-text {
  background-color: #181B21;
  color: #FFFFFF;
  font-size: 30px;
  line-height: 30px;
}

.right-panel-hot-classify-text:first-of-type {
  flex-direction: row;
  word-spacing: 100px;
  margin-left: 10px;
  margin-right:30px;
}

.right-panel-hot {
  background-color: #CC8484;
  border-radius: 30px;
}

.right-panel-hot-title {
  background-color: #CC8484;
  border-radius: 20px;
  align-items: center;
  width: auto;
  padding: 1%;
}

.right-panel-hot-content {
  background-color: #CC8484;
  border-radius: 20px;
  height: auto;
  text-align: left;
  padding: 1%;
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
  padding: 1%;
  width: auto;
}

.right-panel-new-content {
  background-color: #344054;
  border-radius: 20px;
  height: auto;
  text-align: left;
  padding: 1%;
}

.right-panel-new-avatar {
  background-color: #FFFFFF;
  margin: auto;
  align-items: center;
  text-align: center;
}
</style>