const wrapper=document.querySelector(".wrapper")
 inputPart=wrapper.querySelector(".input-part")
 infoText=inputPart.querySelector(".info-text")
inputField=inputPart.querySelector("input")
locationbtn=inputPart.querySelector("button")
wicon=document.querySelector('.weather-part img')
arrowBack=document.querySelector('header i')
let api
inputField.addEventListener("keyup",e=>{
    if(e.key=="Enter" && inputField.value !=""){
        requestApi(inputField.value)
    }
})
locationbtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }
    else{
        alert("your browser not support geoloaction api")
    }
})
function onSuccess(position){
    const {latitude,longitude} = position.coords
    let apiKey='ad0b2bc97babd4f469da76a6a2b081cc'
     api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
     fetchData()

}
function onError(error){
    infoText.innerHTML=error.message
    infoText.classList.add("error")}

function requestApi(city){
    let apiKey='ad0b2bc97babd4f469da76a6a2b081cc'
    
     api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
     fetchData()
    
}
function fetchData(){
     infoText.innerHTML="waiting for result..."
    infoText.classList.add('pending')
    
    fetch(api).then(response=>response.json()).then(result=>weatherDetails(result))
}
function weatherDetails(info){
    infoText.classList.replace('pending','error')
    if(info.cod=='404'){
        infoText.innerHTML=`${inputField.value} isn't a valid city name`
    }
    else{
        const city=info.name
    const country=info.sys.country
   const {id,description}  = info.weather[0]
   const {feels_like,humidity,temp}=info.main
   if (id==800){
    wicon.src='./icons/clear.svg'
   }
   else if(id>=200 && id<=232){
    wicon.src='./icons/storm.svg'
   }
   else if(id>=600 && id<=622){
    wicon.src='./icons/snow.svg'
   }
   else if(id>=701 && id<=781){
    wicon.src='./icons/haze.svg'
   }
   else if(id>=801 && id<=804){
    wicon.src='./icons/cloud.svg'
   }
   else if((id>=300 && id<=321) ||( id>=500 && id<=531)){
    wicon.src='./icons/rain.svg'
   }
   wrapper.querySelector(".temp .num").innerText=temp
   wrapper.querySelector(".weather").innerText=description
   wrapper.querySelector(".location span").innerText=`${city},${country}`
   wrapper.querySelector(".temp .num2").innerText=feels_like
   wrapper.querySelector(".humidity span").innerText=`${humidity}%`
infoText.classList.remove('pending','error')
     wrapper.classList.add('active')
     console.log(info)}
}
arrowBack.addEventListener("click",()=>{
    wrapper.classList.remove('active');
})