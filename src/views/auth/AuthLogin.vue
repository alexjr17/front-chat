<template>
  <div class="container-auth">
    <h2>Inicia sesión</h2>
    <form @submit.prevent="login">
      <div data-mdb-input-init class="form-outline mb-4">
        <label class="form-label" for="form1Example1">Usuario</label>
        <input type="text" id="username" class="form-control" v-model="username" required/>
      </div>

      <!-- Password input -->
      <div data-mdb-input-init class="form-outline mb-4">
        <label class="form-label" for="form1Example2">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required/>
      </div>

      <!-- Alert for errors -->
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>

      <!-- Submit button -->
      <button data-mdb-ripple-init type="submit" class="btn btn-primary btn-block">Inicia sesión</button>
      <div class="link">
        <span>¿No tienes una cuenta?</span> <router-link to="/register">Regístrate</router-link>
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
const errorMessage = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios2.post('/auth/login', {
      username: username.value,
      password: password.value
    });
    const { token, user } = response.data;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    if(token){
      setTimeout(() => {
        router.push('/chat');
      }, 1000);
    }
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 400)) {
      errorMessage.value = 'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
    } else {
      errorMessage.value = 'Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.';
    }
    console.log('Login failed:', error);
  }
};
</script>

<style scoped>
.container-auth {
  width: 40% !important;
  max-width: 80% !important;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: auto;
}
.alert {
  margin-top: 10px;
}
</style>
