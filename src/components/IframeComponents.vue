<template>
    <iframe
      class="video-frame rounded-3"
      :src="videoSrc"
      title="Video youtube"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </template>
  
  <script setup>
  const props = defineProps({
    videoSrc: {
      type: String,
      required: true,
    }
  });
  </script>
  
  <style scoped>
  .video-frame {
    width: 100%;
    height: 100%;
    border: none;
  }
  </style>
  