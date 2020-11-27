let components;

const request = new XMLHttpRequest();
request.open('GET', './../data/component.json', false);

request.send(null);
if (request.status === 200)
    components = JSON.parse(request.responseText);

const draggable = document.querySelector('#draggable');
const wrapper = document.querySelector('#wrapper');

const draggableMarket = `<div class="draggableMarker" ondrop="dropEnd(event)" ondragover="allowDrop(event)"> перетащите сюда блок </div>`;

wrapper.insertAdjacentHTML('afterbegin', draggableMarket);

let layout;
components.forEach(component => 
{
    if (component['name'] === 'heading')
    {
        layout = `
        <section class="component heading" style="background-color: ${component['color']}">
            <h2 class="heading-text editable-text"> ${component['text']} </h2>
            <p class="heading-post-text editable-text"> ${component['post-text']} </p>
            
            <div class="backing"></div>
            <img src="${component['image-src']}" alt="">

            <div class="controls">
                <div class="up" onclick="componentMoveUp(event)"> выше </div>
                <div class="down" onclick="componentMoveDown(event)"> ниже </div>
            </div>

            <div class="imageUrlButton" onclick="changeUrlImage(event)" title="${component['image-src']}"> ссылка на изображение </div>
            
            <label class="imageBackgroundColor"> изменить цвет
                <input type="color" oninput="changeBackgroundColor(event)" style="visibility: hidden; width: 1px">
            </label>
            <div class="deleteButton" onclick="deleteComponent(event)"> удалить </div>
        </section>

        ${draggableMarket}`;

        wrapper.innerHTML += layout;
    } 
    else if (component['name'] === 'button')
    {
        layout = `
        <div class="component link" style="background-color: ''">

            <p class="link-text editable-text"> Обычный текст </p>

            <div style="position: relative; margin-top: 15px;">
                <a href="#" class="link-button editable-text"> Текст ссылки </a>
            </div>

            
            <div class="backing"></div>
            <img src="./../img/background.jpg">

            
            <div class="controls">
                <div class="up" onclick="componentMoveUp(event)"> выше </div>
                <div class="down" onclick="componentMoveDown(event)"> ниже </div>
            </div>

            <div class="imageUrlButton" onclick="changeUrlImage(event)" title="${component['image-src']}"> ссылка на изображение </div>
            
            <label class="imageBackgroundColor"> изменить цвет
                <input type="color" oninput="changeBackgroundColor(event)" style="visibility: hidden; width: 1px">
            </label>
            <div class="deleteButton" onclick="deleteComponent(event)"> удалить </div>

        </div>
        ${draggableMarket}`;

        wrapper.innerHTML += layout;
    }
});

function deleteComponent(e)
{
    let element = e.target.parentElement;
    element.previousElementSibling.remove();
    element.remove();
    
}

function changeUrlImage(e)
{
    let component = e.target.parentElement;
    let url = prompt("Укажите ссылку на изображение:");
    if (url)
    {
        component.style.backgroundColor = 'unset';
        component.querySelector('img').removeAttribute('background-color');
        component.querySelector('img').src = url;
        component.querySelector('img').title = url;
        component.querySelector('img').style.display = 'block';
    }
}

function changeBackgroundColor(e)
{
    let component = e.target.parentElement.parentElement;
    let color = e.target.value;
    component.style.backgroundColor = color;
    component.querySelector('img').src = '';
    component.querySelector('img').title = color;
    component.querySelector('img').style.display = 'none';
}

function allowDrop(e) 
{
    e.preventDefault();
}

function drag(e) 
{
    e.dataTransfer.setData("type", e.target.dataset.type);
    
}
  
function dropEnd(e) 
{
    e.preventDefault();
    generateElement(e.dataTransfer.getData("type"), e.target);
}

document.addEventListener('click', (e) => 
{
    if (e.target.contentEditable != 'true' && currentEditableElement)
        currentEditableElement.contentEditable = false;
}); 

let currentEditableElement;
document.addEventListener('dblclick', (e) =>
{
    if (e.target.classList.entries('editable-text'))
    {
        currentEditableElement = e.target;
        e.target.contentEditable = true;
    }
});

function swap(elem1, elem2) 
{
    const tempOne = elem2.nextElementSibling;
    const tempTwo = elem2.parentNode;
    elem1.replaceWith(elem2);
    tempTwo.insertBefore(elem1, tempOne);
}

function componentMoveUp(e)
{
    let componentOriginal = e.target.parentElement.parentElement;
    let componentSwapable = componentOriginal.previousElementSibling.previousElementSibling;
    swap(componentOriginal, componentSwapable);
}

function componentMoveDown(e)
{
    let componentOriginal = e.target.parentElement.parentElement;
    let componentSwapable = componentOriginal.nextElementSibling.nextElementSibling;
    swap(componentOriginal, componentSwapable);
}

function generateElement(type, elem)
{
    if (type === 'heading')
    {
        layout = `
        <section class="heading component" style="background-color: ''">
            <h2 class="heading-text editable-text"> Заголовок </h2>
            <p class="heading-post-text editable-text"> Подзаголовок </p>
            
            <div class="backing"></div>
            <img src="./../img/background.jpg">

            <div class="controls">
                <div class="up" onclick="componentMoveUp(event)"> выше </div>
                <div class="down" onclick="componentMoveDown(event)"> ниже </div>
            </div>

            <div class="imageUrlButton" onclick="changeUrlImage(event)" title=""> ссылка на изображение </div>
            
            <label class="imageBackgroundColor"> изменить цвет
                <input type="color" oninput="changeBackgroundColor(event)" style="visibility: hidden; width: 1px">
            </label>
            <div class="deleteButton" onclick="deleteComponent(event)"> удалить </div>
        </section>

        ${draggableMarket}`;
        elem.insertAdjacentHTML('afterend', layout)
    } 
    else if (type === 'button')
    {
        layout = `
        <div class="component link" style="background-color: ''">

            <p class="link-text editable-text"> Обычный текст </p>

            <div style="position: relative; margin-top: 15px;">
                <a href="#" class="link-button editable-text"> Текст ссылки </a>
            </div>

            
            <div class="backing"></div>
            <img src="./../img/background.jpg">

            <div class="controls">
                <div class="up" onclick="componentMoveUp(event)"> выше </div>
                <div class="down" onclick="componentMoveDown(event)"> ниже </div>
            </div>

            <div class="imageUrlButton" onclick="changeUrlImage(event)" title="${component['image-src']}"> ссылка на изображение </div>
            
            <label class="imageBackgroundColor"> изменить цвет
                <input type="color" oninput="changeBackgroundColor(event)" style="visibility: hidden; width: 1px">
            </label>
            <div class="deleteButton" onclick="deleteComponent(event)"> удалить </div>
            </div>
            ${draggableMarket}`;
            elem.insertAdjacentHTML('afterend', layout)
    }
}