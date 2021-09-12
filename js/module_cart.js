//
const cartItem = Vue.component('cartItem', {
    props: ['good'],
    template: `
      <div class="cart-item">
        <h3 class="cart-item-name">{{ good.product_name }}</h3>
        <p class="cart-item-quantity">{{ good.quantity}}</p>
        <p class="cart-item-price">{{ good.price }} руб.</p>
        <button type="button" class="del-button" @click="delItem">Удалить из корзины</button>
      </div>
    `,
    methods: {
        delItem: function() {
            this.$emit('delOut', this.good.id_product);
        }
    }
});

const cartList = Vue.component('cartList', {
    /*   components: { cartItem }, */
    props: ['goods'],
    template: `
        <div class="cart-list">
            <cartItem v-for="good in goods" :good="good" :key="componentKey" @delOut="delFromCart(good.id_product)"></cartItem>
            <p>В корзине {{countGoodsCart()}} товаров на сумму {{sumPrice()}} руб.</p>
        </div>
    `,
    data() {
        return {
            componentKey: 0,
        };
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },

        async delMethod(url) {
            try {
                const result = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.goods)
                });
                return await result.json();
            } catch (error) {
                console.log(error);
            }

        },
        countGoodsCart() {
            return ' ' + String(this.goods.reduce((sum, item) => sum + item.quantity, 0));
        },
        sumPrice() {
            return this.goods.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        delFromCart(value) {
            this.delMethod(`/deleteFromBasket/:` + value)
                .then(data => {
                    this.goods = data;
                });

            // this.forceRerender();
            this.countGoodsCart();
            this.sumPrice();
            //this.$forceUpdate();
        }
    }
});


export { cartList }