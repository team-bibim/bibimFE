<template>
  <v-app id="inspire">
    <v-main style="background-color: #3B4048;">
      <v-container class="px-0 py-0" fluid>
        <v-card class="right-panel-hot">
          <v-list lines="two" style="background-color: #181B21;">
            <div style="height: 10px;"></div>
            <div style="display: flex;">
              <v-list-subheader class="right-panel-hot-classify-text">
                <v-btn variant="text" density="compact" size="x-large" style="font-size: 30px;"><b>전체</b></v-btn>
                <v-btn variant="text" density="compact" size="x-large" style="font-size: 30px;"><b>팔로잉</b></v-btn>
              </v-list-subheader>
              <input class="search-bar" v-model="textInput" placeholder="검색" @keyup.enter="searchBarInput">
            </div>
            <div style="height: 20px;"></div>
            <v-list-subheader class="right-panel-hot-classify-text" style="margin-left: 20px;">
              <b>이번 주 HOT 게시글 🔥</b>
            </v-list-subheader>
            <div style="height: 20px;"></div>
            <v-data-iterator>
              <template v-if="filteredAndSortedHotPostings.length === 0">
                <div class="no-search-results">검색 결과가 없습니다</div>
              </template>
              <template v-else>
                <template v-for="(post, index) in filteredAndSortedHotPostingsPerPage" :key="index">
                  <v-list-item
                    style="background-color: #834B4B; color: #FFFFFF; margin: 5px; border-radius: 20px; width:99%;">
                    <div style="display: flex;">
                      <v-list-item-title class="right-panel-hot-writer-id">
                        <v-avatar class="right-panel-hot-avatar" style="margin-right:5px;"></v-avatar>
                        {{ post.writer }}
                        <v-btn variant="plain" rounded="xl" @click="exampleFollowFunction()">
                          <v-img
                            :width="30"
                            aspect-ratio="1/1"
                            cover
                            src="https://img.icons8.com/ios-glyphs/90/FFFFFF/user--v1.png"
                          ></v-img>
                        </v-btn>
                      </v-list-item-title>
                    </div>
                    <div style="height: 10px;"></div>
                    <v-list-item-title class="right-panel-hot-content">
                      <b style="color:#F4D3D3; font-size: 20px;">{{ post.title }}</b>
                      <br>
                      <br>
                      {{ post.content }}
                      <br>
                      <br>
                      <div style="align-items: right;">
                        {{ post.date }}
                        <v-btn variant="plain" rounded="xl" @click="increaseHotLike(index)">
                          <v-img
                            :width="30"
                            aspect-ratio="1/1"
                            cover
                            src="https://img.icons8.com/material/90/FFFFFF/facebook-like--v1.png"
                          ></v-img>
                        </v-btn>
                        {{ post.like }}
                      </div>
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </template>
            </v-data-iterator>
            <div style="height: 10px;"></div>
            <v-pagination v-model="hotPage" :length="Math.ceil(filteredAndSortedHotPostings.length / 4)" style="color:white"></v-pagination>
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
              <template v-for="(post, index) in filteredAndSortedNewPostingsPerPage" :key="index">
                <v-list-item
                  style="background-color: #1D2128; color: #FFFFFF; margin: 5px; border-radius: 20px; width:99%;">
                  <div style="display: flex;">
                    <v-list-item-title class="right-panel-new-writer-id">
                      <v-avatar class="right-panel-new-avatar" style="margin-right:5px;"></v-avatar>
                      {{ post.writer }}
                      <v-btn variant="plain" rounded="xl" @click="exampleFollowFunction()">
                        <v-img
                          :width="30"
                          aspect-ratio="1/1"
                          cover
                          src="https://img.icons8.com/ios-glyphs/90/FFFFFF/user--v1.png"
                        ></v-img>
                      </v-btn>
                    </v-list-item-title>
                  </div>
                  <div style="height: 10px;"></div>
                  <v-list-item-title class="right-panel-new-content">
                    <b style="color:#F4D3D3; font-size: 20px;">{{ post.title }}</b>
                    <br>
                    <br>
                    {{ post.content }}
                    <br>
                    <br>  
                    <div style="align-items: right;">
                      {{ post.date }}
                      <v-btn variant="plain" rounded="xl" @click="increaseNewLike(index)">
                        <v-img
                          :width="30"
                          aspect-ratio="1/1"
                          cover
                          src="https://img.icons8.com/material/90/FFFFFF/facebook-like--v1.png"
                        ></v-img>
                      </v-btn>
                      {{ post.like }}
                    </div>
                  </v-list-item-title>
                </v-list-item>
              </template>
            </template>
            <div style="height: 10px;"></div>
            <v-pagination v-model="newPage" :length="Math.ceil(filteredAndSortedNewPostings.length / 4)" style="color:white"></v-pagination>
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
import axios from 'axios';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

