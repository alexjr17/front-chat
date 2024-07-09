<template>
  <div class="w-100 d-flex">
    <div class="row w-100 d-flex">
      <div class="col-7">
        <iframe
          class="video-frame"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="col-5">
        <div class="chat-box flex-grow-1 p-2 overflow-auto" ref="chatBox">
          <div v-for="message in messages" :key="message.id" class="message mb-2">
            <strong>{{ message.User.username }}:</strong> {{ message.content }}
          </div>
        </div>
        <form @submit.prevent="sendMessage" class="d-flex p-2 border-top">
          <input
            v-model="newMessage"
            type="text"
            class="form-control me-2"
            placeholder="Type a message..."
            required
          />
          <button type="submit" class="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { io } from 'socket.io-client';
import axios2 from '../../api/api_live_chat';

const socket = io('http://localhost:5000'); // Asegúrate de que esta URL sea correcta
const messages = ref([]);
const newMessage = ref('');
const chatBox = ref(null);

const fetchMessages = async () => {
  try {
    const response = await axios2.get('/chat');
    messages.value = response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

onMounted(() => {
  fetchMessages();

  socket.on('chat message', (msg) => {
    messages.value.push(msg);
    if (chatBox.value) {
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    }
  });
});

const sendMessage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (newMessage.value.trim() !== '' && user) {
    console.log(newMessage.value.trim(), user); 
    const message = {
      userId: user.id,
      content: newMessage.value.trim()
    };
    socket.emit('chat message', message);
    newMessage.value = '';
  }
};

onBeforeUnmount(() => {
  socket.disconnect();
});
</script>

<style scoped>

#app {
  display: none !important;
}

html, body {
  height: 100%;
  margin: 0;
}

.chat-container {
  height: 100vh;
  display: flex;
}

.video-section {
  flex-grow: 1;
  display: flex;
}

.video-frame {
  width: 100%;
  height: 100%;
  border: none;
}

.chat-section {
  width: 100%;
  max-width: 400px; /* Limita el ancho máximo para el chat */
  display: flex;
  flex-direction: column;
}

.chat-box {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
}

.form-control {
  flex: 1;
}
</style>
