let cart = [];
let modalQt = 1;
let modalKey = 0;

function Clone(element){
    return document.querySelector(element);
}
function CloneAll(elements){
    return document.querySelectorAll(elements);
}
function CloseModal(){
    Clone('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        Clone('.pizzaWindowArea').style.display = 'none';
    },500);
}
function updateCart(){
    Clone('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        Clone('aside').classList.add('show');
        Clone('.cart').innerHTML = '';
        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>{
                return item.id === cart[i].id;
            });
            subtotal += pizzaItem.price * cart[i].qt;
            let cartItem = Clone('.models .cart--item').cloneNode(true);
            let pizzaSizeName;
            switch (cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                cart[i].qt++;
                updateCart();
            });
            Clone('.cart').append(cartItem);
        }
        desconto = subtotal *0.1;
        total = subtotal - desconto;
        Clone('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        Clone('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        Clone('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        Clone('aside').classList.remove('show');
        Clone('aside').style.left = '100vw';
    }
}

pizzaJson.map((item, index)=>{
    let pizzaItem = Clone('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('a').addEventListener('click', (event)=>{
        event.preventDefault();

        let key = event.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;
        
        Clone('.pizzaBig img').src = pizzaJson[key].img;
        Clone('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        Clone('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        Clone('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        Clone('.pizzaInfo--size.selected').classList.remove('selected');

        CloneAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        Clone('.pizzaInfo--qt').innerHTML = modalQt;
        Clone('.pizzaWindowArea').style.opacity = 0;
        Clone('.pizzaWindowArea').style.display = 'flex';
        
        setTimeout(()=>{
            Clone('.pizzaWindowArea').style.opacity = 1;
        }, 200);

    });

    Clone('.pizza-area').append(pizzaItem);
});
CloneAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{ item.addEventListener('click', CloseModal) });

Clone('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        Clone('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
Clone('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    Clone('.pizzaInfo--qt').innerHTML = modalQt;
});
CloneAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', ()=>{
        Clone('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});
Clone('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = Clone('.pizzaInfo--size.selected').getAttribute('data-key');
    let indentifier = `${pizzaJson[modalKey].id}@${size}`;
    let key = cart.findIndex((item)=> item.indentifier == indentifier );

    if(key > -1){
        cart[key].qt += modalQt;
    } else {
        cart.push({
            indentifier,
            id: pizzaJson[modalKey].id,
            size: parseInt(size),
            qt: modalQt,
        });
    }
    updateCart();
    CloseModal();
});

Clone('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        Clone('aside').style.left = '0';
    }
});
Clone('.menu-closer').addEventListener('click', ()=>{
    Clone('aside').style.left = '100vw';
});