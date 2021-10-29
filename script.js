function Clone(element){
    return document.querySelector(element);
}
function CloneAll(elements){
    return document.querySelectorAll(elements);
}

pizzaJson.map((item, index)=>{
    let pizzaItem = Clone('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('a').addEventListener('click', (event)=>{
        event.preventDefault();
        Clone('.pizzaWindowArea').style.opacity = 0;
        Clone('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            Clone('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    Clone('.pizza-area').append(pizzaItem);
});