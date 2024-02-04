
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "läi06+07.6  HTe,ls206+07.1  MAl,lena07.1 PSk,läi06+07.3  TLy,lbi02+03.2f  POj*lmaa02+04.1f IKa,lmaa02+04.4f HNo,läi06+07.5  JJu,lge01+lhi01.5ef/.6ef  MMe/SHi,lps01.3f LLa,lte01.4f ALa,lena07.2 RKo?lmaa02+04.2f HNo,lmaa02+04.3f NNu,lmaa02+04.5fe IKa,lmaa02+04.6ef LEk,lhi04.1ef SHi,lbi02+03.4f  POj*lke05.1fe HHu,lku02.2f EPe,lena03.1 PSk,lmab03.1f/2ef JMa/EMa,lsaa06.1 JSn,lte02.1feo2 OVi,lrua08.1/lrub06.1 MPa,lue/let/luo06.1feo1 NMä?läi04.3 JJu,läi04.4 TLy,lfi01.1f EHä,lyh01.2f VKo,lrub05.3 PAu,lrub05.6 JSn*lmaa06+07.4f  IKa,lmaa06+07.5ef  LEk,lmab05.1fe JMa,lmaa06+07.2f  AMa,lge01+lhi01.5ef/.6ef  MMe/SHi,lrub05.1 MPa?lte01.4f ALa,lps01.3f LLa,lena07.1 PSk,lena07.2 RKo,läi06+07.5  JJu*lmaa02+04.1f IKa,lmaa02+04.4f HNo,ls206+07.1  MAl,läi06+07.6  HTe,läi06+07.3  TLy,lge01+lhi01.5ef/.6ef  MMe/SHi,lbi02+03.2f  POj?lrub03.5 KBa,lhi04.2ef ATa,lena03.2 LJu,lrub03.6 JSn,lrub03.1 MPa,lrua03.1 MiV*lke05.2fe HHu,lfy07.1fe JMa,lfy07.3ef MSl,lli02.5fe LHe,lps06.1fe/lyh08.1fe LLa,lena08.1 RKo,lrub03.3 PAu,lena03.4 PSk"

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
    getMenuData()
    
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
