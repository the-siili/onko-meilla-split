
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "lena07.1 RKo,läi06+07.2 JJu,lena07.3 PSk,ls206+07 MAl,lfi02.5ef LLa,lyh01.2f VKo*lge01+hi01.5ef/6ef MMe, SHi,lmaa02+04.1f NNu,läi06+07.6 HTe,lbi02+03.3f POj,lmaa02+04.4f HNo,läi06+07.4 TLy?lrub03.1 PAu,lbi02+03.4f POj,lmaa02+04.6ef LEk,lfy07.2fe JMa,lyh04.3f VKo,lte02.feo2 OVi,lue06.feo1 / let06.feo1 NMä,leab205/307 RWe*lli02.5fe RKi,lke05.1fe HHu,lmaa02+04.2f SSn,lmaa02+04.3f NNu,lmaa02+04.5f HNo,lmab03.fe OHe,lena08.2 RKo,lrub06.1 / lrua08.1 MPa?lmaa07.2f HNo,lmaa07.4fe SSn,lyh01.1f ATa,lena03.2 RKo,lrub05.1 MPa,lrub05.3 PAu*lge01+hi01.5ef/6ef MMe, SHi,läi04.3 TLy,läi04.4 HTe,lmab05.2f OHe,lmab05.1f JMa,lrub05.6 JSn?lena07.3 PSk,lyh01.2f VKo,lfi02.5ef LLa,ls206+07 MAl,läi06+07.4 TLy,lena07.1 RKo*lge01+hi01.5ef/6ef MMe, SHi,läi06+07.2 JJu,lbi02+03.3f POj,läi06+07.6 HTe,lmaa02+04.4f HNo,lmaa02+04.1f NNu?lhi04.fe SHi,lps06.fe / lyh08.fe LLa,lfi01.5ef EHä,lrub03.6 JSn,lrua03 MiV,läi/ls217.5o1 JJu,lrub03.3 PAu*lke05.2fe HHu,lku02.4f EPe,lena03.1 RKo,lrub03.2 MPa,lena03.4 PSk,lfy07.1fe JMa,läi/ls217.4o1 HTe"
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
