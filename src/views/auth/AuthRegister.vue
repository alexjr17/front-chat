<template>
  <div class="container-auth">
    <h2>Register</h2>

    <form @submit.prevent="register">
      <div data-mdb-input-init class="form-outline mb-1">
        <label class="form-label" for="form3Example1">Nombres</label>
        <input type="text" class="form-control" id="name" v-model="name" required/>
      </div>

      <div data-mdb-input-init class="form-outline mb-1">
        <label class="form-label" for="form3Example2">Apellidos</label>
        <input type="text" id="lastname" class="form-control" v-model="lastname" required/>
      </div>

      <div data-mdb-input-init class="form-outline mb-1">
        <label class="form-label" for="form3Example3">Usuario</label>
        <input type="text" class="form-control" id="username" v-model="username" required/>
      </div>
      
      <div data-mdb-input-init class="form-outline mb-1">
        <label class="form-label" for="form3Example4">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required/>
      </div>

      <!-- Alert for errors -->
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      
      <button data-mdb-ripple-init type="submit" class="btn btn-primary btn-block mb-4">Sign up</button>

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
const lastname = ref('');
const surname = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const register = async () => {
  try {
    const response = await axios2.post('/auth/register', {
      username: username.value,
      name: name.value,
      lastname: name.value,
      surname: surname.value,
      password: password.value,
      role: "student"
    });
    const { token, user } = response.data;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/chat');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      errorMessage.value = 'Error en los datos de registro. Por favor, verifique los campos.';
    } else if (error.response && error.response.status === 409) {
      errorMessage.value = 'El usuario ya existe. Por favor, elija otro nombre de usuario.';
    } else {
      errorMessage.value = 'Error al registrar. Por favor, inténtelo de nuevo más tarde.';
    }
    console.error('Registration failed:', error);
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
}
.alert {
  margin-top: 10px;
}
</style>
