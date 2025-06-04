<template>
    <div class="flex items-center justify-center">
        <!-- <FolderIcon v-if="item.type === 'Directory'" class="size-8 flex-none bg-gray-50" /> -->
        <FolderIconVx v-if="item.type === 'Directory'" class="size-16 flex-none" />
        <!-- <DocumentIcon v-else class="size-8 flex-none rounded-full bg-gray-50" /> -->

        <div v-else class="flex items-center justify-center pr-2"><span
                class="text-theme text-emerald-400 absolute mx-auto mt-1 inline-block w-7 overflow-hidden text-ellipsis text-center text-[9px] font-semibold">
                {{ extension }}
            </span> 
            <DocumentIconVx class="size-16" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { ContentType, FolderType } from '../../../mainHandler/types'
import {FolderIconVx, DocumentIconVx} from '../../icons/index'

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
