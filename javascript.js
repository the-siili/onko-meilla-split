
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "lmab06+07.1f JMa,lmaa08.1f HNo,lmaa08.3f IKa,lmaa11.4f NNu,lge01.4f MMe,lyh01.6fe ATa,läi06+07.2 JJu*lena07.6 RKo,lena07.5 PAu,lbi02+03.1f POj,läi04.2 HTe,lena03.3 PSk,lbi02+03.5ef CFr?lyh01.1f ATa,lmab02.2ef EMa,lmaa08.4f EHä,läi08.6 TLy,lrub06.3 MPa,lrua06.1 PAu*lli02.7fe RKi,lmaa02+04.2f HNo,lmaa02+04.3f NNu,lmaa02+04.5fe IKa,lmaa02+04.6ef LEk,lhi01.4f SHi,läi/ls209.1 JJu?lmaa02+04.1f IKa,lmaa02+04.4f HNo,lmaa08.5ef LEk,lmaa11.2f NNu,lena07.3 PSk,lena06.4 RKo,läi04.6 HTe*lfi01.5ef LLa,lyh02.3f VKo,lena04.2 LJu,ls204.1 MAl,läi06+07.1 TLy,lmab06+07.2fe EMa?lena07.6 RKo,lena07.5 PAu,lbi02+03.1f POj,läi04.2 HTe,lena03.3 PSk,lbi02+03.5ef CFr*lmaa08.1f HNo,lmaa08.3f IKa,lmab06+07.1f JMa,lmaa11.4f NNu,lge01.4f MMe,lyh01.6fe ATa,läi06+07.2 JJu?lhi05.2f SHi,läi04.5 JJu,lyh03.5fe VKo,ls218.1o2 MAl,lte03.1feo2 OVi,lfi01.2f LLa,lbi02+03.3f ARa*lmu02.4e MMc,lyh01.4f ATa,lmaa11.5ef EMa,läi04.1 TLy,lbi06.1fe POj,lrub06.4/lrua08.4 MPa,lbi02+03.6ef CFr"
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
