<template>
	<div id="app">
		<div class="add">
			<div class="add__title" @click="addBook">
				Добавить книгу
			</div>
		</div>
		<div class="books" :class="{'books_animate' : animateList}">
			<book-cmp 
				v-for="item in activeBooks"
				class="books__item"
				:key="item.id"
				:item="item"
				@show-card="showBookCard(item)"
			></book-cmp>
		</div>
		<!-- vuetify - пагинатор -->
		<template>
  			<div class="pagination text-center">
		    	<v-container>
		    	  	<v-row justify="center">
		    	  	  	<v-col cols="8">
		    	  	  	  	<v-container class="max-width">
		    	  	  	  	  	<v-pagination
		    	  	  	  	  	  	v-model="page"
		    	  	  	  	  	  	class="my-4"
		    	  	  	  	  	  	:length="booksLength"
									:total-visible="7"
		    	  	  	  	  	></v-pagination>
		    	  	  	  	</v-container>
		    	  	  	</v-col>
		    	  	</v-row>
		    	</v-container>
		  	</div>
		</template>
		<!--  -->
		<card-cmp 
			v-if="isCard" 
			:item="cardItem"
			@edit-item="editBook"
			@delete-item="deleteBook"
		>
		</card-cmp>
		<transition name="fade">
			<edit-modal-cmp
				v-if="isEditModal"
				:item="cardItem"
				:action="modalAction"
				@close-modal="closeModal"
				@update-books="updateBooks"
			>
			</edit-modal-cmp>
		</transition>
	</div>
</template>

<script>
import Vue from 'vue'
import Book from '@components/book/component.vue'
import Card from '@components/Card/component.vue'
import EditModal from '@components/edit-modal/component.vue'

export default {
	name: 'app',
	data () {
		return {
			books: [],
			page: 1,
			perView: 5,
			animateList: false,
			cardItem: {},
			isCard: false,
			isEditModal: false,
			modalAction: ''
		}
	},
	watch: {
		'activeBooks' : function() {
			this.animateList = true;
			setTimeout(() => {
				this.animateList = false;
			}, 300)
		}
	},
	computed: {
		activeBooks() {
			let array = [];
			let total = this.perView;
			let startPoint = (this.page - 1) * total;
			for (let i = startPoint; i < startPoint + total; i++) {
				if (i < this.books.length) {
					array.push(this.books[i])
				} else {
					break;
				}
			}
			return array;
		},
		booksLength() {
			return Math.ceil(this.books.length / 5);
		}
	},
	components: {
		'book-cmp': Book,
		'card-cmp': Card,
		'edit-modal-cmp': EditModal
	},
	methods: {
		showBookCard(item) {
			console.log('showBookCard', item);
			this.cardItem = item;
			this.isCard = true;
		},
		updateBooks() {
			let url = 'books'
			Vue.http.get(url)
        	    .then(response => response.json())
        	    .then(data => {
					this.books = data;
        	    }, ()=>{
				
				});
			this.isCard = false;
		},
		editBook() {
			this.modalAction = 'edit';
			this.isEditModal = true;
		},
		addBook() {
			this.modalAction = 'add';
			this.isEditModal = true;
		},
		deleteBook() {
			let url = 'books/' + this.cardItem.id
			console.log('delete url', url);
			Vue.http.delete(url)
        	    .then(response => response.json())
        	    .then(data => {
					this.updateBooks();
        	    }, ()=>{
				
				});
		},
		closeModal() {
			console.log('closeModal');
			this.isEditModal = false;
		}
	},
	created() {
		this.updateBooks();
	}
}
</script>

<style lang="sass">
@import './main.sass';
.books
	width: vw(1420)
	margin: 0 auto
	margin-top: vw(40)
	display: flex
	justify-content: space-between
	flex-wrap: wrap
	&_animate
		.book
			transform: translateY(40px)
			opacity: 0
.add
	margin-top: vw(20)
	margin-bottom: vw(20)
	text-align: center
	&__title
		display: inline-block
		font-size: vw(32)
		color: $text
		cursor: pointer
		position: relative
		&:hover
			&::before
				right: calc(100% + 48px)
			&::after
				left: calc(100% + 48px)
		&::before
			content: ''
			position: absolute
			right: calc(100% + 24px)
			width: vw(300)
			height: 1px
			background-color: $primary
			top: 50%
			transform: translate(0,-50%)
			transition: .3s
		&::after
			content: ''
			position: absolute
			left: calc(100% + 24px)
			width: vw(300)
			height: 1px
			background-color: $primary
			top: 50%
			transform: translate(0,-50%)
			transition: .3s
.pagination
	.container
		.row
			justify-content: center
	.v-pagination
		.v-pagination__item--active
			background-color: $bg
</style>
