
import { config } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [],
});

config.global.plugins = [router];
