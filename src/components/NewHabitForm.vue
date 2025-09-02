<script>
    import '../NewHabitForm.css' 

    export default {
        data() {
            return {
                title: "",
                description: "",
                error: ""
            }
        },
        methods: {
            confirm() {
                if (!this.title.trim()) {
                    this.error = "⚠️ The Habit must have a title.";
                    return;
                }

                // Emitimos los datos al padre
                this.$emit("confirm-Habit", {
                    title: this.title,
                    description: this.description,
                    done: false
                });

                // Opcional: limpiar después
                this.title = "";
                this.description = "";
            },
            cancel() {
                this.$emit("cancel-Habit");
                this.title = "";
                this.description = "";
                this.error = "";
            }
        }
    }
</script>


<template>
    <div class="habit-form-overlay">
        <div class="habit-form">
            <h2>Creating a new habit</h2>
            <input v-model="title" placeholder="Habit title" />
            <p v-if="error" class="error-msg">{{ error }}</p>
            <textarea v-model="description" placeholder="Habit description"></textarea>
            <div class="form-btns">
                <button @click="confirm">Confirm</button>
                <button @click="cancel">Cancel</button>
            </div>
        </div>
    </div>
</template>