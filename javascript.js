
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "lhi01.1f ATa,lps01.2f MiV,lmay01A.3f LDe,lge01.4f MMe,lmay01A.5ef HTi,lmay01A.6ef BPu,lfi02.1f LLa,lfi02.6ef EHä*lbi07.1ABI POj,lke07.2ABI HHu,lena09.2ABI PSk,lena09.5ABI RKo,lena09.8ABI PAu,lyh05.1ABI VKo,lrub09.1ABI / lrua09.1ABI MPa,läi05.2 HTe,lena04.3 MHu,lmaa05.4f HNo,läi05.5 TLy?lmay01A.1f HNo,lmay01A.4f NNu,lke07.1ABI HHu,lge05.ABI MMe,lena01+02.2 PSk,lyh01.3f VKo,läi17.1o2 HTe,lue07.ABI / let07.ABI NMä,lhi12.1ABI ATa*lli02.2fe JWi,lmu02.1e MMc,lku02.1f EPe,lfi01.5ef EHä,lps01.6ef LLa,lsaa03 JSn,lfy05.1fe JMa,lbi04.2ef CFr,lhi05.f SHi,lena09.3ABI RKo?lbi01.4f ARa,läi05.1 TLy,lte01.2f OVi,lte01.3f ALa,läi05.4 HTe,lhi02.5ef SHi,läi05.6 JJu,ls205 MAl,lena09.2ABI PSk,lena09.8ABI PAu*lli01.6ef PBo,lmu01.2e TTu,lmu01.5e MMc,lku01.1f EPe,lku01.7ef KEs,lke01+02.3f LDe,lbi07.1ABI POj,lke07.2ABI HHu,lena09.5ABI RKo,lyh05.1ABI VKo,lrub09.1ABI / lrua09.1ABI MPa?lke07.2ABI HHu,lmaa05.4f HNo,lbi07.1ABI POj,lena09.5ABI RKo,lyh05.1ABI VKo,läi05.5 TLy,lena04.3 MHu,lena09.2ABI PSk,lena09.8ABI PAu,lrub09.1ABI / lrua09.1ABI MPa*lhi01.1f ATa,lfi02.6ef EHä,läi05.2 HTe,lps01.2f MiV,lmay01A.3f LDe,lge01.4f MMe,lmay01A.5ef HTi,lmay01A.6ef BPu,lfi02.1f LLa?lrub01+02.1 MPa,lmay01A.2f LDe,lrub01+02.3 JSn,lrua01+02 MiV,let02.2ef LVä,lena09.1ABI RKo,lrab206 / lrab308 / lraa08 IWi,lmab08.1f JMa,lfi05.ABI LLa,lmaa05.3f BPu*lrub01+02.6 PAu,lena09.4ABI PSk,lbi07.2ABI POj,läi01.4 HTe,lmaa05.1f HTi,lmaa13.3ABI HNo,läi01.5 TLy,lss201.1+2 MAl,lue02.3f NMä,lmaa05.5f NNu,lrub04.2 TNu"
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

