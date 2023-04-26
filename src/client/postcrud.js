let postdb = new PouchDB('Posts');
let generaldb = new PouchDB('General');

// reset_posts();
// reset_general();

async function loadPosts() {
    const response = await fetch('/data/mock_posts.json');
    const posts = await response.json();
  
    console.log(posts);
  
    postdb.bulkDocs(posts)
      .then(function (result) {
        console.log('Mock data stored successfully!');
      })
      .catch(function (err) {
        console.log('Error storing mock data: ' + err);
      });
  }

postdb.info().then(function (info) {
    console.log(info);
})

function reset_posts() {
    postdb.destroy().then(function () {
      postdb = new PouchDB('Posts');
      loadPosts();
    });
};

function reset_general() {
    generaldb.destroy().then(function () {
      generaldb = new PouchDB('General');
    });
};

async function _init_() {
    await loadPosts();
    try {
        const doc = await generaldb.get("posting_count");
        console.log("Count has been created", doc);
    } catch(err) {
        await generaldb.put({ _id:"posting_count", count: 20 }); //mock loaded
    }
}

async function getNextId() {
    let doc = "placeholder";
    let nextId = 0;
    try {
        doc = await generaldb.get("posting_count");
        nextId = doc.count;
        console.log("The current id is", doc.count, typeof(doc.count));
    } catch(err) {
        console.log("There was an error");
    }

    try {
        Object.assign(doc, { count:parseInt(nextId+1) });
        const response = await generaldb.put(doc);
        console.log('IDCount updated: ', response);
    } catch(err) {
        console.error('Failed to update document: ', err);
    }

    return nextId+1;
}

_init_();

generaldb.info().then(function (info) {
    //console.log(info);
})


async function createPost(id, title, description, tags, tokens, date) {
    let post = {
        _id: id,
        post_title: title,
        post_description: description, 
        post_tags: tags, 
        tokens: tokens,
        deadline: date,
        finished: false
    };
  
    try {
        const response = await postdb.put(post);
        console.log('Document created: ', response);
    } catch(err) {
        console.error('Failed to create document: ', err);
    } 
} 

async function readPost(id) {
    try {
        const doc = await postdb.get(id);
        console.log('Document retrieved: ', doc);
        return await doc;
    } catch(err) {
        console.error('Failed to retrieve document: ', err);
    }
}

async function updatePost(id, data) {
    try {
        const doc = await postdb.get(id);
        Object.assign(doc, data);
        const response = await postdb.put(doc);
        console.log('Document updated: ', response);
    } catch(err) {
        console.error('Failed to update document: ', err);
    }
}

async function deletePost(id) {
    try {
        const doc = await postdb.get(id);
        const response = await postdb.remove(doc);
        console.log('Document deleted: ', response);
    } catch(err) {
        console.error('Failed to delete document: ', err);
    }
}

async function getAllPosts() {
    try {
        const docs = await postdb.allDocs({ include_docs: true });
        console.log(docs);
        return docs;
    } catch(err) {
        console.log("An error occurred.");
    }
}

export {
    reset_general,
    reset_posts,
    createPost,
    readPost,
    updatePost,
    deletePost,
    getAllPosts,
    getNextId,
    _init_
};