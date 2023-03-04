     function catchData(number){
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=>res.json())
    .then(data=>showData(data,number))
}
function showData(data,number){
    console.log( typeof  data)
    const seeMore = document.getElementById('see-more')
    const spinner=document.getElementById('spinner')

    
    let allDatas ;
    
    if(number&&typeof data =='object'){
        seeMore.classList.add('d-none')
        allDatas=data.data.tools
        
    }else if(Array.isArray(data)){
      allDatas=data
    }
     else{
      
        seeMore.classList.remove('d-none')
        allDatas=data.data.tools
        
        allDatas=allDatas.slice(0,6)
        
    }
    const container = document.getElementById('main-container')
    container.innerHTML=''

    allDatas.forEach(allData => {
        const {image,name,features,published_in,id}= allData
        
        const divEl = document.createElement('div') 
        divEl.classList.add('col')
        divEl.innerHTML=`
        <div class="card p-3">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h3 class="card-title">features</h3>
          <p>1.${features[0]?features[0]:'data not avaliable'}</p>
          <p>2.${features[1]?features[1]:'data not avaliable'}</p>
          <p>3.${features[2]?features[2]:'data not avaliable'}</p>
          <hr>
            <div class="d-flex justify-content-between align-items-center ">
            <div >
            <h3 class="my-2">${name}</h3>
          <p><i class="fa-solid fa-calendar-days"></i><span class="ms-2">${published_in}</span></p>
            </div>
            <div onclick="allDetails('${id}')" class="text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-sharp fa-solid fa-arrow-right"></i> </div>
           
            
          </div>
          
        </div>
      </div>
        
        `
        container.appendChild(divEl)
    });
     
    spinner.classList.add('d-none') 

 
}
function moreDetails(){
    catchData(10)
}
function allDetails(id){
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res=>res.json())
    .then(details=>showAllDetails(details.data))
}
function showAllDetails(detailsAll){
    console.log(detailsAll)
    let lostData= document.getElementById('lost-data')
    let info = document.getElementById('info')
    info.innerHTML=''
    let modalContainer =document.getElementById('modal-1')
     modalContainer.innerHTML=''
    
    const items=document.getElementById('list-items')
     items.innerHTML=''
    const allItems=document.getElementById('integration-items')
     allItems.innerHTML=''
    const right=document.getElementById('right-side')
    right.innerHTML=''
    let {description,features,integrations,image_link,pricing,accuracy,input_output_examples
    }= detailsAll
    console.log( input_output_examples)
      
    document.getElementById('description').innerHTML=`<h6>${description.slice(0,100)}...</h6>`
  
      const divEl = document.createElement('li')
      divEl.classList.add('show-modal')
      
       
      
      
      divEl.innerHTML=`<P class="modal-div">${pricing[0].price?pricing[0].price:"not avaliable"}  basic</P>
      <P class="modal-div">${pricing[1].price?pricing[1].price :'not avaliable'}  pro</P>
      <P class="modal-div">${pricing[2].price?pricing[2].price:'not avaliable'}</P>
      
      
      `
      modalContainer.appendChild(divEl)
      let allKeys=Object.keys(features)
      
        
      for(let key of allKeys.slice(0,3)){
        
         const li = document.createElement('li')
         li.classList.add('list')
        li.innerHTML=`${features[key].feature_name?features[key].feature_name:'data not found'}`
        items.appendChild(li) 
      }
      
      
    for(let value of integrations.slice(0,3)){
      console.log(value)
      const li= document.createElement('li')
      li.innerHTML=`${value?value:'data not found'}`
      allItems.appendChild(li)
    }
    /* let accurecy=accuracy.score
    let score=accurecy.toString()
    console.log(score) */
    if(accuracy.score){
      let accurecy=accuracy.score
    let score=accurecy.toString()
    let allScore=Number(score.slice(-2))
      right.innerHTML=`
    <img class="img-fluid img position-relative"  src="${image_link[0]?image_link[0]:image_link[1]}" alt="">
    <button id="score" class="btn btn-danger position-absolute top-0 end-0 my-3">${allScore?allScore :''}% accuracy</button>
    `
    }
      
    
      else{
        
        right.innerHTML=`
    <img class="img-fluid img position-relative"  src="${image_link[0]?image_link[0]:image_link[1]}" alt="">`
    
      }
      
    const div = document.createElement('div')
    div.innerHTML=`
                  <h4 class='my-3'>${input_output_examples[0].input}</h4>
                  <p>${input_output_examples[0].output}</p>
    `
    
      
    info.appendChild(div)
   lostData.classList.remove('d-none') 
}
catchData()
function sortData(){
  fetch('https://openapi.programming-hero.com/api/ai/tools')
  .then(res=>res.json())
  .then(sort=>{
    let dateArray =sort.data.tools
    console.log(dateArray)
    let arr1= dateArray.sort((a,b)=>new Date(a.published_in)-new Date(b.published_in) )
    showData(arr1)
    console.log(Array.isArray(arr1))
    })
    


  }
  




 






     /* const pricing=[
  {plan: 'Starter', price: '$19/month'},
  {plan: 'Professional', price: '$49/month'},
  {plan: 'Enterprise', price: 'Contact us for pricing'}
]
console.log(pricing.slice(0,2))

for(let x of pricing){
  console.log(x.price)}
  */
  /* features
  : 
  1
  : 
  {feature_name: 'Contextual understanding', description: 'YouChat_2.0 can understand and respond to user inp…, providing more accurate and relevant responses.'}
  2
  : 
  {feature_name: 'Multi-platform support', description: 'YouChat_2.0 can be integrated with a variety of pl…hannels, including web, mobile, and social media.'}
  3
  : 
  {feature_name: 'Voice recognition', description: 'YouChat_2.0 can recognize and respond to voice com…ng users to interact with the chatbot hands-free.'}
  [[Prototype]]
  : 
  Object */
   /* const features={
    1:{feature_name: 'Contextual understanding', description: 'YouChat_2.0 can understand and respond to user inp…, providing more accurate and relevant responses.'},
    2:{feature_name: 'Multi-platform support', description: 'YouChat_2.0 can be integrated with a variety of pl…hannels, including web, mobile, and social media.'},
    3:{feature_name: 'Voice recognition', description: 'YouChat_2.0 can recognize and respond to voice com…ng users to interact with the chatbot hands-free.'}
  }


  const x=Object.keys(features)
  console.log(x.slice(0,2))
  */ /* for(let f of x){
    console.log(features[f].feature_name)
  } */ 


  /* let a=0.23
  let b=a.toString()
  console.log(b.slice(-2)) */

  
