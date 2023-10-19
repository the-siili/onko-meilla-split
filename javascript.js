
let days = [ "Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"]
let fin_days = [ "Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko","Torstai", "Perjantai","Lauantai"]


let text1 = "läi08.1 HTe,läi01+02+03.1 TLy,lrub01+02.2 MPa,lena01+02.3 RKo,lrub01+02.4 PAu,läi01+02+03.6 JJu,ls201+02+03.1 MAl,lmaa13.3f EHä,lrub04.6 LJu,nan,nan,nan,*lmab09.2fe/xLmab08.2fe EMa,lmaa06+07.1f/lmaa09.1f HNo,lmab04.1fe JMa,lmaa06+07.5ef/lmaa09.5ef LEk,lena01+02.4 PSk,lmaa06+07.3f/ lmaa09.3f NNu,lyh03.4fe VKo,lhi03.5ef SHi,lue02.2f NMä,nan,nan,nan,?lmab09.1fe/xLmab08.1f EMa,läi10.2/xLäi08.1 HTe,lyh03.2fe ATa,lmaa03.3f/lmaa03.5f NNu/EHä,leaa07.1/leab207.1 APo,lraa03.1/lrab203.1/lrab305.1/xLrab305.1 IWi,lbi04.2fe ARa,lop01.10abi IKu,lop01.2abi PKa,lop01.7abi KMa,nan,nan,*lmu01.4e ILe,lmu02.2e MMc,lke03.1fe HHu,lmaa03.1f HNo,lmaa03.2f IKa,lmaa03.6ef LEk,lsaa03.1/lsab306.1/lsab204.1 JSn,lps03.1fe LLa,lbi04.3ef CFr,lbi01.5f POj,lop01.5abi RKa,nan,?lmaa03.4f HNo,lfy08.2fe JMa,lena05.2 RKo,lsaa07.1/lsab207.1/lsab309.1 JSn,lhi02.4f SHi,lte01.5ef/xLte01.5ef OVi,lena06.1 PAu,lfy01+02.2f EHy,lbi01.3f ARa,lmaa13.1f NNu,nan,nan,*lke01+02.1f EMa,lmu01.6e ILe,lku01.7ef EPe,lmu01.8e MMc,lena05.6 PSk,läi08.4 HTe,läi11.5/xLäi09.5 JJu,lyh02.3f tt VKo,lrub07.2/xLrub07.2 MPa,ls208.1 MAl,nan,nan,?lmab09.2fe/xLmab08.2fe EMa,lena01+02.4 PSk,lmaa13.3f EHä,lyh03.4fe VKo,lhi03.5ef SHi,lue02.2f NMä,lmaa06+07.3f/ lmaa09.3f NNu,lrub04.6 LJu,lmaa06+07.5ef/lmaa09.5ef LEk,nan,nan,nan,*lmaa06+07.1f/lmaa09.1f HNo,lmab04.1fe JMa,läi08.1 HTe,läi01+02+03.1 TLy,lrub01+02.2 MPa,lena01+02.3 RKo,lrub01+02.4 PAu,läi01+02+03.6 JJu,ls201+02+03.1 MAl,nan,nan,nan,?lena05.5 PSk,läi10.1 JJu,lyh03.3fe/xLyh03.3fe VKo,lhi03.4ef/xLhi03.3ef SHi,lfi02.4f LLa,läi08.3 TLy,lfy01+02.6fe MSl,lbi01.7ef CFr,lge01.2f yt MMe,nan,nan,nan,*lmu01.1e MMc,lli01.2fe RKi,lku01.3f EPe,lke01+02.4f HHu,lli01.5fe ALa,lke01+02.8ef NNu,lyh02.1f/xLyh02.1 ATa,lmaa13.4f HNo,lena05.3 RKo,lte01.6ef OVi,lrua07.1 PAu,nan?x"
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
    menu_arr = a["menu-data"][today].split(";");


    document.getElementById("menu_week").innerHTML = a["menu-data"]["Week"]


    for (i in menu_arr)
    {
        document.getElementById("menu_list").innerHTML += menu_arr[i] + "<br />"
    }

}