window.onload = function(){
    console.log("window has loaded");

    const allRatings = document.getElementsByClassName("ratingcolor");
    console.log(allRatings)
    for(let i=0; i<allRatings.length; i++){
        let rating = Number(allRatings.item(i).innerText);
        if(rating >=7 ){
            allRatings.item(i).classList.add("g")
        }else if(rating>=5){
            allRatings.item(i).classList.add("m")
        }else{
            allRatings.item(i).classList.add("b")
        }
    }
}

function toggleHidden(id){
    console.log(id)
    document.getElementById("editForm-" + id).toggleAttribute("hidden");
    document.getElementById("editForm-" + id).classList.toggle("editform")
    document.getElementById("goToEdit-" + id).toggleAttribute("hidden");
    document.getElementById("submitEdit-" + id).toggleAttribute("hidden");
    document.getElementById("rating-" + id).toggleAttribute("hidden");
    document.getElementById("content-" + id).toggleAttribute("hidden");
}