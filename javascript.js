
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "läi01+02+03.1 HTe,lrub01+02.2 MPa,lmab09.2fe JMa,lena01+02.4 PSk,lrub01+02.5 PAu,lte01.3f ALa,lyh02.5fe ATa,ls201+02+03 MAl,lhi03.5ef SHi*lke06.1fe HHu,lfi02.4f EHä,lmaa13.3ABI SSn,läi01+02+03.6 JJu,läi05.1 TLy,lfi02.2f LLa,lena05.6 RWe,lyh03.2fe VKo,lena01+02.3 RKo?lrub01+02.1 MPa,läi01+02+03.2 HTe,lena01+02.5 RWe,lfy06.2fe JMa,lps03.2ef LLa,lhi03.2f ATa,lop01.9abi PKa,lop01.6abi AHu,lraa03 OVi*lke03.3ef HHu,lke03.2fe EMa,läi01+02+03.3 JKä,lrub01+02.4 TNu,lmaa17.fe SSn,lop01.2abi KMa,lena01+02.6 RKo,lhi06.ef SHi,läi08.2 JJu,lrab203/lrab305  IWi,ls209 MAl?lrab309/lraa07/lrab207 IWi,lrua01+02 MiV,lue02.2f NMä,lmab04.1f JMa,lena01+02.2 PSk,lrub04.6 MPa,läi01+02+03.4 JJu,läi01+02+03.5 HTe,lmaa06.5ef/lmaa09.5ef  LEk,lop01.4abi AHu*lmaa03.1f SSn,lmaa06.1f/lmaa09.1f  HNo,lmab04.2f NNu,lmaa06.2f/lmaa09.2f  EMa,leaa07/leab309/leab207 RWe,lyh03.3fe VKo,läi10.ABI TLy,lrub01+02.6 JSn,lrub01+02.3 TNu,lfy09.e MSl,lrua07 PAu?lmab09.2fe JMa,lmaa13.3ABI SSn,lyh03.2fe VKo,läi01+02+03.6 JJu,läi05.1 TLy,lfi02.2f LLa,lfi02.4f EHä,lena05.6 RWe*lke06.1fe HHu,lhi03.5ef SHi,läi01+02+03.1 HTe,lrub01+02.2 MPa,lena01+02.3 RKo,lena01+02.4 PSk,lrub01+02.5 PAu,lte01.3f ALa,lyh02.5fe ATa,ls201+02+03 MAl?lena05.2 PSk,lfi02.1f LLa,lena04.4 PAu,lhi02.5ef SHi,lte01.6ef OVi,lmaa13.1ABI HNo,lmab09.1f EMa,lrub07.2 MPa,lsab206/lsab308/lsaa07 JSn*lmu01.1e ILe,lli01.2fe ALa,lli01.3fe PBo,lku01.4f EPe,lke01+02.6ef HHu,lbi01.5f ARa,lfy01+02.7ef MSl,lena04.3 RKo,lfy08.2fe JMa,lhi03.4f ATa,läi08.4 JJu"
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
