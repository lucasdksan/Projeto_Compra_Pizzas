let cart = [];
let modalQt = 1;
let modalKey = 0;

function Clone(element){
    return document.querySelector(element);
}
function CloneAll(elements){
    return document.querySelectorAll(elements);
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
            if(sizeIndex === 2){
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

function CloseModal(){
    Clone('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        Clone('.pizzaWindowArea').style.display = 'none';
    },500);
}

CloneAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>( item.addEventListener('click', CloseModal) ));

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
        size.target.classList.add('selected');
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
    CloseModal();
});