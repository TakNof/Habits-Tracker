<script scoped>
  import '../Habit.css'

  export default {
    props: {
      habit: {
        type: Object,
        required: true
      }
    },
    methods: {
      deleteHabit() {
        this.$emit('delete-habit', this.habit.id)
      },
      seeHabitDetails(id){
          this.$router.push({ name: 'HabitDetails', params: { id} })
      }
    }
  }
</script>

<template>
    <div class="habit-card":class="habit.done ? 'habit-done' : 'habit-pending'">
        <h2 class="card-title">{{habit.title}}</h2>
        <p class="card-desc">{{ habit.description }}</p>
        <div class="habit-status">
            <input type="checkbox" :checked="habit.done" @change= "$emit('toggle-habit', habit.id)" />
            <button @click="seeHabitDetails(habit.id)">See Details</button>
            <button @click="deleteHabit">Delete</button>
        </div>
    </div>  
</template>