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
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submitForm() {
      console.log("이메일:", this.email);
      console.log("비밀번호:", this.password);

      // 서버로 정보를 전송하는 코드
      fetch('http://52.78.77.1:8000/accounts/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('서버 응답:', data);
      })
      .catch(error => console.error('에러:', error));
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