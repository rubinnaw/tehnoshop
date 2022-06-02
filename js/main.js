let cart = {}; //корзина
function init() {
    // считываем файл goods.json
    $.getJSON("goods.json",goodsOut);
}

function goodsOut(data) {
    // вывод товара на главную страницу
    console.log(data);
    let out='';
    for (let key in data){
        // out +='<div class="cart">';
        // out +='<p class="name">'+data[key].name+'</p>';
        // out +='<img src="image/'+data[key].img+'" alt="">';
        // out +='<div class="cost">'+data[key].cost+'</div>';
        // out +='<button class="add-to-cart">Купить</button>';
        // out +='</div>';
        //--------------------------
        out +='<div class="cart">';
        out +=`<p class="name">${data[key].name}</p>`;
        out +=`<img src="image/${data[key].img}" alt="">`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out +=`<button class="add-to-cart" data-id="${key}">Купить</button>`;
        out +='</div>';
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click',addToCart);
}

function addToCart() {
    //добавление в корзину
    let id = $(this).attr('data-id');
    // console.log(id);
    if (cart[id]==undefined){
        cart[id] = 1; //усли в корзине нет товара с таким id - делаем = 1
    }
    else{
        cart[id]++; //если товар есть - +1
    }
    showMiniCart();
    saveCart();
}

function saveCart() {
    //сохранение корзины
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showMiniCart(){
    let out ="";
    for (let key in cart){
        out += key +' ------ ' + cart[key]+'<br>';
    }
    $('.mini-cart').html(out);
}

function loadCart() {
    //проверка есть ли в localstorage запись cart
    if (localStorage.getItem('cart')){
        // если есть - расшифровка и запись в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'))
        showMiniCart();
    }
}

$(document).ready(function (){
    init()
    loadCart();
});