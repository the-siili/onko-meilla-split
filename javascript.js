
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "läi06+07.6 TLy,lyh02.5ef ATa,ls206+07 MAl,lbi02+03.3f POj,lena06.2 RKo*lmaa02+04.4f HNo,läi06+07.4 HTe,läi06+07.1 JJu,lge01+lhi01.5ef/.6ef SHi/MMe,lfi01.1f LLa,lena03.2 MHu,lena07.3 PSk?lmaa02+04.1f HNo,lmab03.1f EMa,lmaa02+04.6ef BPu,lmaa02+04.5f NNu,lmaa02+04.3f HTi,lhi04.fe SHi*lku02.3f EPe,lke05.1fe HHu,lhi01.2f ATa,lfy07.2fe JMa,lfi01.4f EHä,lsab204/lsab306 JSn,lena08.1 RKo,leab204/leab306 NHe?lmaa07.2f HNo,lyh02.1f ATa,läi02+06.2 JJu,lena03.1 PSk,lmab05.2f JMa*lmaa07.5f EMa,lmaa07.4f HTi,lrub05.3 MPa,lge01+lhi01.5ef/.6ef SHi/MMe,lyh02.3f VKo,lbi02+03.4f POj,lrub05.6 RKo?lge01+lhi01.5ef/.6ef SHi/MMe,läi06+07.4 HTe,lfi01.1f LLa,lena03.2 MHu*ls206+07 MAl,lmaa02+04.4f HNo,läi06+07.1 JJu,lyh02.5ef ATa,läi06+07.6 TLy,lbi02+03.3f POj,lena07.3 PSk,lena06.2 RKo?läi17.2o2 JJu,lrub03.1 MPa,lena03.4 PSk,lfy07.1fe JMa,let06.feo1/lue06.feo1 NMä,läi02+06.5 TLy,lrub03.3 JSn,leaa06 MHu*lli02.5fe JWi,lli02.4fe PBo,lke05.2fe HHu,lhi04.2ef SHi,lmaa02+04.2f EMa,lte02.fe OVi,lrub03.6 PAu,lrua03 MiV,lps06.fe/lyh08.fe LLa"
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


