<template>
    <transition name="show">
	    <div class="card" :key="item.id">
            <div class="card__img">
                <img v-if="item.img" :src="item.img" :alt="item.name">
                <img v-else src="src/assets/img/books/book-img.png" :alt="item.name">
            </div>
            <div class="card__info">
                <transition name="right">
                    <div v-if="isName">
                        <div class="card__title">
                            Название:
                        </div>
                        <div class="card__name card__text">
                            {{item.name}}
                        </div>    
                    </div>    
                </transition>

                <transition name="right">
                    <div v-if="item.author && isAuthor">
                        <div class="card__title">
                            Автор:
                        </div>
                        <div class="card__author card__text">
                            {{item.author}}
                        </div>
                    </div>
                </transition>

                <transition name="right">
                    <div v-if="item.about && isAbout">
                        <div class="card__title">
                            Описание:
                        </div>
                        <div class="card__about card__text">
                            {{item.about}}
                        </div>
                    </div>
                </transition>
                <transition name="right">
                    <div v-if="isButtons" class="card__buttons">
                        <div @click="$emit('edit-item')" class="card__btn class__edit">
                            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.4647 1.93634C16.7274 1.67369 17.0392 1.46535 17.3823 1.32321C17.7255 1.18107 18.0933 1.10791 18.4647 1.10791C18.8362 1.10791 19.204 1.18107 19.5471 1.32321C19.8903 1.46535 20.2021 1.67369 20.4647 1.93634C20.7274 2.19898 20.9357 2.51078 21.0778 2.85395C21.22 3.19711 21.2931 3.5649 21.2931 3.93634C21.2931 4.30777 21.22 4.67557 21.0778 5.01873C20.9357 5.36189 20.7274 5.67369 20.4647 5.93634L6.96472 19.4363L1.46472 20.9363L2.96472 15.4363L16.4647 1.93634Z" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div @click="$emit('delete-item')" class="card__btn card__delete">
                            <svg id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 452c8.284 0 15-6.716 15-15v-242c0-8.284-6.716-15-15-15s-15 6.716-15 15v242c0 8.284 6.716 15 15 15z"/><path d="m346 452c8.284 0 15-6.716 15-15v-242c0-8.284-6.716-15-15-15s-15 6.716-15 15v242c0 8.284 6.716 15 15 15z"/><path d="m166 452c8.284 0 15-6.716 15-15v-242c0-8.284-6.716-15-15-15s-15 6.716-15 15v242c0 8.284 6.716 15 15 15z"/><path d="m46 150h45v347c0 8.284 6.716 15 15 15h300c8.284 0 15-6.716 15-15v-347h45c8.284 0 15-6.716 15-15s-6.716-15-15-15h-15v-45c0-8.284-6.716-15-15-15h-105v-45c0-8.284-6.716-15-15-15h-120c-8.284 0-15 6.716-15 15v45h-105c-8.284 0-15 6.716-15 15v45h-15c-8.284 0-15 6.716-15 15s6.716 15 15 15zm345 332h-270v-332h270zm-180-452h90v30h-90zm-120 60h330v30h-330z"/></g></svg>
                        </div>
                    </div>
                </transition>
            </div>
	    </div>
    </transition>
</template>

<script>
import Vue from 'vue'
export default {
	name: 'app',
	data () {
		return {
            isName: false,
            isAuthor: false,
            isAbout: false,
            isButtons: false
		}
    },
    props: ['item'],
    methods: {
    },
    created() {
        setTimeout(() => {
            this.isName = true;
        }, 300);
        setTimeout(() => {
            this.isAuthor = true;
        }, 500);
        setTimeout(() => {
            this.isAbout = true;
        }, 700);
        setTimeout(() => {
            this.isButtons = true;
        }, 900);
    }
}
</script>

<style lang="sass">
</style>