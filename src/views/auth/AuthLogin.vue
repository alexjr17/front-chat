<template>
  <div>
    <h2>Login</h2>
    <form @submit="login">
      <div>
        <label for="username">Nombre usuario:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <div class="link">
        <span>Don't have an account?</span> <router-link to="/register">Register</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios2 from '../../api/api_live_chat';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = async (event) => {
  event.preventDefault();
  try {
    const response = await axios2.post('/auth/login', {
      username: username.value,
      password: password.value
    });
    const { token, user } = response.data;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/chat');
  } catch (error) {
    console.log('Login failed:', error);
  }
};
</script>

<style>
/* Estilos de Bootstrap */
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
.form-control {
  margin-bottom: 10px;
}
</style>
