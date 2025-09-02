<script setup>
  import '../index.css'  
  import Habit from '../components/Habit.vue'
  import NewHabitForm from '../components/NewHabitForm.vue'
  import MyHeader from '@/components/MyHeader.vue';
</script>

<script>
  export default {
    data() {
      return {
        habits: [],
        id: 0,
        creatingHabit: false
      }
    },
    methods: {
      addHabit(habitData) {
        const today = new Date().toISOString().split('T')[0]

        this.habits.push({
          id: Date.now(),
          title: habitData.title,
          description: habitData.description,
          daysCompleted: [
            {
              date: today,
              completed: false
            }
          ],
          done: false
        })
        this.creatingHabit = false
        this.saveHabits()
      },
      deleteHabit(id){
        this.habits = this.habits.filter(habit => habit.id !== id);
        this.saveHabits()
      },
      toggleHabit(id) {
        const habit = this.habits.find(h => h.id === id)
        if (!habit) return

        habit.done = !habit.done

        const today = new Date().toISOString().split('T')[0]
        let todayEntry = habit.daysCompleted.find(d => d.date === today)

        if (todayEntry) {
          todayEntry.completed = habit.done;
        } else {
          habit.daysCompleted.push({
            date: today,
            completed: true
          })
        }

        this.saveHabits()
      },
      saveHabits() {
        localStorage.setItem('habits', JSON.stringify(this.habits))
      },
      checkHabits(){
        const storedHabits = localStorage.getItem('habits')
        if (!storedHabits) return; 
        this.habits = JSON.parse(storedHabits)

        const today = new Date().toISOString().split('T')[0];

        this.habits.forEach(habit => {
          const lastDay = habit.daysCompleted[habit.daysCompleted.length - 1]

          if (lastDay.date !== today) {
            habit.daysCompleted.push({ date: today, done: false })
          }
        })
        this.saveHabits();
      } 
      
    },
    mounted() {
      this.checkHabits();
    }
  }
</script>

<template>
    <MyHeader :habits-count="habits.length" />
    <div class="general-habits-container">
            <div class="add-habit">
            <button class = "add-habit-btn" @click="creatingHabit = true">
                <div class="add-icon"></div>
                <span>Add Habit</span>
            </button>
        </div>
        
        <NewHabitForm v-if="creatingHabit" @confirm-habit="addHabit" @cancel-habit="creatingHabit = false"/>

        <div class="habits-container">
            <Habit v-for="habit in habits" :key="habit.id" :habit="habit" @delete-habit="deleteHabit" @toggle-habit="toggleHabit"/>
        </div>
    </div>

    <main>
    </main>
</template>
