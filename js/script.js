class GoodsItem { //товар
    constructor(title, price = 0, description = 'Этот товар еще не имеет описания') {
        this.title = title;
        this.price = price;
        this.description = description;
    }
    render() {
        return `<div class="goods-item"><div class="goods-text"><div><h3>${this.title}</h3><p>${this.description}</p></div><div><p class="price">${(this.price > 0)? (this.price + '$</p></div></div><button class="item-button" type="button">Поместить в корзину</button></div>') : 'нет в продаже</p></div></div>'}`;
        /*         return `<div class="goods-item"><div class="goods-text"><div><h3>${this.title}</h3><p>${this.description}</p></div><div><p class="price">${(this.price > 0)? (this.price + '$') : 'нет в продаже'}</p></div></div><button class="item-button" type="button">Поместить в корзину</button></div>`; */
    }
}

class GoodsList { //список товаров в магазине
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150, description: 'Желтые, длиной до колена' },
            { title: 'Socks', price: 50, description: 'Мужские, черные в белый горошек' },
            { title: 'Jacket', price: 350, description: 'Детский, зеленый, очень миленький' },
            { title: 'Shoes', price: 250, description: 'Носить только с теплым носком при температуре -20 градусов' },
            { title: 'Hat', price: 550 },
            { title: 'Dress', description: 'теплое' },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.description);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

class CartItem { //товар в корзине
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() { //вывод элемента корзины
        return `<div class="cart-item"><div class="cart-text-item"><p>${this.title}</p></div><div><p>${this.price}</p></div></div>`;
    }
}

class Cart { //список товаров в корзине
    constructor() {
        this.goodscart = [];
    }
    good_add() { //добавить товар в корзину

    }
    good_del() { //удалить товар из корзины

    }

    calc_cost(counts) { //подсчитать стоимость корзины
        let cost = 0;
        for (let i = 0; i < counts; i++) {
            cost += this.goodscart[i].price;
        }
        return cost;

    }
    fetchGoods() { //получить корзину пока нет добавления
        this.goodscart = [
            { title: 'Shirt', price: 150 },
            { title: 'Jacket', price: 350 },
            { title: 'Jacket', price: 350 },
            { title: 'Hat', price: 550 },
        ];
    }
    render() { //показать корзину
        let counts = this.goodscart.length;
        let listHtml = '';

        this.goodscart.forEach(good => {
            const cartItem = new CartItem(good.title, good.price);
            listHtml += cartItem.render();

        });
        let cost = this.calc_cost(counts);
        listHtml += `<div class="cart-footer"><p>Итого ${counts} товаров на сумму ${cost} рублей</p></div>`
        document.querySelector('.cart-list').innerHTML = listHtml;
    }

}

const list = new GoodsList();
list.fetchGoods();
list.render();

const list2 = new Cart();
list2.fetchGoods();
list2.render();