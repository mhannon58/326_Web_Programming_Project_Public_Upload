import { Crud } from './pouchdb.js';

let historyObj = new Crud('Posts');

async function getAllPosts()
{
    try
    {
        const docs = await historyObj.getAllDocs();
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
        title.innerHTML = elem.doc.post_title

        // add stuff here
        var dateDiv = document.createElement("div");
        dateDiv.classList.add("col-sm-2")
        
        var datePara = document.createElement("p");
        datePara.classList.add("text-muted")
        datePara.classList.add("mb-0")
        datePara.classList.add("float-right")
        datePara.innerHTML = elem.doc.deadline

        var detailsDiv = document.createElement("div");
        detailsDiv.classList.add("row-mb-4")

        var tokensDiv = document.createElement("div");
        tokensDiv.classList.add("col-2")

        var tokensPara = document.createElement("p")
        tokensPara.classList.add("mb-0")
        tokensPara.innerHTML = elem.doc.tokens.toString() + " token(s)"
        // stuff added above

        var desc = document.createElement("p")
        desc.classList.add("mb-0")
        desc.classList.add("doc-desc")
        desc.innerHTML = elem.doc.post_description

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
        let posts_dict = await getAllPosts();
        let posts = posts_dict.rows;
        addChildren(document.getElementById("dynamic-start"), posts);
    }
    catch(error)
    {
        console.log("ERROR IN GETTING POST DATA: ", error);
    }
});