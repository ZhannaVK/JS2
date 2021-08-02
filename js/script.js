const goods = [
    { title: 'Shirt', price: 150, descript: 'Желтые, длиной до колена' },
    { title: 'Socks', price: 50, descript: 'Мужские, черные в белый горошек' },
    { title: 'Jacket', price: 350, descript: 'Детский, зеленый, очень миленький' },
    { title: 'Shoes', price: 250, descript: 'Носить только с теплым носком при температуре -20 градусов' },
    { title: 'Hat', price: 550 },
    { title: 'Dress', descript: 'теплое' }
];

const renderGoodsItem = (title, price = 0, descript = 'Этот товар еще не имеет описания') => {
    return `<div class="goods-item"><div class="goods-text"><div><h3>${title}</h3><p>${descript}</p></div><div><p class="price">${(price > 0)? (price + '$') : 'нет в продаже'}</p></div></div><button class="item-button" type="button">Поместить в корзину</button></div>`;
};

// п.2
//const renderGoodsList = (list) => {
//   let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
//  document.querySelector('.goods-list').innerHTML = goodsList;
const renderGoodsList = (list) => {
        document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item.title, item.price, item.descript)).join(' ');
    }
    //п.3 - объединение массива в строку с явно указанным разделителем (по умолчанию исп. запятая, что и происходило)

renderGoodsList(goods);