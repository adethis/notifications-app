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

                                <div class="flex border-b border-gray-200">
                                    <button @click="activeTab = 'reminder'"
                                        class="flex-1 py-3 font-medium text-center relative"
                                        :class="activeTab === 'reminder' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-500'">
                                        Reminder
                                        <span v-if="reminderCount > 0"
                                            class="ml-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 inline-flex items-center justify-center">
                                            {{ reminderCount }}
                                        </span>
                                    </button>
                                    <button @click="activeTab = 'update'"
                                        class="flex-1 py-3 font-medium text-center relative"
                                        :class="activeTab === 'update' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-500'">
                                        Update
                                        <span v-if="updateCount > 0"
                                            class="ml-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 inline-flex items-center justify-center">
                                            {{ updateCount }}
                                        </span>
                                    </button>
                                </div>

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

                                <div class="flex items-center">
                                    <button
                                        class="flex justify-center items-center gap-1 px-4 py-3 bg-sky-50/50 w-full text-sm text-sky-600 font-medium"
                                        @click="handleMouseLeave">
                                        <span class="text-sky-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-3"
                                                viewBox="0 0 576 512" fill="currentColor">
                                                <path
                                                    d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                            </svg>
                                        </span>
                                        See more
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div
                            class="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center font-medium">
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
                { id: 'followup', label: 'Follow Up', hasNotification: false, hasActive: true },
                { id: 'withdrawal', label: 'Withdrawal', hasNotification: true, hasActive: false },
                { id: 'documentIn', label: 'Document IN', hasNotification: true, hasActive: false }
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