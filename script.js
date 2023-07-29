/* we are selecting all the html element which are neccessary for further process  */

const wrapper=document.querySelector('.wrapper');
const textbox=document.querySelector(".input-box");
const infotxt=document.querySelector('.info-txt');
const inputunique=document.querySelector('input');
const button=document.querySelector('button');
const weatherPart=document.querySelector('.weather-part');
const image=document.querySelector('img');
const headericon=document.querySelector('header i');
const arrowBack=document.querySelector("header i");
/* this open weather api which i got it from open weather api   */
let api=``;
/* we are adding eventlistener into inputunique variable which does select input box class   */
inputunique.addEventListener("keyup",e=>{
/*we are giving condition with parsing parameter which is e if key is equal to enter and textinput is not empty then this condition
will be executed    */    
     if(e.key=="Enter" && inputunique.value!=""){
        requestApi(inputunique.value);
 /*we are parsing input value into request function   */       
    }
});
button.addEventListener("click",()=>{

    /* this navigator.geolocation object gives access to location of the device   */
    if(navigator.geolocation){
        /* getCurrentPosition method is used to get device of the location    */
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        console.log("this browser not support geolocation api");
    }
})
function onSuccess(position){
    /* this object destructured based sysntax which extract the latitude and longitude properties from position.coords object */
    const {latitude,longitude}=position.coords;
     api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api}`;
     fetchData();

}
function onError(error){
    // console.log(error);
    infotxt.textContent=error.message
    infotxt.classList.add('error');
}

function requestApi(city){
    api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`;
    
    //getting api response and returning with it with parsing into js objb and in another
    //then function calling openweather function with passing api result as an argument.
   
    fetchData();
}
function fetchData(){
    infotxt.textContent="getting response .."
    infotxt.classList.add('pending');
    fetch(api).then(response=>response.json()).then(result=>openweather(result)).catch(()=>{
        infotxt.textContent ="something went wrong";
        infotxt.classList.replace("pending","error");

    });
}
function openweather(info){

    if(info.cod=="404"){
        infotxt.classList.replace("pending","error");

        infotxt.innerHTML=`${inputunique.value} not valid city`;
    }
    else{
     
        wrapper.classList.add("active");
        infotxt.classList.remove("pending","error");
        console.log(info);
        const city=info.name;
        const country=info.sys.country;
        const{id,description}=info.weather[0];
        const{feels_like,humidity,temp}=info.main;

        
        if(id==800){
            image.src="icons/clear.svg";
        }
        else if(id==200 && id<=232){
            image.src="icons/storm.svg";
        }
        else if(id==801 && id<=804){
            image.src="icons/cloud.svg";
        }
        else if(id==701 && id<=781){
            image.src="icons/haze.svg";
        }
        else if(id==500 && id==531){
            image.src="image/rain.svg";
        }
        else if(id==600 && id<=622){
            image.src="image/snow.svg";
        }
   

        wrapper.querySelector('.temp .numb').textContent=Math.floor(temp);
        wrapper.querySelector('.weather').textContent=description;
        wrapper.querySelector('.location').textContent=`${city},${country}`;
        wrapper.querySelector('.temp .numb-2').textContent=Math.floor(feels_like);
        wrapper.querySelector('.humidity span').textContent=`${humidity}%`;


    }
   
}
/*in order to go back first at all we have selected arrowback constant and add eventlistener on click event*/

/* we have removed active class from wrapper const  */
arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
})
