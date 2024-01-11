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
      <button type="submit" @click="logout" class="logout-btn">로그아웃</button>
    </form>
  </div>
</template>

<script>
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

        localStorage.clear(); // 로컬저장소 초기화(routineId 초기화)

        this.$store.commit('setToken', response.data.token); // 토큰을 저장
        this.$store.commit('setUserData', response.data.user); // 사용자 정보를 Vuex store에 저장

        // 메인 페이지로 리다이렉트
        this.$router.push('/main');
      } catch (error) {
        console.error('로그인 실패:', error);
        alert('로그인 실패');
      }
    },

    async logout() {
      try {
      await axios.delete('/api/accounts/auth/');

      this.$store.dispatch('logout');
      this.$router.push('/login');
    } catch (error) {
      console.error('로그아웃 실패', error);
      alert('로그아웃 실패');
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

.logout-btn {
  margin-left: 10px;
}
</style>