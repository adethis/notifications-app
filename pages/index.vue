<template>
    <div class="bg-gray-100">
        <div class="container mx-auto px-4 py-8">
            <div class="flex items-center mb-6">
                <div class="text-gray-400">
                    Pages / <span class="text-gray-700">Notifications</span>
                </div>
                <div class="ml-auto flex items-center">
                    <div class="mr-8 cursor-pointer" @mouseenter="showNotif = true">
                        <div class="relative">
                            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <span class="text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                </span>
                            </div>
                            <span
                                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
                        </div>
                        <div v-if="showNotif"
                            class="fixed bg-neutral-800/50 inset-0 z-40 flex justify-end items-start pt-20 pr-4 md:p-16">
                            <div class="right-0 top-0 w-[460px] bg-white rounded-md shadow-lg z-50 overflow-hidden"
                                @mouseenter="keepPopupOpen = true" @mouseleave="handleMouseLeave">
                                <div class="p-4 border-b border-gray-200">
                                    <h2 class="text-xl font-semibold text-gray-800 text-center">Notifications</h2>
                                </div>

                                <!-- Tabs -->
                                <div class="flex border-b border-gray-200">
                                    <button @click="activeTab = 'reminder'"
                                        class="flex-1 py-3 font-medium text-center relative"
                                        :class="activeTab === 'reminder' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'">
                                        Reminder
                                        <span v-if="reminderCount > 0"
                                            class="ml-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 inline-flex items-center justify-center">
                                            {{ reminderCount }}
                                        </span>
                                    </button>
                                    <button @click="activeTab = 'update'"
                                        class="flex-1 py-3 font-medium text-center relative"
                                        :class="activeTab === 'update' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'">
                                        Update
                                        <span v-if="updateCount > 0"
                                            class="ml-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 inline-flex items-center justify-center">
                                            {{ updateCount }}
                                        </span>
                                    </button>
                                </div>

                                <!-- Notification List -->
                                <div class="max-h-96 overflow-y-auto">
                                    <ActionButtons :buttons="actionButtons" />

                                    <h2 class="font-medium text-gray-800 mb-4 px-4">Follow Up Today</h2>

                                    <div>
                                        <NotificationItem v-for="notification in filteredNotifications"
                                            :key="notification.id" :notification="notification" />
                                    </div>

                                    <div v-if="showSectionDivider" class="py-2">
                                        <h2 class="font-medium text-gray-800 my-4 px-4">Needs to be followed up
                                            soon.</h2>
                                    </div>

                                    <div v-if="upcomingNotifications.length > 0">
                                        <NotificationItem v-for="notification in upcomingNotifications"
                                            :key="notification.id" :notification="notification" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div
                            class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">
                            R</div>
                        <span class="ml-2 text-gray-800 font-medium">Ramsey</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1 text-gray-600" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            <h1 class="text-3xl font-bold text-gray-800 mb-10">Notifications</h1>

            <div class="bg-white rounded-xl shadow-sm">
                <NotificationTabs :tabs="tabs" @tab-changed="handleTabChange" />

                <div class="overflow-auto scroll-smooth">
                    <ActionButtons :buttons="actionButtons" />

                    <h2 class="font-medium text-gray-800 mb-4 px-4">Follow Up Today</h2>

                    <div>
                        <NotificationItem v-for="notification in filteredNotifications" :key="notification.id"
                            :notification="notification" />
                    </div>

                    <div v-if="showSectionDivider" class="py-2">
                        <h2 class="font-medium text-gray-800 my-4 px-4">Needs to be followed up soon.</h2>
                    </div>

                    <div v-if="upcomingNotifications.length > 0">
                        <NotificationItem v-for="notification in upcomingNotifications" :key="notification.id"
                            :notification="notification" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 'reminder',
            tabs: [
                { id: 'reminder', label: 'Reminder', count: 0 },
                { id: 'update', label: 'Update', count: 3 }
            ],
            actionButtons: [
                { id: 'followup', label: 'Follow Up', hasNotification: false },
                { id: 'withdrawal', label: 'Withdrawal', hasNotification: false },
                { id: 'documentIn', label: 'Document IN', hasNotification: true }
            ],
            notifications: [
                {
                    id: 1,
                    name: 'Fernandez Thoriq',
                    description: 'Enroll to Primary School, for Year 1',
                    status: 'No Payment Yet',
                    date: '13 Apr 2025',
                    timeIndicator: 'Yestrday',
                    upcoming: false
                },
                {
                    id: 2,
                    name: 'Fernandez Thoriq',
                    description: 'Enroll to Primary School, for Year 1',
                    status: 'No Payment Yet',
                    date: '13 Apr 2025',
                    timeIndicator: '',
                    upcoming: false
                },
                {
                    id: 3,
                    name: 'Fernandez Thoriq',
                    description: 'Enroll to Primary School, for Year 1',
                    status: 'No Payment Yet',
                    date: '13 Apr 2025',
                    timeIndicator: 'Tomorrow',
                    upcoming: true
                },
                {
                    id: 4,
                    name: 'Yandi',
                    description: 'Enroll to Primary School, for Year 1',
                    status: 'No Payment Yet',
                    date: '14 Apr 2025',
                    timeIndicator: 'Next Week',
                    upcoming: true
                }
            ],
            reminderCount: 0,
            updateCount: 0,
            showNotif: false,
            keepPopupOpen: false
        }
    },
    computed: {
        filteredNotifications() {
            return this.notifications.filter(notification => !notification.upcoming);
        },
        upcomingNotifications() {
            return this.notifications.filter(notification => notification.upcoming);
        },
        showSectionDivider() {
            return this.upcomingNotifications.length > 0;
        }
    },
    methods: {
        handleTabChange(tabId) {
            this.activeTab = tabId;
        },
        handleMouseLeave() {
            this.keepPopupOpen = false;
            setTimeout(() => {
                if (!this.keepPopupOpen) {
                    this.showNotif = false;
                }
            }, 100);
        }
    },
}
</script>