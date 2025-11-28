
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "läi11.4ABI TLy,läi10.2ABI JJu,läi06+07.2 HTe,lyh05.2ABI VKo,lrub05.5 JSn,lmab10.1ABI NNu,lmaa02+04.4f HNo,lena06.1 RKo*lke07.3ABI HHu,lmaa14.1ABI EHä,lmaa06.4f HTi,lmaa02+04.2f BPu,lhi02.6ef SHi,lhi02.3f ATa,lge01.1f MMe,lfi01.3f LLa,lena03.6 PSk,lbi02+03.5ef POj?lmaa14.4ABI HTi,lmaa12.1f HNo,ls210.ABI MAl,lrub09.2ABI MPa,lps04.1fe LLa,leaa05 MHu,lbi05.1fe ARa,lbi01.7f CFr,lop02.6 KMa*lmu01.4e MMc,lmu01.3e TTu,lli01.1fe ALa,lku01.2f EPe,lke04.2fe HHu,lke01+02.5f BPu,lfy01+02.6ef MSl,läi11.5ABI TLy,lsaa05 JSn,lop02.1 PKa,lop02.8 RKa?lmaa02+04.6ef BPu,lhi12.2ABI SHi,lena07.5 PSk,lfy10.2ABI JMa,lyh02.2f VKo,lbi07.3ABI POj,lps01.4f MiV,lmab02.1f VLa,lyh02.4f ATa,lps07.1ABI LLa*lmaa12.3f EHä,lmaa02+04.5f NNu,lmaa02+04.3f HTi,lmaa02+04.1f HNo,läi11.3ABI JJu,läi10.3ABI HTe,lrub05.1 MPa,lge01.2f MMe,lena06.6 MHu,lena06.3 RKo?lke07.3ABI HHu,lmaa14.1ABI EHä,lena03.6 PSk,lbi02+03.5ef POj,lfi01.3f LLa,lhi02.6ef SHi,lhi02.3f ATa,lge01.1f MMe*lmab10.1ABI NNu,lmaa02+04.4f HNo,lmaa06.4f HTi,läi10.2ABI JJu,lena06.1 RKo,läi06+07.2 HTe,lyh05.2ABI VKo,lrub05.5 JSn,läi11.4ABI TLy,lmaa02+04.2f BPu?lmab10.2ABI NNu,lmaa14.3ABI HTi,lmaa12.2f HNo,lte01.5ef OVi,lrub09.3ABI MPa,lrua09.2ABI PAu,lraa09.ABI/lrab209.ABI/lrab310.ABI IWi,lhi02.1f SHi,läi11.1ABI JJu,lbi01.3f ARa*lku01.5f EPe,lke01+02.1f HHu,lfy01+02.4f JMa,lfy01+02.2f PRu,lmu01.6e TTu,lli01.7ef JWi,lfi02.3f LLa,lena06.4 PSk,lena05.2 RKo,läi10.4ABI HTe,lyh02.6ef ATa"
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


