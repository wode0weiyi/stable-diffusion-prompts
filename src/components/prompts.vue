<script setup>
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import Prompts from "../assets/prompts.json";

const scenes = ref([]);
const infos = ref([]);
const keywords = ref([]);
const currentScene = ref("");
const result = ref("");

onMounted(() => {
  for (const [key, value] of Object.entries(Prompts)) {
    scenes.value.push(key);
  }
  currentScene.value = scenes.value[0];
  const value = Prompts[scenes.value[0]];
  for (const [k, v] of Object.entries(value)) {
    infos.value.push({ label: v, value: k });
  }
});
const handleScenes = (scene) => {
  currentScene.value = scene;
  const value = Prompts[scene];
  const _infos = [];
  for (const [k, v] of Object.entries(value)) {
    _infos.push({ label: v, value: k });
  }
  infos.value = _infos;
};

const handelChangeInfo = (value) => {
  console.log(keywords.value[currentScene.value]);
  if (!keywords.value[currentScene.value]) return;
  dealKeyWords();
};
const dealKeyWords = () => {
  let _result = "";
  for (const [key, value] of Object.entries(keywords.value)) {
    _result += `${key}:${value.join(",")}\n`;
  }
  result.value = _result;
};
const handleCopy = () => {
  let _result = "";
  for (const [key, value] of Object.entries(keywords.value)) {
    _result += `${value.join(",")},`;
  }
  if (_result) {
    navigator.clipboard.writeText(_result);
    message.success("复制成功");
  } else {
    message.error("复制失败");
  }
};
</script>

<template>
  <div>
    <a-page-header
      title="stable diffusion prompts"
      sub-title="stable diffusion prompts-提示词"
    >
      <template #footer>
        <img src="" alt="" />
      </template>
    </a-page-header>
    <div class="prompts__scenes">
      <a-button
        :type="currentScene === scene ? 'primary' : 'default'"
        class="prompts__scenes-item"
        v-for="(scene, index) in scenes"
        :key="index"
        @click="handleScenes(scene)"
      >
        {{ scene }}
      </a-button>
    </div>
    <a-divider style="border-color: #999" dashed />
    <div class="prompts__infos">
      <a-checkbox-group
        v-model:value="keywords[currentScene]"
        :options="infos"
        @change="handelChangeInfo"
      />
    </div>
    <a-divider style="border-color: #999" dashed />
    <div class="prompts__scenes-result">
      <a-button type="primary" @click="handleCopy">复制</a-button>
      <div style="white-space: pre-wrap">{{ result }}</div>
    </div>
  </div>
</template>

<style scoped>
.prompts__scenes {
  display: flex;
  flex-wrap: wrap;
}
.prompts__scenes-item {
  margin: 10px;
  cursor: pointer;
  border-radius: 10px;
}
:deep(.ant-checkbox-group-item) {
  line-height: 3;
  font-size: 16px;
}
</style>
