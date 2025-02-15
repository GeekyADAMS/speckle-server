<template>
  <div
    :class="`bg-foundation simple-scrollbar fixed top-[4rem] right-4 mb-4 max-h-[calc(100vh-5.5rem)] w-64 overflow-y-auto rounded-md shadow transition ${
      objects.length !== 0
        ? 'translate-x-0 opacity-100'
        : 'translate-x-[120%] opacity-0'
    }`"
  >
    <ViewerLayoutPanel @close="clearSelection()">
      <template #actions>
        <button
          class="hover:text-primary px-1 py-2 transition"
          @click.stop="hideOrShowSelection"
        >
          <EyeIcon v-if="!isHidden" class="h-3 w-3" />
          <EyeSlashIcon v-else class="h-3 w-3" />
        </button>

        <button
          class="hover:text-primary px-1 py-2 transition"
          @click.stop="isolateOrUnisolateSelection"
        >
          <FunnelIconOutline v-if="!isIsolated" class="h-3 w-3" />
          <FunnelIcon v-else class="h-3 w-3" />
        </button>
      </template>
      <div class="px-1 py-2">
        <div class="space-y-2">
          <ViewerSelectionObject
            v-for="object in objectsLimited"
            :key="(object.id as string)"
            :object="object"
            :unfold="false"
          />
        </div>
        <div v-if="itemCount <= objects.length" class="mb-2">
          <FormButton size="xs" text full-width @click="itemCount += 10">
            View More ({{ objects.length - itemCount }})
          </FormButton>
        </div>
        <div v-if="objects.length === 1" class="text-foreground-2 mt-2 px-2 text-xs">
          Hold down "shift" to select multiple objects.
        </div>
      </div>
    </ViewerLayoutPanel>
  </div>
</template>
<script setup lang="ts">
import { EyeIcon, EyeSlashIcon, FunnelIcon } from '@heroicons/vue/24/solid'
import { FunnelIcon as FunnelIconOutline } from '@heroicons/vue/24/outline'

import { onKeyStroke } from '@vueuse/core'
import { useInjectedViewerState } from '~~/lib/viewer/composables/setup'
import { getTargetObjectIds } from '~~/lib/object-sidebar/helpers'
import { containsAll } from '~~/lib/common/helpers/utils'
import { useFilterUtilities, useSelectionUtilities } from '~~/lib/viewer/composables/ui'

const {
  viewer: {
    metadata: { filteringState }
  }
} = useInjectedViewerState()
const { objects, clearSelection } = useSelectionUtilities()
const { hideObjects, showObjects, isolateObjects, unIsolateObjects } =
  useFilterUtilities()

const itemCount = ref(10)
const objectsLimited = computed(() => {
  return objects.value.slice(0, itemCount.value)
})

const hiddenObjects = computed(() => filteringState.value?.hiddenObjects)
const isolatedObjects = computed(() => filteringState.value?.isolatedObjects)

const allTargetIds = computed(() => {
  const ids = []
  for (const obj of objects.value) {
    ids.push(...getTargetObjectIds(obj))
  }

  return ids
})

const isHidden = computed(() => {
  if (!hiddenObjects.value) return false
  return containsAll(allTargetIds.value, hiddenObjects.value)
})

const isIsolated = computed(() => {
  if (!isolatedObjects.value) return false
  return containsAll(allTargetIds.value, isolatedObjects.value)
})

const hideOrShowSelection = () => {
  if (!isHidden.value) {
    hideObjects(allTargetIds.value)
    clearSelection() // when hiding, the objects disappear. they can't really stay "selected"
    return
  }

  showObjects(allTargetIds.value)
}

const isolateOrUnisolateSelection = () => {
  if (isIsolated.value) {
    unIsolateObjects(allTargetIds.value)
  } else {
    isolateObjects(allTargetIds.value)
  }
}

onKeyStroke('Escape', () => {
  // Cleareance of any vis/iso state coming from here should happen in clearSelection()
  clearSelection()
})
</script>
