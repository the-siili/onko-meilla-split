
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "lke07.3ABI HHu,lge01.2f MMe,lmaa02+04.1f NNu,lmaa02+04.4f HNo,lbi02+03.5ef CFr,lps01.6ef MiV,lena06.1 PAu,lyh02.2fe VKo,lmaa14.3ABI SSn*lfi02.3f EHä,lena05.4 PSk,lena06.5 RKo,lyh02.6fe ATa,läi10.ABI HTe,läi11.ABI JJu,lmab10.2ABI EMa/JMa,lrua/rua09.2ABI MPa,lfi01.3f LLa?läi01+02+03.1 HTe,lrub01+02.2 MPa,lps04.2ef LLa,lena01+02.4 PSk,lrub01+02.5 PAu,läi01+02+03.6 JJu,ls201+02+03 MAl,lop02.6 PKa,lop02.3 AHu*lhi10.1ef SHi,leaa05 RWe,lraa05 OVi,lrab204/306 IWi,läi11.ABI TLy,lfy10.2ABI JMa,lmaa14.4ABI SSn,lmab10.1ABI EMa/LEk,lbi05.1fe ARa,lena01+02.3 RKo,lke04.2fe HHu?lena06.3 PSk,lyh02.4fe ATa,läi06+07.5 TLy,lena06.6 RKo,lbi07.3ABI POj,lps07.ABI LLa,lte01.2f ALa,lmaa12.3f EHä,läi11.ABI HTe*lge01.1f MMe,lmaa02+04.2f SSn,lmaa02+04.3f NNu,lps01.4f MiV,lmaa02+04.5f HNo,lmaa02+04.6ef LEk,lmab02.1f EMa,lyh02.1fe VKo,lhi12.2ABI SHi,lfy10.1ABI JMa?lfi02.3f EHä,lena05.4 PSk,lena06.5 RKo,lyh02.6fe ATa,läi10.ABI HTe,läi11.ABI JJu,lmab10.2ABI EMa JMa,lrua/rua09.2ABI MPa,lmaa02+04.1f NNu*lge01.2f MMe,lfi01.3f LLa,lmaa02+04.4f HNo,lbi02+03.5ef CFr,lps01.6ef MiV,lena06.1 PAu,lyh02.2fe VKo,lmaa14.3ABI SSn,lke07.3ABI HHu?lmaa06.1f HNo,lrub05.2 JSn,lhi02.3f ATa,lte01.4f OVi,lena05.5 RKo,lhi02.6ef SHi,lmaa14.1ABI SSn,lyh05.2ABI VKo,lraa09/lrab310/209.ABI IWi,lrub/rua09.3ABI MPa*lke01+02.1f HHu,lfy01+02.2f EHy,lbi01.3f ARa,lfy01+02.4f JMa,lku01.5f EPe,lmu01.6e MMc,lli01.7fe JWi,lmaa12.2f NNu,läi10.ABI JJu,läi11.ABI HTe"
let day_stacks = ""

let splits = ""
let normals = ""

let all_courses = []

let today = ""


myCourse = "Oppitunti?"


var select = document.getElementById('dd');




let menu = []




let can_continue = false





function lastDay()
{
    today = days[days.indexOf(today) - 1]
    if(days.indexOf(today) < 0){
        today = days[days.length -1]
    }
    changeDay();
}

function nextDay()
{
    //Näin täytyy tehdä koska en tiedä, mutta älä edes koita korjata et tule onnistumaan(message to self)
    if(today == "Saturday"){
        today = days[days.indexOf(today) + 1]
    }
    //


    today = days[days.indexOf(today) + 1]
    if(days.indexOf(today) > days.length-1){
        today = 0
    }
    changeDay();


}


function changeDay(){

    select.innerHTML="";
    CheckDay();
    all_courses.forEach(AddCourseToOptions)
    

    if(today == "Saturday" || today == "Sunday")
    {
        select.innerHTML="";
        document.getElementById('resultLbl').innerHTML="VKLP!";
    }
    else{
        document.getElementById('resultLbl').innerHTML="?";
    }

    document.getElementById('dayLbl').innerHTML=fin_days[days.indexOf(today)];
    loadCourse()
    displayMenuData()
}






function Init() {
    day_stacks = text1.split("?")

    days.forEach((day,index)=>{
        // Check if the index of day value is equal to the returned value of getDay()
        if(index == new Date().getDay()){
            today = day;
        }
    });

    CheckDay()
    all_courses.forEach(AddCourseToOptions)
    document.getElementById('dayLbl').innerHTML=fin_days[days.indexOf(today)];
    document.getElementById('resultLbl').innerHTML="?";
    loadCourse()
    menu = localStorage.getItem("menu")
    
}
window.onload = Init;









function CheckDay() 
{

    if(today == "Saturday" || today == "Sunday")
    {
        select.innerHTML="";
        document.getElementById('resultLbl').innerHTML = "VKLP!";
        return
    }
    else{
        document.getElementById('resultLbl').innerHTML = "";
    }


    dataToDayLists(days.indexOf(today)-1)

}


function dataToDayLists(ind){
    let sep = day_stacks[ind].split("*")
    splits = sep[0].split(",")
    normals = sep[1].split(",")

    all_courses = [...splits, ...normals]
    myCourse = all_courses[0]
}



function showResult(){

    if(today == "Saturday" || today == "Sunday")
    {
        return
    }



    if(splits.includes(myCourse))
    {
        document.getElementById('resultLbl').innerHTML = "SPLIT";
    }
    else if(normals.includes(myCourse))
    {
        document.getElementById('resultLbl').innerHTML = "NORMAALI";
    }
    saveCurrentCourse()
}






function AddCourseToOptions(item)
{
    //SKIPPING EMPTY STRINGS
    if(item == "nan" || item.length === 0 ){
        return
    }



    var opt = document.createElement('option');
    opt.value = item;
    opt.innerHTML = item;
    select.appendChild(opt);
}


function setMyCourse()
{

    myCourse = document.getElementById('dd').value;
    document.getElementById('resultLbl').innerHTML = "?";

}


function saveCurrentCourse()
{
    localStorage.setItem(today, select.value);
    
}

function loadCourse()
{
    if(today == "Saturday" || today == "Sunday")
    {
        return
    }


    select.value = localStorage.getItem(today)
    setMyCourse()
    showResult()
}








//HANDLING MENU
function getMenuData(){

    //GETTING MENU DATA
    fetch('https://ksyk-menu-scraper.onrender.com/').then(function (response) 
    {
        // The API call was successful!
        return response.text();
    }).then(function (html) {

        menu = html
        localStorage.setItem("menu", html);
        displayMenuData()
        


    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong1.', err);
    });

}


function displayMenuData()
{
    
    document.getElementById("menu_list").innerHTML = ""

    var a = JSON.parse(menu)
    var menu_arr = a["menu-data"][today].split(";");


    document.getElementById("menu_week").innerHTML = a["menu-data"]["Week"]


    for (i in menu_arr)
    {
        document.getElementById("menu_list").innerHTML += menu_arr[i] + "<br />"
    }

}
