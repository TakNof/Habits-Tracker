<script setup>
    defineProps({
    habitsCount: {
        type: Number,
        required: true
    }
    })
</script>

<template>
    <header>
        <h1>Habit Tracker App</h1>
        <div class="header-summary">
            <h3>Sooner or later discipline will overcome intelligence.</h3>
            <p>Habits tracked: {{habitsCount}}.</p>
        </div>
    </header>
</template>