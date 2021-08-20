const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        goodscart: [],
        searchLine: '',
        isVisibleCart: false,
        kol: 0,

    },
    methods: {
        makeGETRequest(url, callback) {
            const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

            var xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('GET', url, true);
            xhr.send();
        },

        filterGoods(value) {
            const regexp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },
        addInCart(value) {
            const index = this.filteredGoods.findIndex(item => item.id_product === value);
            this.goodscart.push(this.filteredGoods[index]);

        },
        showCart() {
            this.isVisibleCart = true;
        },
        
        delFromCart(value) {
            const index = this.filteredGoods.findIndex(item => item.id_product === value);
            if (this.kol > 1) {
                this.goodscart.splice(index, 1);
            }
            else {
                this.goodscart = [];
            }
               
        }

    },
    computed: {
        countGoodsCart() {
            this.kol = this.goodscart.length; //++;
            return ' ' + String(this.kol);
        },
        sumPrice() {
            return this.goodscart.reduce((sum, item) => sum + item.price, 0);
        }

    },

    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        });

    }

});