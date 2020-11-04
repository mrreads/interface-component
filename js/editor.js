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
        <div class="heading">
            <h2 class="heading-text editable-text"> ${component['text']} </h2>
            <p class="heading-post-text editable-text"> ${component['post-text']} </p>
            
            <div class="backing"></div>
            <img src="${component['image-src']}">
        </div>

        ${draggableMarket}
        `;
        wrapper.innerHTML += layout;
    };
});

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

function generateElement(type, elem)
{
    if (type === 'heading')
    {
        layout = `
        <div class="heading">
            <h2 class="heading-text editable-text"> Заголовок </h2>
            <p class="heading-post-text editable-text"> Подзаголовок </p>
            
            <div class="backing"></div>
            <img src="./../img/background.jpg">
        </div>

        ${draggableMarket}
        `;
        elem.insertAdjacentHTML('afterend', layout)
    };
}
