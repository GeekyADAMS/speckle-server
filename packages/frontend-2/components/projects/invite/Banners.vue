<template>
  <!-- Breakout div from main container -->

  <div class="layout-container">
    <div class="flex flex-col">
      <ProjectsInviteBanner v-for="item in items" :key="item.id" :invite="item" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { graphql } from '~~/lib/common/generated/gql'
import { ProjectsInviteBannersFragment } from '~~/lib/common/generated/gql/graphql'

graphql(`
  fragment ProjectsInviteBanners on User {
    projectInvites {
      ...ProjectsInviteBanner
    }
  }
`)

const props = defineProps<{
  invites: ProjectsInviteBannersFragment
}>()

const items = computed(() => props.invites.projectInvites)
</script>