// 좋아요
/*submitBtn.addEventListener('click', () => {
  let titleValue = diaryTitle.value;
  let contentValue = diaryContent.value;

  if (contentValue === "") {
    alert("텍스트 입력란이 공란입니다.");
  } else {
    axios.post('http://15.164.228.112:8000/routine/', { title: titleValue, content: contentValue })
    .then(res => {
      console.log(res.data);
      alert("저장되었습니다!!");
    })
    .catch(error => {
      console.error(error);
    });
  }
});*/

export default {
  created() {
    axios.get('http://52.78.77.1:8000/routine/recommend/pop/')
    .then(response => {
      console.log("Routine Day: " + response.data[0].routine_day);
      this.getHotPostings(response.data[0])
    })
    .catch(error => {
      console.log(error);
    });
  },
  data: () => ({
    // 백엔드단의 Post 데이터는 어떻게 구성되어있는지 확인하고, 양식을 맞추어 axios를 도입할 것
    post: {
      title: '',
      content: '',
      writer: '',
      date: '',
      like: 0
    },
    hotPostings: [
      {
        title: 'ㄱ. 로렘 입숨.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        writer: '@exampleID',
        date: '2023/09/25 19:27',
        like: 0
      },
      {
        title: 'ㄱ. 로렘 입숨.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        writer: '@exampleID',
        date: '2023/09/25 19:27',
        like: 0
      }
      /*
      {
        title,
        writer,
        date,
        like
      }
      {
        title: routine_name,
        content: routine_comment,
        writer: owner_id,
        date: created_at,
        like: 좋아요 수는 별도로 작동함
      }
      */
    ],
    newPostings: [
      {
        title: 'ㄱ. 로렘 입숨.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        writer: '@exampleID',
        date: '2023/09/25 19:27',
        like: 0
      }
    ],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'HOME'],
      ['mdi-send', '루틴 공유'],
      ['mdi-delete', '루틴 작성'],
      ['mdi-alert-octagon', '내 루틴 보관함'],
      ['mdi-alert-octagon', '설정']
    ],
    textInput: "",
    hotPage: 1,
    newPage: 1,
    number: 0,
  }),
  computed: {
    // 두 개 함수는 일부로 분리해둠 => filteredAndSortedHotPostings()만 따로 사용할 수 있도록
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
    filteredAndSortedHotPostingsPerPage() {
      const startIndex = (this.hotPage - 1) * 4;
      const endIndex = startIndex + 4;
      return this.filteredAndSortedHotPostings.slice(startIndex, endIndex);
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
    filteredAndSortedNewPostingsPerPage() {
      const startIndex = (this.newPage - 1) * 4;
      const endIndex = startIndex + 4;
      return this.filteredAndSortedNewPostings.slice(startIndex, endIndex);
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
    },
    exampleFollowFunction() {
      console.log("팔로우 눌림");
      /*axios.post('http://15.164.228.112:8000/routine/', { title: titleValue, content: contentValue })
      .then(res => {
        console.log(res.data);
        alert("저장되었습니다!!");
      })
      .catch(error => {
        console.error(error);
      });*/
    },
    increaseHotLike(index) {
      console.log("좋아요 눌림");
      /*axios.post('http://15.164.228.112:8000/routine/', { title: titleValue, content: contentValue })
      .then(res => {
        console.log(res.data);
        alert("저장되었습니다!!");
      })
      .catch(error => {
        console.error(error);
      });*/
      this.hotPostings[index].like++;
    },
    increaseNewLike(index) {
      console.log("좋아요 눌림");
      /*axios.post('http://15.164.228.112:8000/routine/', { title: titleValue, content: contentValue })
      .then(res => {
        console.log(res.data);
        alert("저장되었습니다!!");
      })
      .catch(error => {
        console.error(error);
      });*/
      this.newPostings[index].like++;
    },
    getHotPostings(data) {
      // for(let i = 0; i < 5; i++) { // i < 5라고 해놨는데, 예를 들어, i < dataLength 등으로 변경하는 작업이 필요함.
        let post = {
          title: data.routine_name,
          content: data.routine_comment,
          writer: data.owner_id,
          like: data.recommend_count
        };

        this.hotPostings.push(post);
      // }
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

.right-panel-hot-writer-id {
  background-color: #CC8484;
  border-radius: 20px;
  align-items: center;
  width: auto;
  padding: 1%;
}

.right-panel-hot-content {
  background-color: #CC8484;
  border-radius: 20px;
  white-space: pre-line;
  height: auto;
  width: auto;
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

.right-panel-new-writer-id {
  background-color: #344054;
  border-radius: 20px;
  align-items: center;
  padding: 1%;
  width: auto;
}

.right-panel-new-content {
  background-color: #344054;
  border-radius: 20px;
  white-space: pre-line;
  height: auto;
  width: auto;
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