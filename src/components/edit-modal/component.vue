<template>
	<div class="edit-modal">
        <div class="edit-modal__content" v-click-outside="closeModal">
            <div class="edit-modal__arrow" @click="closeModal"></div>
            <div class="edit-modal__title">
                <span v-if="action == 'edit'">
                    Внесите изменения:  
                </span>
                <span v-if="action == 'add'">
                    Внесите данные:
                </span>
            </div>
            <div class="input__wrapper">
                <label class="label">Название ниги</label>
                <input 
                    type="text" 
                    class="input"
                    :class="{'input__error' : name.error}"
                    @input="name.error = false"
                    placeholder="Введите название"
                    v-model="name.value"
                >
            </div>
            <div class="input__wrapper">
                <label class="label">Автор Книги</label>
                <input 
                    type="text" 
                    class="input"
                    :class="{'input__error' : author.error}"
                    @input="author.error = false"
                    placeholder="Введите имя автора"
                    v-model="author.value"
                >
            </div>
            <div class="input__wrapper">
                <label class="label">Описание книги</label>
                <textarea 
                    type="textarea"
                    class="input input__textarea"
                    :class="{'input__error' : about.error}"
                    @input="about.error = false"
                    placeholder="Введите описание"
                    v-model="about.value"
                ></textarea>
            </div>
            <div class="edit-modal__buttons">
                <div class="edit-modal__btn-wrapper">
                    <div 
                        v-if="action == 'edit'" 
                        class="edit-modal__btn"
                        @click="sendForm"
                    >
                        изменить
                    </div>
                    <div class="edit-modal__btn-line"></div>
                </div>

                <div class="edit-modal__btn-wrapper">
                    <div 
                        v-if="action == 'add'" 
                        class="edit-modal__btn"
                        @click="sendForm"
                    >
                        добавить
                    </div>
                    <div class="edit-modal__btn-line"></div>
                </div>
                
                <div class="edit-modal__btn-wrapper">
                    <div @click="closeModal" class="edit-modal__btn">
                        отмена
                    </div>
                    <div class="edit-modal__btn-line"></div>
                </div>
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
            name: {
                value: '',
                error: false
            },
            author: {
                value: '',
                error: false
            },
            about: {
                value: '',
                error: false
            }
		}
    },
    props: ['item','action'],
    computed: {
        editedBook() {
            let obj = {};

            if (this.item && this.item.id) {
                obj.id = this.item.id;
            } else {
                obj.id = 'book-' + Math.random().toString(36).substr(2, 9);
            }

            obj.name = this.name.value;
            obj.img = this.item.img;
            obj.author = this.author.value;
            obj.about = this.about.value;
            return obj;
        }  
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        setStartValue(dataItem) {
            if (this.item[dataItem]) {
                this[dataItem].value = this.item[dataItem];    
            }
        },
        setInputError(item) {
            this[item].error = true;
        },
        sendForm() {
            if ( this.valid() ) this.send();
        },
        valid() {
            let valid = true;

            if (!this.name.value || this.name.value == '') {
                this.setInputError('name');
                valid = false;
            }
            
            if (!this.author.value || this.author.value == '') {
                this.setInputError('name');
                valid = false;
            }
            
            if (!this.about.value || this.about.value == '') {
                this.setInputError('name');
                valid = false;
            }

            return valid;
        },
        send() {
            let action;
            let method;

            if (this.action == 'edit') {
                method = 'patch';
                action = 'books/' + this.item.id
            }

            if (this.action == 'add') {
                method = 'post';
                action = 'books'
            }

            Vue.http[method]( action, this.editedBook)
                .then(response => response.json())
                .then(data => {
                   console.log(data);
                }, data => {
                })
            this.$emit('update-books');
            this.closeModal();
        },
    },
    created() {
        if (this.item && this.action == 'edit') {
            this.setStartValue('name');
            this.setStartValue('author');
            this.setStartValue('about');
        }
    }
}
</script>

<style lang="sass">
</style>