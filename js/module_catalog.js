const goodsItem = Vue.component('goodsItem', {
    props: ['good'],
    template: `
      <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }} руб.</p>
        <button type="button" class="add-button" @click="addItem">Добавить в корзину</button>
      </div>
    `,
    methods: {
        addItem: function() {
            this.$emit('addIn', this.good);
        }
    }
});

const goodsList = Vue.component('goodsList', {
    props: ['goods', 'goods2'],
    template: `
    <div class="goods-list">
        <goodsItem v-for="good in goods" :good="good" :key="good.id_product" @addIn="addInCart(good)"></goodsItem>
    </div>
    `,
    methods: {
        async postMethod(url) {
            return await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.goods2)
            })
        },

        addInCart(good) {
            let find = this.goods2.find(item => item.id_product === good.id_product);
            if (find) {
                find.quantity++;
            } else {
                good.quantity = 1;
                this.goods2.push(good);
            }
            this.postMethod(`/addToCart`)
                .then(data => {
                    this.goodscart = data;
                });
        }
    }
});

export { goodsList }