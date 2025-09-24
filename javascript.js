
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "lke06.1fe HHu,lhi03.4fe SHi,lhi02.2f ATa,lge01.3f MMe,lfy08.2fe JMa,lfi02.5ef EHä,lena05.6 MHu,lena01+02.4 PSk,lena01+02.3 RKo*läi10.1ABI TLy,läi01.6 JJu,läi01.1 HTe,lyh03.4fe VKo,lte01.1f ALa,ls201 MAl,lrub01+02.5 PAu,lrub01+02.2 MPa,lmab09.1f NNu,lmaa10.3f HNo,lmaa06.4f/lmaa09.4f HTi?lena01+02.1 PAu,lmaa17.fe HTi,lmaa03.2f HNo,läi08.4 TLy,läi02+06.3 HTe,lop01.4abi AHu,lop01.2abi KMa,lop01.6abi PKa*lke03.3fe HHu,lke03.2fe LDe,lena01+02.6 PSk,lena01+02.5 RKo,lhi03.2f ATa,lsab203/lsab305 JSn,lrub01+02.4 TNu,lrab203/lrab305 IWi,lraa03 OVi,lps03.2ef LLa,lhi06.fe SHi,lfy06.2fe JMa?läi05.3 JJu,lyh03.3fe VKo,lte01.6ef OVi,lps01.5ef LLa,lrub01+02.1 MPa,lfy09.e MSl,lrub01+02.6 PAu,lrub01+02.3 JSn,lrua01+02 MiV*lop01.5abi AHu,lop01.7abi PKa,lfi02.2f EHä,leaa07/leab207/leab309 MHu,lmab09.2f NNu,lmaa10.4f HTi,lhi02.4f SHi,lena05.1 PSk,lena05.5 RKo,läi02+06.4 TLy,lyh01.2f ATa?lfi02.5ef EHä,lmaa06.4f/lmaa09.4f HTi,lte01.1f ALa,ls201 MAl,läi10.1ABI TLy,läi01.6 JJu,läi01.1 HTe,lyh03.4fe VKo,lmab09.1f NNu*lke06.1fe HHu,lge01.3f MMe,lfy08.2fe JMa,lena05.6 MHu,lena01+02.4 PSk,lena01+02.3 RKo,lhi03.4fe SHi,lhi02.2f ATa,lmaa10.3f HNo,lrub01+02.5 PAu,lrub01+02.2 MPa?lraa07/lrab207/lrab309 IWi,lss201.1+2 MAl,lsaa07/lsab207/lsab309 JSn,lue02.1f NMä,lbi01.5fe ARa,lmaa06.3f/lmaa09.3f BPu,lmaa06.5f/lmaa09.5f NNu,lrub07.2 MPa,lrub04.5 TNu,lyh03.2fe ATa,lhi03.5ef SHi*lli01.3fe PBo,lli01.2fe JWi,lke01+02.6ef HHu,lmu01.1e MMc,lku01.4f EPe,lmab04.2f JMa,lmaa10.1f EHä,let02.1f LVä,lfy01+02.7ef MSl,läi08.3 HTe,lena05.4 PSk"
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

