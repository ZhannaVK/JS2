import { cartList } from './module_cart.js';
import { goodsList } from './module_catalog.js';



Vue.component('search', {
    props: ['value'],
    template: `
        <input type="text" :value="value" @input="$emit('input', $event.target.value)">    `
});


const app = new Vue({
    el: '#app',
    template: `<div>
    <header>
            <nav class="menu center">

                <search v-model="searchLine"></search>
                <button type="button" @click="filterGoods()">Искать</button>
                <br>
                <button class="cart-button" @click="hideShowCart">{{ isVisibleCart ? 'Скрыть корзину' : 'Корзина' }}</button>
            </nav>

        </header>
    <main>
            <div class="center main">
                <goodsList :goods="filteredGoods" :goods2="goodscart" v-if="!isVisibleCart"></goodsList>

                <div class="cart" v-if="isVisibleCart">
                    <br>
                    <h2 class="cart-title">Товары в корзине</h2>
                    <br>
                    <cartList :goods="goodscart"></cartList>
                </div>
            </div>
        </main></div>`,
    data: {
        goods: [],
        filteredGoods: [],
        goodscart: [],
        searchLine: '',
        isVisibleCart: false,
    },

    methods: {
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },
        async getJson(url) {
            try {
                const result = await fetch(url);
                return await result.json();
            } catch (error) {
                console.log(error);
            }
        },
        hideShowCart() {
            this.isVisibleCart = !this.isVisibleCart;
            if (this.isVisibleCart) {
                this.getJson(`/getCart`)
                    .then(data => {
                        this.goodscart = data;
                    });
            }
        },
    },

    mounted() {
        this.getJson(`/catalogData`)
            .then(data => {
                this.goods = data;
                this.filterGoods('');
            });
        this.getJson(`/getCart`)
            .then(data => {
                this.goodscart = data;
            });
    }
});