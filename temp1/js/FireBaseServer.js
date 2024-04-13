const Views_RefString = 'Besure/Static/Views';
const Leads_RefString = 'Besure/Leads';

    //this is how to use.
    // const user = {
    //     From:document.referrer,
    //     Url:document.URL,
    //     isMobile:isUserMobile(),
    //     EnterAt:new Date().getTime()       
    // }
    // Post(Views_RefString,user);



    // Get(Views_RefString)
    // .then(data=>{
    //     console.log(data);
    // })


const Post = (refString,obj)=>{
    try {
        ref = firebase.database().ref(refString);
        ref.push().set(obj);
    } catch (error) {
        console.error(error);
    }



}

const Get = async (ref)=>{
    const collection = firebase.database().ref(ref);

    try {
        const snapshot = await collection.once("value");
        return snapshot.val();
    } catch (error) {
        console.error("Error fetching data from Firebase:", error);
        return null; // or you can handle errors differently based on your requirements
    }
}



























const isUserMobile = () => {
    if (/Mobi/.test(navigator.userAgent)) {
        // User is on a mobile device
        //console.log("User is on a mobile device.");
        return true;
    } else {
        // User is on a desktop device
        //console.log("User is on a desktop device.");
        return false;
    }
}