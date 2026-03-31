
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "lena07.1 PSk,lrub03.4 MPa,lyh01.6f VKo,lyh01.1f ATa,lps01.3f MiV,lmab06+07.1f JMa*lmaa08.4f BPu,lmaa08.2f EMa,lena07.6 RKo,lena04.5 PAu,lfi01.2f LLa,läi06+07.5 TLy,läi06+07.3 JJu?lmaa02+04.6ef BPu,lmaa02+04.5f NNu,lena04.4 PSk,lena04.2 RKo,leab205/leab307 MHu,lte03.fe OVi,lop02.8 RKa*lli02.8ef ALa,lli02.6fe RKi,lmaa02+04.3f HTi,lmaa02+04.1f HNo,läi08.5 JJu,lrua08.2/lrub06.4 MPa,lyh03.5fe VKo,lmab02.2fe PRu,lps05.2fe LLa?lena07.2 RKo,lmaa08.1f HTi,lhi01.4f SHi,lena07.4 PAu,läi04.6 TLy,läi04.1 JJu*lmab06+07.2f EMa,ls204 MAl,läi04.3 HTe,lmaa08.3f EHä,lbi02+03.2f POj,lmaa08.5f NNu,lrub03.5 JSn?lena04.5 PAu,lfi01.2f LLa,lps01.3f MiV,lmaa08.4f BPu,läi06+07.5 TLy,läi06+07.3 JJu*lmaa08.2f EMa,lmab06+07.1f JMa,lena07.6 RKo,lena07.1 PSk,lrub03.4 MPa,lyh01.6f VKo,lyh01.1f ATa?lmaa02+04.4f HNo,lmaa02+04.2f EMa,lfy07.3fe JMa,lmaa11.2f EHä,lrub06.1 MPa,lue05.f NMä,lps05.1fe LLa,lbi06.2ef CFr*lku02.4f EPe,lke06.2fe HHu,lena04.1 PSk,lena03.3 RKo,lena04.6 PAu,lyh03.7fe VKo,lyh01.5f ATa"
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


