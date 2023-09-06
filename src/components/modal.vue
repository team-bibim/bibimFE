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
          <div id="line"></div>
        </v-card-text>
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

#line {
  width: 1050px;
  height: 2px;
  background-color: white;
  margin-top: 25px;
}

#close-btn {
  color: white;
  font-size: 20px;
  margin: 0 auto;
}
</style>