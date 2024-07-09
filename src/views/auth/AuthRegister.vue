<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
      <div class="link">
        <span>Already have an account?</span> <router-link to="/login">Login</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios2 from '../../api/api_live_chat';
import { useRouter } from 'vue-router';

const username = ref('');
const name = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
  try {
    const response = await axios2.post('/auth/register', {
      username: username.value,
      name: name.value,
      password: password.value,
      role: "student"
    });
    const { token, user } = response.data;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/chat');
  } catch (error) {
    console.error('Registration failed:', error);
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
