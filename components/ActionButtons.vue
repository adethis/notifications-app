<template>
    <div class="flex space-x-4 mt-8 mb-8 px-4">
        <button v-for="button in buttons" :key="button.id"
            class="border border-sky-600 rounded-md px-4 py-2 text-sky-600 flex items-center relative hover:bg-sky-50"
            :class="[button.hasActive ? 'bg-sky-50' : '']">
            {{ button.label }}
            <span v-if="button.hasNotification" class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        buttons: {
            type: Array,
            required: true
        }
    }
}
</script>