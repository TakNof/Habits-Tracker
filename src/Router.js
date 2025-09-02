    import { createRouter, createWebHistory } from 'vue-router';
    import Home from './pages/Home.vue';
    import HabitDetails from './pages/HabitDetails.vue';

    const routes = [
      {
        path: `/`,
        name: 'Home',
        component: Home,
      },
      {
        path: '/Habit/:id',
        name: 'HabitDetails',
        component: HabitDetails,
        props: true
      },
      // Add more routes as needed
    ];

    const router = createRouter({
      history: createWebHistory('/Habits-Tracker/'),
      routes,
    });

    export default router;