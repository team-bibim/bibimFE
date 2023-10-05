<template>
  <div class="text-center">
    <v-btn id="btn"
      @click="dialog = true"
    >
    <div class="pluslist">+</div>

    </v-btn>

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card id="full-box">
        <v-card-text>
          <div id="my-rutin">내 루틴 보관함</div>
          <v-divider :thickness="3" color="white"></v-divider>
        </v-card-text>
      <v-table theme="dark" :items="work" :fields="fields">
        <thead>
      <tr>
        <th class="text-left">
          루틴 이름
        </th>
        <th class="text-left">
          칼로리
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in work"
        :key="item.name"
      >
        <td>{{ responseData }}</td>
        <!-- <td>{{ item.calories }}</td> -->
        <td id="click-btn">
          <v-btn @click="loadData">불러오기</v-btn>
        </td>
      </tr>

    </tbody>
      </v-table>
        <v-card-actions>
          <v-btn @click="dialog = false" id="close-btn">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <div v-for="(object, index) in object" :key="index" class="object">
  <p>객체 {{ index+ 1 }}</p>
  </div>
</template>




<script>
  // export default {
  //   data () {
  //     return {
  //       object: [],
  //       dialog: false,
  //       work: [
  //         {
  //           name : '하체운동',
  //           calories: '200',
  //           checked: false
  //         },

  //         {
  //           name : '상체운동 루틴은 이렇게!',
  //           calories: '200'
  //         },

  //         {
  //           name : '어떻게 하면 몸짱이?',
  //           calories: '200'
  //         },

  //         {
  //           name : '저는 이렇게 했습니다',
  //           calories: '200'
  //         },

  //         {
  //           name : '이렇게 하면 기분이 좋거든요',
  //           calories: '200'
  //         },

  //         {
  //           name : '사실 이렇게 하면 근육통이 옵니다',
  //           calories: '200'
  //         },

  //         {
  //           name : '네!',
  //           calories: '200'
  //         }

  //       ],
  //     }
  //   },
  //   methods: {
  //     loadData() {
  //       this.object.push({});
  //     }
  //     // loadSharedData() {
  //     //   this.$router.push('/share'); //share 페이지로 이동
  //     // }
  //   }
  // }

// new Vue ({
//   methods: {
//     reverseMsg() {
//       this.$stroe.commit('reverseMessage')
//     }
//   }
// })
import axios from "axios"

export default {
  data() {
    return {
      responseData: null
    };
  },
  methods: {
  fetchData() { 
    axios.get("52.78.77.1:8000", {
      "user_routine_id": 0,
      "routine_id": 0,
    })
      .then(response => {
        console.log(response.data); //response
      })
      .catch(error => {
        console.error(error); //오류발생시 실행
      }).then(function() {
    //계속 실행하는 것
      });
    }
  },
  methods() {
    this.fetchData();
  }
}
</script>

<style scoped>
#btn {
  position: relative;
  background-color: #55B570;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  color: white;
  font-size: 40px;
  top: 250px;
}

#full-box {
  background-color: #181B21;
  width: 1100px;
  height: 600px;
  border-radius: 20px;
}

#my-rutin {
  font-size: 30px;
  color: white;
  padding-top: 25px;
}

#close-btn {
  color: white;
  font-size: 20px;
  margin: 0 auto;
}

#click-btn {
  width: 100px;
}

.object {
  background-color: #3D5143;
  border-radius: 20px;
  padding: 80px;
  margin-top: 30px;
  color: white;
}

</style>