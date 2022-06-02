let cart = {};

function loadCart() {
    //проверка есть ли в localstorage запись cart
    if (localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
    }
    else {
        $('.main-cart').html('Корзина пуста');
    }
}

function showCart() {
    //вывод корзины
    if (!isEmpty(cart)){
        $('.main-cart').html('Корзина пуста!');
    }
    else {
        $.getJSON('goods.json', function (data) {
            let goods = data;
            let out = '';
            for (let id in cart) {
                // key - id товара
                out += `<button data-id="${id}" class="del-goods">x</button>`
                out += `<img src="image/${goods[id].img}">`;
                out += `  ${goods[id].name}   `;
                out += `  <button data-id="${id}" class="minus-goods">-</button>  `;
                out += `  ${cart[id]}  `;
                out += `  <button data-id="${id}" class="plus-goods">+</button>  `;
                out += cart[id] * goods[id].cost;
                out += '<br>';
            }
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
    }
}

function delGoods() {
    //Удаление товара из корзины
    let id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function plusGoods() {
    //+1 товар в корзине
    let id = $(this).attr('data-id');
    cart[id] ++;
    saveCart();
    showCart();
}

function minusGoods() {
    //-1 товар в корзине
    let id = $(this).attr('data-id');
    if (cart[id] == 1){
        delete cart[id];
    }else{
        cart[id] --;
    }
    saveCart();
    showCart();
}

function saveCart() {
    //сохранение корзины
    localStorage.setItem('cart', JSON.stringify(cart));
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (let key in object)
        if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    //формирование письма email
    let name = $('#name').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    if (name != '' && email != '' && phone != ''){
        if (isEmpty(cart)){
            $.post(
                "core/mail.php",{
                    "name" : name,
                    "email" : email,
                    "phone" : phone,
                    "cart" : cart
                },
                function (data){
                    console.log(data);
                }
            );
        }else {
            alert('Корзина пуста');
        }
    }else{
        alert('Зполните поля');
    }
}

$(document).ready(function (){
    loadCart();
    $('.send-email').on('click', sendEmail); // отправить письмо с заказом
});