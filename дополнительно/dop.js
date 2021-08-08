/* 3* Некая сеть фастфуда предлагает несколько видов гамбургеров:
Маленький (50 рублей, 20 калорий).
Большой (100 рублей, 40 калорий).
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
С сыром (+10 рублей, +20 калорий).
С салатом (+20 рублей, +5 калорий).
С картофелем (+15 рублей, +10 калорий).
Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий). 
Напишите программу, рассчитывающую стоимость и калорийность гамбургера */

const small_price = 50; // цена маленького
const small_cal = 20; // калорийность маленького
const big_price = 100; //цена большого
const big_cal = 40; //калорийность большого

class Burger {
    constructor(price, calories) {
            this.price = price;
            this.calories = calories;
        }
        /*  add_filling(add_price, add_calories) {
             this.price = this.price + add_price;
             this.calories = this.calories + add_calories;
         } */
    add_cheese() {
        this.price = this.price + 10;
        this.calories = this.calories + 20;
    }
    add_salad() {
        this.price = this.price + 20;
        this.calories = this.calories + 5;
    }
    add_potatoes() {
        this.price = this.price + 15;
        this.calories = this.calories + 10;
    }
}
class BurgerPlus extends Burger {
    seasoning() {
        this.price = this.price + 15;
    }
    mayonnaise() {
        this.price = this.price + 20;
        this.calories = this.calories + 5;
    }
}

// запрос заказа
var g_size, g_add, g_plus;
g_size = prompt('Выберите размер гамбургера (1 - большой, 2 - маленький): ');
if (isNaN(g_size) || ((parseInt(g_size) != 1) && (parseInt(g_size) != 2))) {
    alert('нет в меню');
} else {
    g_size = parseInt(g_size);
    g_add = prompt('Укажите начинку (1 - сыр / 2 - салат / 3 - картофель): ');
    if (isNaN(g_add) || ((parseInt(g_add) != 1) && (parseInt(g_add) != 2) && (parseInt(g_add) != 3))) {
        alert('упс...');
    } else {
        g_add = parseInt(g_add);
        g_plus = prompt('Можно добавить (1 - приправу / 2 - майонез / 3 - и то и то: ');
        if (isNaN(g_plus) || ((parseInt(g_plus) != 1) && (parseInt(g_plus) != 2) && (parseInt(g_plus) != 3))) {
            g_plus = 0;
        } else {
            g_plus = parseInt(g_plus);
        }
        if (g_size === 1) {
            var zakaz = new BurgerPlus(big_price, big_cal);
        } else {
            var zakaz = new BurgerPlus(small_price, small_cal);
        }
        switch (g_add) {
            case 1:
                zakaz.add_cheese();
                break;
            case 2:
                zakaz.add_salad();
                break;
            default:
                zakaz.add_potatoes();
                break;
        }
        switch (g_plus) {
            case 1:
                zakaz.seasoning();
                break;
            case 2:
                zakaz.mayonnaise();
                break;
            case 3:
                zakaz.seasoning();
                zakaz.mayonnaise();
                break;
            default:
                break;
        }

        alert(zakaz.price + ' руб. (' + zakaz.calories + ' калории)');
    }
}