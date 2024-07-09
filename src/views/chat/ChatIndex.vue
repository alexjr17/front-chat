<template>
    <div class="container-chat row">
      <div class="col-sm-12 col-md-7">
        <iframe
          class="video-frame rounded-3"
          src="https://www.youtube.com/embed/zLX_GcXt2pI"
          title="Video youtube"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="col-sm-12  col-md-5 pe-3 px-0">
        <div class="card p-0" id="chat2">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Chat</h5>
            <button  type="button" @click="logout" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-sm" data-mdb-ripple-color="dark">Cerrar clase</button>
          </div>

          <div class="divider d-flex align-items-center mb-1">
              <p class="text-center mx-3 mb-0" style="color: #a2aab7;">Inicio clase</p>
            </div>

          <div class="card-body chat-body" data-mdb-perfect-scrollbar-init>
            <div v-for="message in messages" :key="message.id">
              <div class="d-flex flex-row justify-content-end mb-4 pt-1" v-if="user.id === message.userId">
        
                <div class="small">
                  <p class="small p-2 mb-1 text-white rounded-3 bg-primary">{{ message.content }}</p>
                  <p class="small mb-3 rounded-3 text-muted d-flex justify-content-end">{{ formatTime(message.createdAt) }}</p>
                </div>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                  alt="avatar 1" style="width: 45px; height: 100%;">
              </div>


              <div class="d-flex flex-row justify-content-start" v-else>
                <img :src="imagenText(message.User.name)" alt="avatar 1" style="width: 40px; height: 40px;" class="me-1">
                <div>
                  <div class="d-flex align-items-center mb-1">
                    <div class="small p-2 mb-0 rounded-3 bg-body-tertiary">
                      <small class="text-primary">
                        {{ message.User.name }}
                      </small> <br>
                      {{ message.content }}
                    </div>
                  </div>
                  <div class="small d-flex align-items-center mb-3 text-muted">
                    <span v-if="message.User.role == 'moderator'" class="badge rounded-pill me-2" :class="message.User.role == 'moderator' ? 'text-bg-success': 'text-bg-primary'">Moderador</span>
                    <!-- <span>{{ message.User.role }} </span> -->
                    <small> {{ formatTime(message.createdAt) }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form @submit.prevent="sendMessage" >
            <div class="card-footer text-muted d-flex flex-row gap-2">
              <div class="flex-grow-1">
                <input type="text" 
                  class="form-control " 
                  v-model="newMessage"
                  placeholder="Di algo"
                  required
                />
              </div>
              <div class="" >
                <button type="submit" class="btn btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" class="m-auto">
                    <g id="_01_align_center" data-name="01 align center">
                      <path d="M1.444,6.669a2,2,0,0,0-.865,3.337l3.412,3.408V20h6.593l3.435,3.43a1.987,1.987,0,0,0,1.408.588,2.034,2.034,0,0,0,.51-.066,1.978,1.978,0,0,0,1.42-1.379L23.991.021ZM2,8.592l17.028-5.02L5.993,16.586v-4Zm13.44,13.424L11.413,18h-4L20.446,4.978Z"/>
                    </g>
                  </svg>
                </button>

              </div>

            </div>

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
const user = ref(JSON.parse(localStorage.getItem('user')));


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
  if (newMessage.value.trim() !== '' && user) { 
    const message = {
      userId: user.value.id,
      content: newMessage.value.trim()
    };
    socket.emit('chat message', message);
    newMessage.value = '';
  }
};

const logout = async () => {
  // const response = await axios2.get('/auth/logout');
  // remover cariables locales
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  window.location.href = '';

}

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const imagenText = (value) => `https://ui-avatars.com/api/?name=${value}&background=random&rounded=true&size=60`;


onBeforeUnmount(() => {
  socket.disconnect();
});
</script>

<style>
.chat-body {
  height: 450px;
  max-height: 300px;
  overflow-y: auto;
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
#chat2 .form-control {
border-color: transparent;
}

#chat2 .form-control:focus {
border-color: transparent;
box-shadow: inset 0px 0px 0px 1px transparent;
}

.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
margin: 1rem;
background: #eee;
}

.container-chat {
  width: 90% !important;
  max-width: 100% !important;
  padding: 10px !important;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-control {
  margin-bottom: 10px;
}
</style>
