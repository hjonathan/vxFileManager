<template>
    <div class="flex items-center justify-center">
        <!-- <FolderIcon v-if="item.type === 'Directory'" class="size-8 flex-none bg-gray-50" /> -->
        <FolderIconVx v-if="item.type === 'Directory'" class="size-8 flex-none bg-gray-50" />
        <!-- <DocumentIcon v-else class="size-8 flex-none rounded-full bg-gray-50" /> -->

        <div v-else class="flex items-center justify-center pr-2"><span
                class="text-theme theme-text-primary absolute z-[5] mx-auto mt-1 inline-block w-7 overflow-hidden text-ellipsis text-center text-[9px] font-semibold">
                {{ extension }}
            </span> 
            <DocumentIconVx />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { ContentType, FolderType } from '../../../mainHandler/types'
import {FolderIconVx, DocumentIconVx} from '../../ui/icons/index'

const props = defineProps({
    item: {
        type: [ContentType, FolderType],
        required: true
    }
})

const extension = computed(() => {
    return props.item.name.split('.').pop()
})
</script>
