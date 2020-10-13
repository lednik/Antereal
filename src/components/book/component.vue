<template>
	<div class="book"
        @mouseover = "setIsHover(true)"
        @mouseleave = "setIsHover(false)"
        @click="$emit('show-card')"
    >
		<div class="book__img">
            <img v-if="item.img" :src="item.img" :alt="item.name">
            <img v-else src="src/assets/img/books/book-img.png" :alt="item.name">
        </div>
        <div class="book__info">
            <div class="book__info-content">
                <div class="book__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M23 5v13.883l-1 .117v-16c-3.895.119-7.505.762-10.002 2.316-2.496-1.554-6.102-2.197-9.998-2.316v16l-1-.117v-13.883h-1v15h9.057c1.479 0 1.641 1 2.941 1 1.304 0 1.461-1 2.942-1h9.06v-15h-1zm-12 13.645c-1.946-.772-4.137-1.269-7-1.484v-12.051c2.352.197 4.996.675 7 1.922v11.613zm9-1.484c-2.863.215-5.054.712-7 1.484v-11.613c2.004-1.247 4.648-1.725 7-1.922v12.051z"/>
                    </svg>
                </div>
                <transition name="book">
                    <div v-if="isHover" class="book__bottom">
                        <div class="book__name">
                            {{item.name}}
                        </div>
                        <div class="book__author">
                            {{item.author}}
                        </div>    
                    </div>
                </transition>
            </div>
        </div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
	name: 'app',
	data () {
		return {
            books: [],
            isHover: false
		}
    },
    props: ['item'],
    methods: {
        setIsHover(value) {
            this.isHover = value;
        }
    }
}
</script>

<style lang="sass">
</style>