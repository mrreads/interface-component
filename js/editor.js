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
        <section class="component heading">
            <h2 class="heading-text editable-text"> ${component['text']} </h2>
            <p class="heading-post-text editable-text"> ${component['post-text']} </p>
            
            <div class="backing"></div>
            <img src="${component['image-src']}">

            <div class="controls">
                <div class="up" onclick="componentMoveUp(event)"> выше </div>
                <div class="down" onclick="componentMoveDown(event)"> ниже </div>
            </div>

            <div class="deleteButton" onclick="deleteComponent(event)"> Удалить </div>
        </section>

        ${draggableMarket}
        `;
        wrapper.innerHTML += layout;
    };
});

function deleteComponent(e)
{
    let element = e.target.parentElement;
    element.previousElementSibling.remove();
    element.remove();
    
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
        <section class="heading component">
            <h2 class="heading-text editable-text"> Заголовок </h2>
            <p class="heading-post-text editable-text"> Подзаголовок </p>
            
            <div class="backing"></div>
            <img src="./../img/background.jpg">

            <div class="controls">
                <div class="up" onclick="componentMoveUp(event)"> выше </div>
                <div class="down" onclick="componentMoveDown(event)"> ниже </div>
            </div>

            <div class="deleteButton" onclick="deleteComponent(event)"> Удалить </div>
        </section>

        ${draggableMarket}
        `;
        elem.insertAdjacentHTML('afterend', layout)
    };
}