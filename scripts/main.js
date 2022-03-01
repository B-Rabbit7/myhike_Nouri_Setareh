function read_display_Quote(){
    // console.log("inside the function")
    db.collection("quotes").doc("Tuesday")
    .onSnapshot(TuesdayDoc => {
        console.log(TuesdayDoc.data());
        document.getElementById("quote-goes-here").innerHTML = TuesdayDoc.data().quote;
    })
}
read_display_Quote();

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {                                                                 
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                  .then(userDoc => {
               var user_Name = userDoc.data().name;
               console.log(user_Name);
               //method #1:  insert with html only
               //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
               //method #2:  insert using jquery
               $("#name-goes-here").text(user_Name);                         //using jquery
            })
        } else {
            // No user is signed in.
        }
    });
}
insertName();

function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code:"BBY01",
        name: "Burnaby Lake Park Trail",    //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
        length: "10 km",
        details: "Set goes here regularly"
    });
    hikesRef.add({
        code:"AM01",
        name: "Buntzen Lake Trail Trail",    //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        length: "10.5 km",
        details: "Set goes here regularly"
    });
    hikesRef.add({
        code:"NV01",
        name: "Mount Seymoure Trail",    //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        length: "8.2 km",
        details: "Set goes here regularly"
    });
}



function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                var city = doc.data().city;
                var province = doc.data().province;
                var difficulty = doc.data().level;
                var length = doc.data().length;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-attend').innerHTML = details;
                newcard.querySelector('.card-image').src = "./images/" + title + ".jpeg"; //hikes.jpg
                newcard.querySelector('.card-location').innerHTML = city;
                newcard.querySelector('.province').innerHTML = province;
                newcard.querySelector('.difficulty').innerHTML = difficulty;
                newcard.querySelector('.length').innerHTML = length;

    
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })

        })
}


displayCards("hikes");