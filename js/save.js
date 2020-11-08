function save()
{
    let componentToSave = document.querySelectorAll("#wrapper .component");
    let jsonWithComponent = [];

    componentToSave.forEach(component => {
        
        if (component.classList.contains('heading'))
        {
            let jsonToAdd = 
            {
                "name": "heading",
                "text": component.querySelector('.heading-text').textContent,
                "post-text": component.querySelector('.heading-post-text').textContent,
                "image-src": component.querySelector('img').src
            };
            jsonWithComponent.push(jsonToAdd);
        }
    });


    let gameData = new FormData();   
    gameData.append('json', JSON.stringify(jsonWithComponent));

    fetch('./php/updateJSON.php', 
    {
        method: 'POST',
        body: gameData
    })
    .then(result =>
    {
        result.json().then(data => 
        {
            if (data == 'save')
            {
                document.location.reload();
            }     
        });
    });

}