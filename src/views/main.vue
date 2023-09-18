<template>
<!------------------------ 오늘의 운동 진행률 --------------------------------->
<div class="ex1">
    <div class="ex1_center_text">오늘의 운동 진행률</div>
    <!-- <img src="percent.png" alt="percent" width="100" height="100"> -->
    <!-- <div class="percent">80%</div> -->

    <div class="container">
        <v-btn @click="$router.push('/write')" div class="box1">
            <div class="box1_text">루틴 작성하기</div>
        </v-btn>
        <v-btn @click="$router.push('/')" div class="box2">
            <div class="box2_text">루틴 불러오기</div>
        </v-btn>
        <v-btn @click="$router.push('/share')" div class="box3">
            <div class="box3_text">루틴 공유하기</div>
        </v-btn>
    </div>
</div>
<!------------------------ 날짜 -------------------------------------------->
<div class="ex2">
        <!-- <div class="page-left" style="float: left;">&lt;</div> -->
        <!-- <div class="ex2_center_text">첫 번째 날짜</div> -->
        <!-- <div class="page-right" style="float: right;">&gt;</div> -->

        <v-pagination :length="3" id="pagenation"></v-pagination>

</div>
<!------------------------ 운동 리스트  -------------------------------------->
<div class="ex3">
    <div class="listbox1">
        <!-- <div class="list_box1"></div> -->
    </div>

    <Modal v-if="this.showmodal=true"></Modal>
</div>

</template>

<script setup>
import Modal from '@/components/modal.vue' 

</script>

<script>
  export default {
    components : {
        'Modal' : Modal
    },
    data: () => ({
        showmodal : false
    })

  };

  </script>
  
  
  <style scoped>
.ex1 {
        position: relative;
        background-color: #181B21;
        border-radius: 20px;
        height: 520px;
        margin-bottom: 10px;
}
.ex1_center_text {
    position: relative;
    text-align: center;
    color: white;
    font-size: 40px;
    padding-top: 50px;
    font-weight: bold;
}
/*-------------------------------- 위에 박스 세개---------------------------- */
.container {
    display: flex;
}
.box1 {
    position: relative;
    background-color: #6790CE;
    border-radius: 20px;
    width: 448px;
    height: 290px;
    margin-top: 110px;
    margin-left: 10px;
    float: left;
}
.box1_text {
    position: relative;
    color: white;
    font-size: 40px;
    padding-bottom: 100px;
}

.box2 {
    position: relative;
    background-color: #C75B6F;
    border-radius: 20px;
    width: 448px;
    height: 290px;
    margin-top: 110px;
    margin-left: 10px;
    float: left;
}
.box2_text {
    position: relative;
    color: white;
    font-size: 40px;
    padding-bottom: 100px;
}

.box3 {
    position: relative;
    background-color: #8EC693;
    border-radius: 20px;
    width: 448px;
    height: 290px;
    margin-top: 110px;
    margin-left: 10px;
    float: left;
}
.box3_text {
    position: relative;
    color: white;
    font-size: 40px;
    padding-bottom: 100px;
}
/* ------------------------------위에 박스 세개 ---------------------------*/

.ex2 {
    background-color: #181B21;
    border-radius: 20px;
    height: 120px;
    margin-bottom: 10px;
}

#pagenation {
    color: white;
    font-size: 20px;
    padding-top: 30px;
}
/* ------------------------맨 아래 박스 리스트들 -----------------------*/
.ex3 {
    background-color: #181B21;
    border-radius: 20px;
    height: 650px;
    margin-bottom: 10px;
}
/* ----------------------pagenation ------------------------------------*/

</style>