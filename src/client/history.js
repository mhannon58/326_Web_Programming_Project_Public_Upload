import { Crud } from './pouchdb.js';
import { initNavbar } from './navbar.js';

initNavbar();

// let historyObj = new Crud('Posts');

async function getPosts(flag)
{
    try
    {
        let route = '';
        if(flag === 0)
            route = "/posts/posted/" + localStorage.getItem("curr_user");
        else
            route = "/posts/accepted/" + localStorage.getItem("curr_user");
        const response = await fetch(route, {
        method: 'GET'
        });
        let docs = await response.json();
        return docs;
    }
    catch(error)
    {
        console.log("Failed to retrieve documents: ", error);
    }
}

function addChildren(element, posts)
{
    for(let elem of posts)
    {
        var firstDiv = document.createElement("div");
        firstDiv.classList.add("card")
        firstDiv.classList.add("mb-4")

        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body")

        var firstRow = document.createElement("div");
        firstRow.classList.add("row")

        var secondDiv = document.createElement("div");
        secondDiv.classList.add("col-sm-10")

        var head3 = document.createElement("h3")
        head3.classList.add("mb-0")

        // will add link
        var title = document.createElement("a")
        title.innerHTML = elem.post_title

        // add stuff here
        var dateDiv = document.createElement("div");
        dateDiv.classList.add("col-sm-2")
        
        var datePara = document.createElement("p");
        datePara.classList.add("text-muted")
        datePara.classList.add("mb-0")
        datePara.classList.add("float-right")
        datePara.innerHTML = elem.deadline

        var detailsDiv = document.createElement("div");
        detailsDiv.classList.add("row-mb-4")

        var tokensDiv = document.createElement("div");
        tokensDiv.classList.add("col-2")

        var tokensPara = document.createElement("p")
        tokensPara.classList.add("mb-0")
        tokensPara.innerHTML = elem.tokens.toString() + " token(s)"
        // stuff added above

        var desc = document.createElement("p")
        desc.classList.add("mb-0")
        desc.classList.add("doc-desc")
        desc.innerHTML = elem.post_description

        firstDiv.appendChild(cardBody)
        cardBody.appendChild(firstRow)
        firstRow.appendChild(secondDiv)
        secondDiv.appendChild(head3)
        head3.appendChild(title)
        firstRow.appendChild(dateDiv)
        dateDiv.appendChild(datePara)

        element.appendChild(firstDiv)
        cardBody.appendChild(desc)
        firstRow.appendChild(detailsDiv)
        detailsDiv.appendChild(tokensDiv)
        tokensDiv.appendChild(tokensPara)
    }
}

window.addEventListener("load", async function() {
    try
    {
        let postedPosts = await getPosts(0);
        let acceptedPosts = await getPosts(1);
        addChildren(document.getElementById("posted-start"), postedPosts);
        addChildren(document.getElementById("accepted-start"), acceptedPosts);
    }
    catch(error)
    {
        console.log("ERROR IN GETTING POST DATA: ", error);
    }
});