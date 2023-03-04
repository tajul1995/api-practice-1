function phoneHunter(searchText,number){
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res=>res.json())
    .then(data=>phoneDetails(data.data,number))
}
function phoneDetails(phones,number){
    const container = document.getElementById('main-container')
    container.innerHTML=''
    const show = document.getElementById('show-details')
    if(number&&phones.length>10){
        phones=phones.slice(0,10)
        show.classList.remove('d-none')
    }
    else{
        show.classList.add('d-none')
    }
    
    phones.forEach(phone => {
        const {phone_name,brand,image}=phone
        const divEl = document.createElement('div')
        divEl.classList.add('col')
        divEl.innerHTML+=`
        <div class="card">
                <img src="${image}" class="card-img-top " alt="...">
                <div class="card-body">
                  <h5 class="card-title">${brand}</h5>
                  <p class="card-text">${phone_name}</p>
                </div>
              </div>
        
        `
        container.appendChild(divEl)
    });
     
    
}
function progress(number){
    const input = document.getElementById('input')
    const inputValue= input.value
    phoneHunter(inputValue,number)
}
document.getElementById('search-btn').addEventListener('click',()=>{
    progress(10)
})
document.getElementById('show-details').addEventListener('click',()=>{
    progress()
})
phoneHunter()