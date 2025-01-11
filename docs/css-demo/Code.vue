<template>
  <iframe
    :src="sandboxUrl"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
  ></iframe>
</template>

<script>
export default {
  props: {
    sandboxId: {
      type: String,
      required: true
    }
  },
  computed: {
    sandboxUrl() {
      return `https://codesandbox.io/embed/${this.sandboxId}?fontsize=14&hidenavigation=1&theme=dark`;
    }
  }
}
</script>
