<template>
    <div class="border-b border-gray-200 p-4 hover:bg-sky-50 cursor-pointer">
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    {{ getInitials(notification.name) }}
                </div>
            </div>
            <div class="ml-4 flex-1">
                <p class="text-gray-800 font-medium">{{ notification.name }}</p>
                <p class="text-gray-600 text-sm">
                    {{ notification.description }} • {{ notification.status }}
                </p>
                <p class="text-gray-600 text-sm mt-4">
                    Follow Up on <span class="font-bold">{{ notification.date }} {{ notification.timeIndicator ?
                        `(${notification.timeIndicator})` : '' }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        notification: {
            type: Object,
            required: true
        }
    },
    methods: {
        getInitials(name) {
            return name.split(' ').map(word => word[0]).join('').toUpperCase();
        }
    }
}
</script>