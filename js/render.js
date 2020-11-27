let components;

const request = new XMLHttpRequest();
request.open('GET', './../data/component.json', false);  // `false` makes the request synchronous
request.send(null);
if (request.status === 200)
    components = JSON.parse(request.responseText);

const wrapper = document.querySelector('#wrapper');

let layout;
components.forEach(component => 
{
    if (component['name'] === 'heading')
    {
        layout = `
        <div class="heading" style="background-color: ${component['color']} ">
            <h2 class="heading-text"> ${component['text']} </h2>
            <p class="heading-post-text"> ${component['post-text']} </p>
            
            <div class="backing"></div>
            <img src="${component['image-src']}">
        </div>
        `;
        wrapper.innerHTML += layout;
    };


});