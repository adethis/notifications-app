<template>
    <div class="border-b border-gray-200">
        <div class="flex">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                class="py-4 px-10 text-center font-medium relative"
                :class="[activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700']">
                {{ tab.label }}
                <span v-if="tab.count > 0" class="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {{ tab.count }}
                </span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tabs: {
            type: Array,
            required: true
        },
        initialActiveTab: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            activeTab: this.initialActiveTab || (this.tabs.length > 0 ? this.tabs[0].id : null)
        }
    },
    watch: {
        activeTab(newVal) {
            this.$emit('tab-changed', newVal);
        }
    }
}
</script>