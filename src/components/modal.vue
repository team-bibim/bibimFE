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
        <v-table id="lists">
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
        v-for="item in rutinbox"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
        <v-card-actions>
          <v-btn color="" @click="dialog = false" id="close-btn">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>



<script>
  export default {
    data () {
      return {
        dialog: false,
        rutinbox: [
          {
            name: '이렇게 운동하면 좋습니다',
            calories: 300,
          }
        ]
      }
    },
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

/* #lists {
  
  
} */
</style>