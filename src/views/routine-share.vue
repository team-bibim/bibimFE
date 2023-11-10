<template>
  <v-app id="inspire">
    <v-main style="background-color: #3B4048;">
      <v-container class="px-0 py-0" fluid>
        <v-card class="right-panel-hot">
          <v-list lines="two" style="background-color: #181B21;">
            <div style="height: 10px;"></div>
            <div style="display: flex;">
              <v-list-subheader class="right-panel-classify-text">
                <v-btn variant="text" density="compact" size="x-large" style="font-size: 30px;" @click="togglePageStatus('전체')">
                  <b>전체</b>
                </v-btn>
                <v-btn variant="text" density="compact" size="x-large" style="font-size: 30px;" @click="togglePageStatus('팔로잉')">
                  <b>팔로잉</b>
                </v-btn>
              </v-list-subheader>
              <v-text-field outline class="search-bar" v-model="textInput" label="검색할 내용을 입력하세요"
                            variant="outlined" bg-color="#24272B" color="#3A4148"
                            rounded="lg" :style="{ 'border-radius': '20px !important' }"></v-text-field>
            </div>
            <div style="height: 20px;"></div>
            <div v-if="pageStatus === '전체'">
              <div></div> <!-- ?? div 태그를 없애면 박살남 -->
              <v-list-subheader class="right-panel-classify-text" style="margin-left: 20px;">
                <b>이번 주 HOT 게시글 🔥</b>
              </v-list-subheader>
              <div style="height: 20px;"></div>
              <v-data-iterator>
                <template v-if="filteredHotPostings.length === 0">
                  <div class="no-search-results"><b>검색 결과가 없습니다</b></div>
                </template>
                <template v-else>
                  <template v-for="(post, index) in filteredHotPostingsPerPage" :key="index">
                    <!--여기가 v-btn 추가할 자리-->
                    <v-list-item
                      style="background-color: #834B4B; color: #FFFFFF; margin: 5px; border-radius: 20px; width:99%;">
                      <div style="display: flex;">
                        <v-list-item-title class="right-panel-hot-writer-id">
                          <v-avatar class="right-panel-hot-avatar" style="margin-right:5px;"></v-avatar>
                          @{{ post.writer }}
                          <v-btn variant="plain" rounded="xl" @click="exampleFollowFunction()">
                            <v-img
                              :width="30"
                              aspect-ratio="1/1"
                              cover
                              src="https://img.icons8.com/ios-glyphs/90/FFFFFF/user--v1.png"
                            ></v-img>
                          </v-btn>
                        </v-list-item-title>
                        <v-row justify-end>
                          <v-col align-self="start">
                            <v-btn variant="flat" rounded="xl" class="save-post-button-hot">게시물 담기</v-btn>
                          </v-col>
                        </v-row>
                      </div>
                      <div style="height: 10px;"></div>
                      <button v-ripple class="right-panel-hot-content materialDesignButton pl-6 pr-6 pa-4 ma-2">
                        <b style="color:#F4D3D3; font-size: 20px;">{{ post.title }}</b>
                        <br><br>
                        {{ post.content }}
                        <br><br>
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
                      </button>
                    </v-list-item>
                    <div style="height: 5px;"></div>
                  </template>
                </template>
              </v-data-iterator>
              <div style="height: 10px;"></div>
              <v-pagination v-model="hotPage" :length="Math.ceil(filteredHotPostings.length / 4)" style="color:white"></v-pagination>
            </div>

            <!-- 팔로우 게시글 -->
            <div v-if="pageStatus === '팔로잉'">
              <div></div> <!-- ?? div 태그를 없애면 박살남 -->
              <v-list-subheader class="right-panel-classify-text" style="margin-left: 20px;">
                <b>팔로잉 게시글 👥</b>
              </v-list-subheader>
              <div style="height: 20px;"></div>
              <v-data-iterator>
                <template v-if="filteredHotPostings.length === 0">
                  <div class="no-search-results"><b>검색 결과가 없습니다</b></div>
                </template>
                <template v-else>
                  <template v-for="(post, index) in filteredFollowPostingsPerPage" :key="index">
                    <!--여기가 v-btn 추가할 자리-->
                    <v-list-item
                      style="background-color: #834B4B; color: #FFFFFF; margin: 5px; border-radius: 20px; width:99%;">
                      <div style="display: flex;">
                        <v-list-item-title class="right-panel-hot-writer-id">
                          <v-avatar class="right-panel-hot-avatar" style="margin-right:5px;"></v-avatar>
                          @{{ post.writer }}
                          <v-btn variant="plain" rounded="xl" @click="exampleFollowFunction()">
                            <v-img
                              :width="30"
                              aspect-ratio="1/1"
                              cover
                              src="https://img.icons8.com/ios-glyphs/90/FFFFFF/user--v1.png"
                            ></v-img>
                          </v-btn>
                        </v-list-item-title>
                        <v-row justify-end>
                          <v-col align-self="start">
                            <v-btn variant="flat" rounded="xl" class="save-post-button-hot">게시물 담기</v-btn>
                          </v-col>
                        </v-row>
                      </div>
                      <div style="height: 10px;"></div>
                      <button v-ripple class="right-panel-hot-content materialDesignButton pl-6 pr-6 pa-4 ma-2">
                        <b style="color:#F4D3D3; font-size: 20px;">{{ post.title }}</b>
                        <br><br>
                        {{ post.content }}
                        <br><br>
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
                      </button>
                    </v-list-item>
                    <div style="height: 5px;"></div>
                  </template>
                </template>
              </v-data-iterator>
              <div style="height: 10px;"></div>
              <v-pagination v-model="followPage" :length="Math.ceil(filteredFollowPostings.length / 4)" style="color:white"></v-pagination>
            </div>
          </v-list>
        </v-card>

        <div style="height: 8px;"></div>

        <!--최신 게시글-->
        <v-card class="right-panel-new" v-if="pageStatus === '전체'">
          <v-list lines="two" style="background-color: #181B21;">
            <div style="height: 20px;"></div>
            <v-list-subheader class="right-panel-classify-text" style="margin-left: 35px;">
              <b>최신 게시글</b>
            </v-list-subheader>
            <div style="height: 20px;"></div>
            <template v-if="filteredNewPostings.length === 0">
              <div class="no-search-results"><b>검색 결과가 없습니다</b></div>
            </template>
            <template v-else>
              <template v-for="(post, index) in filteredNewPostingsPerPage" :key="index">
                <v-list-item
                  style="background-color: #1D2128; color: #FFFFFF; margin: 5px; border-radius: 20px; width:99%;">
                  <div style="display: flex;">
                    <!--여기가 v-btn 추가할 자리-->
                    <v-list-item-title class="right-panel-new-writer-id">
                      <v-avatar class="right-panel-new-avatar" style="margin-right:5px;"></v-avatar>
                      @{{ post.writer }}
                      <v-btn variant="plain" rounded="xl" @click="exampleFollowFunction()">
                        <v-img
                          :width="30"
                          aspect-ratio="1/1"
                          cover
                          src="https://img.icons8.com/ios-glyphs/90/FFFFFF/user--v1.png"
                        ></v-img>
                      </v-btn>
                    </v-list-item-title>
                    <v-row justify-end>
                      <v-col align-self="start">
                        <v-btn variant="flat" rounded="xl" class="save-post-button-new">게시물 담기</v-btn>
                      </v-col>
                    </v-row>
                  </div>
                  <div style="height: 10px;"></div>
                  <button v-ripple class="right-panel-new-content materialDesignButton pl-6 pr-6 pa-4 ma-2">
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
                  </button>
                </v-list-item>
                <div style="height: 5px;"></div>
              </template>
            </template>
            <div style="height: 10px;"></div>
            <v-pagination v-model="newPage" :length="Math.ceil(filteredNewPostings.length / 4)" style="color:white"></v-pagination>
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
  let titleValue   = diaryTitle.value;
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





    // 예시
    const bibim = axios.get('http://52.78.77.1:8000/routine/recommend/follow/', {
      headers: {
        'Authorization': this.$cookies.get('loginToken')
      }
    })
    .then(response => {
      this.getFollowPostings(response.data);
      console.log("모두가 주목하는 데이터: " + request.header);
    })
    .catch(error => {
      console.log("에러남" + error);
    });
    // console.log("가져온 데이터는" + bibim.to);







    // [상태관리] 로그인이 되어있는지 여부 확인
    this.checkLoginStatus();
    const token = localStorage.getItem('token');
    console.log(token);
    // 핫 포스팅 갖고오기
    axios.get('http://52.78.77.1:8000/routine/recommend/pop/')
    .then(response => {
      this.getHotPostings(response.data)
    })
    .catch(error => {
      console.log(error);
    });
    axios.get('http://52.78.77.1:8000/routine/recommend/latest/')
    .then(response => {
      this.getNewPostings(response.data)
    })
    .catch(error => {
      console.log(error);
    });
    // 로그인 되어있는지 여부 확인
    axios.get('http://52.78.77.1/accounts/auth/')
    .then(response => {
      if (response.data.id == null) {
        console.log("로그인 정보가 없습니다.");
      } else {
        console.log(response.data.id);

        // 팔로우 포스팅 갖고오기
        axios.get('http://52.78.77.1:8000/routine/recommend/follow/', {
          headers: {
            'Authorization': this.$cookies.get('loginToken')
          }
        })
        .then(response => {
          this.getFollowPostings(response.data)
        })
        .catch(error => {
          console.log(error);
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
    // 팔로우 게시글
    axios.get('http://52.78.77.1:8000/routine/box/check/')
    .then(response => {
      this.getFollowPostings(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  },

  data: () => ({
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
        writer: 'exampleID',
        date: '2023/09/25 19:27',
        like: 0
      },
    ],
    newPostings: [
      {
        title: 'ㄱ. 로렘 입숨.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        writer: 'exampleID',
        date: '2023/09/25 19:27',
        like: 0
      }
    ],
    followPostings: [
      {
        title: 'ㄱ. 로렘 입숨.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        writer: 'exampleID',
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
    followPage: 1,
    number: 0,
    pageStatus: "전체",
  }),
  computed: {
    // 두 개 함수는 일부로 분리해둠 => filteredHotPostings()만 따로 사용할 수 있도록
    filteredHotPostings() {
      return this.hotPostings
        .filter(post => {
          const searchText = this.textInput.toLowerCase();
          const title      = post.title.toLowerCase();
          const content    = post.content.toLowerCase();
          return title.includes(searchText) || content.includes(searchText);
        })
        .sort((a, b) => a.title.localeCompare(b.title));
    },
    filteredHotPostingsPerPage() {
      const startIndex = (this.hotPage - 1) * 4;
      const endIndex   = startIndex + 4;
      return this.filteredHotPostings.slice(startIndex, endIndex);
    },
    filteredNewPostings() {
      return this.newPostings
        .filter(post => {
          const searchText = this.textInput.toLowerCase();
          const title      = post.title.toLowerCase();
          const content    = post.content.toLowerCase();
          return title.includes(searchText) || content.includes(searchText);
        })
        .sort((a, b) => a.title.localeCompare(b.title));
    },
    filteredNewPostingsPerPage() {
      const startIndex = (this.newPage - 1) * 4;
      const endIndex   = startIndex + 4;
      return this.filteredNewPostings.slice(startIndex, endIndex);
    },
    filteredFollowPostings() {
      return this.followPostings
        .filter(post => {
          const searchText = this.textInput.toLowerCase();
          const title      = post.title.toLowerCase();
          const content    = post.content.toLowerCase();
          return title.includes(searchText) || content.includes(searchText);
        })
        .sort((a, b) => a.title.localeCompare(b.title));
    },
    filteredFollowPostingsPerPage() {
      const startIndex = (this.followPage - 1) * 4;
      const endIndex   = startIndex + 4;
      return this.filteredFollowPostings.slice(startIndex, endIndex);
    },
  },
  methods: {
    fetchDataUsingToken() {
    const token = this.$store.state.authToken; // Access the token from the store
    axios.get('your-api-endpoint', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token to the request
      },
    })
      .then(response => {
        // Handle the response
      })
      .catch(error => {
        // Handle the error
      });
    },
    // 서버에 로그인 여부를 확인하는 요청을 보내고, 로그인되어 있다면 '로그인됨' 메시지를 출력
    checkLoginStatus() {
      axios.get('http://52.78.77.1/accounts/auth/')
        .then(response => {
          if (response.data.id != null) {
            console.log("로그인됨");
          } else {
            console.log("로그인되지 않음");
          }
        })
        .catch(error => {
          console.log("로그인 상태를 확인하는 중에 오류 발생: " + error);
        });
    },
    getPanelBackStyle(card) {
      if (card === "이번주 HOT 게시글 🔥") {
        return { backgroundColor: '#834B4B' };
      } else if (card === "최신 게시글") {
        return { backgroundColor: '#1D2128' };
      }
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
    togglePageStatus(status) {
      this.pageStatus = status;
    },
    getHotPostings(data) {
      for (let i = 0; i < data.length; i++) {
        let post = {
          title:   data[i].routine_name,
          content: data[i].routine_comment,
          writer:  data[i].nickname,
          like:    data[i].recommend_count
        };
        this.hotPostings.push(post);
      }
    },
    getNewPostings(data) {
      for (let i = 0; i < data.length; i++) {
        let post = {
          title:   data[i].routine_name,
          content: data[i].routine_comment,
          writer:  data[i].nickname,
          like:    data[i].recommend_count
        };
        this.newPostings.push(post);
      }
    },
    getFollowPostings(data) {
      for (let i = 0; i < data.length; i++) {
        let post = {
          title:   data[i].routine_name,
          content: data[i].routine_comment,
          writer:  data[i].nickname,
          like:    data[i].recommend_count
        };
        this.followPostings.push(post);
      }
    },
  }
}
</script>
  
<style scoped>
.search-bar {
  color: #FFFFFF;
    height: 60px;
    text-indent: 10px;
    margin: 10px 35px;
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

.right-panel-classify-text {
  background-color: #181B21;
  color: #FFFFFF;
  font-size: 30px;
  line-height: 30px;
}

.right-panel-classify-text:first-of-type {
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
  width: 100%;
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
  width: 100%;
  text-align: left;
  padding: 1%;
}

.right-panel-new-avatar {
  background-color: #FFFFFF;
  margin: auto;
  align-items: center;
  text-align: center;
}

.save-post-button-hot {
  align-items: center;
  height: 62px;
  background-color: #CC8484;
  font-size: auto;
  float: right;
}

.save-post-button-new {
  align-items: center;
  height: 62px;
  background-color: #344054;
  font-size: auto;
  float: right;
}

</style>