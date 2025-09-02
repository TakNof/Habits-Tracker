<script setup>
    import '../HabitDetails.css'  
    import { useRoute, useRouter } from 'vue-router'
    import { ref, onMounted } from 'vue'

    const route = useRoute()
    const habitId = route.params.id

    const router = useRouter()
    const habit = ref(null)

    const today = new Date().toISOString().split('T')[0];

    const props = defineProps({
        id: {
            type: [String, Number],
            required: true
        }
    })

    function returnToHome() {
        router.push({ name: 'Home' })
    }
    
    function loadHabit() {
        const storedHabits = localStorage.getItem('habits')
        if (storedHabits) {
            const habits = JSON.parse(storedHabits)
            habit.value = habits.find(h => h.id == habitId)
        }
    }

    onMounted(() => {
        loadHabit()
    })
</script>

<template>
    <div v-if="habit">
        <header><h1>Habit details</h1></header>
        <button class= "return-btn" @click="returnToHome">Return To Home</button>
        <div class="habit-details">
            <h2 class="habit-title"><strong>{{ habit.title }}</strong></h2>
            <h3 class="habit-description">{{ habit.description }}</h3>

            <div class="habit-history">
                <h4>History:</h4>
                <p>This is your habit check history.</p>
                <ul>
                    <li v-for="day in habit.daysCompleted" :key="day.date">
                        <p>{{ day.date }}</p>
                        <p>
                            <span v-if="day.completed">
                                You did it! ✅
                            </span>
                            <span v-else-if="day.date === today">
                                You are on time! ⏳
                            </span>
                            <span v-else>
                                You failed ❌
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <p v-else>Loading habit...</p>
</template>
