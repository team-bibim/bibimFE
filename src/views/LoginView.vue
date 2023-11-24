<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">이메일:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">비밀번호:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies';
import axios from 'axios';

export default {
  data() {
    return {
      email: null,
      password: null
    };
  },

  methods: {
    async submitForm() {
      try {
        console.log(this.email, this.password);
        const response = await this.$store.dispatch('loginUser', {
          email: this.email,
          password: this.password
        });

        VueCookies.set("loginToken", response.token);
        VueCookies.set('loginUserData', response.user); // 사용자 정보를 Vuex store에 저장
        console.log("login Token is   : " + JSON.stringify(response.user, null, 2));
        console.log("login UserData is: " + JSON.stringify(response.token, null, 2));

        // 실험: Vuex 스토어에 쿠키 저장하기
        // this.$store.commit('setToken', loginToken);

        // 메인 페이지로 리다이렉트
        this.$router.push('/main');
      } catch (error) {
        console.error('로그인 실패:', error);
          alert('로그인 실패');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-top: 200px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3
}
</style>