<template>
  <div class="bg-foundation text-foreground p-12">
    <NuxtLink to="http://example.com">Link to exmaple.com</NuxtLink>
    <FormCheckbox name="Checkbox" value="test-checkbox" />
  </div>
</template>
<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

// Tests that show this functionality works in Storybook
const counter = useState('counter', () => 100)
const runtimeConfig = useRuntimeConfig()
const nuxt = useNuxtApp()

// onMounted(() => {
//     console.log(counter.value)
//     console.log(runtimeConfig)
//     console.log(nuxt)
// })
</script>
