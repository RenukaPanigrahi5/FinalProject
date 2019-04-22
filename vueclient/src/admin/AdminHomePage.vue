<template>
  <div>
    <button
      v-for="tab in tabs"
      :key="tab"
      @click="selected = tab;"
      :class="['tab-btn', { active: selected === tab }]"
    >
      {{ tab }}
    </button>

    <component :is="selected" class="tab"></component>
  </div>
</template>

<script>
import Home from "../components/Home";
import Contact from "../components/Contact";

export default {
  data: function() {
    return {
      tabs: ["Home", "Contact"],
      selected: "Home"
    };
  },
  components: {
    Home,
    Contact
  }
};
</script>

<style>
.tab-btn {
  padding: 6px 10px;
  background: #ffffff;
  cursor: pointer;
  margin-bottom: 1rem;
  border: 2px solid #cccccc;
  outline: none;
}

.active {
  border-bottom: 3px solid green;
  background: #cccccc;
}

.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>