import { Crud } from './pouchdb.js';

// connects to existing user database
let historyObj = new Crud('signup_db');
let userData = null;
let createdPosts = [], acceptedPosts = [];

window.addEventListener("load", async function() {
    try
    {
        userData = await historyObj.readDoc("johndoe123");
        createdPosts = userData.createdPosts;
        acceptedPosts = userData.acceptedPosts;

        for(let elem of createdPosts)
        {
            console.log(elem);
        }
        for(let elem of acceptedPosts)
        {
            console.log(elem);
        }
    }
    catch(error)
    {
        console.log("ERROR IN GETTING POST DATA: ", error);
    }
});