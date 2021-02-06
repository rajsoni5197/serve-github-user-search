let input = document.querySelector('.input input');
let image = document.querySelector('#userImage');
let inputValue = '';
let url = 'https://api.github.com/users/';
let name = document.querySelector("#name");
let userName = document.querySelector("#userName");
let bio = document.querySelector('#bio');
let loc = document.querySelector('#gps span')
let following = document.querySelector('#following span')
let followers = document.querySelector('#followers span')
let joined = document.querySelectorAll('.date')[0]
let update = document.querySelectorAll('.date')[1]


let timeOut = null;
document.addEventListener('DOMContentLoaded',empty)
document.addEventListener('keyup', function () {
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
        empty
        show();
    }, 600);
})


async function show() {
    if(!input.value){
        empty()
        return;
    }
    clear();
    
    inputValue = input.value;

    const response = await fetch(url + `${inputValue}`)
    if(!response.ok){
        userNotFound();
        return;
    }

    const json = await response.json();
    console.log(json)

    if (json.public_repos != 0) {
        document.querySelector('.repos-box p').style.display = '';
        const repoResponse = await fetch(json.repos_url)
       
        const repoJson = await repoResponse.json()
         console.log(Boolean(repoJson)+'repoJson'+repoJson)

        console.log(repoJson)
        if (json.public_repos < 6) {
            addRepos(json.public_repos, repoJson);
        } else {
            addRepos(6,repoJson);
            addButton(json.html_url+'?tab=repositories');
        }

    } else if (json.public_repos == 0) {

        document.querySelector('.repos-box p').style.display = 'none';
        document.querySelector('.activities').style.border = 'none';
    }

    image.src = json.avatar_url;
    name.innerHTML = json.name;
    bio.innerHTML = json.bio;
    following.innerHTML = json.following;
    followers.innerHTML = json.followers;
    userName.innerHTML = json.login;
    loc.innerHTML = json.location;
    joined.innerHTML = json.created_at.match(/^([^t])+/ig)[0];
    update.innerHTML = json.updated_at.match(/^([^t])+/ig)[0];

    image.addEventListener('load',empty)
    
    console.log(json)
}


function clear() {
    document.querySelector('.repo-grid').innerHTML = '';
    document.querySelector('.seeAll').innerHTML = '';
}
function addRepos(num, repoJso) {
    console.log(num , repoJso)
    for (let i = 0; i < num; i++) {

        document.querySelector('.repo-grid').insertAdjacentHTML('afterbegin', `
        <div class="repos">
           <span class="repoTitle"><a href="${repoJso[i].html_url}" target="_blank" rel="noopener noreferrer">${repoJso[i].full_name}</a></span>
           <span class="repoDiscription">${repoJso[i].description}</span>
           <span class="language"><li>${repoJso[i].language}</li></span>
        </div>`)

    }
}
function addButton(href) {
    document.querySelector('.seeAll').insertAdjacentHTML('afterbegin', `<a href="${href}" target="_blank" rel="noopener noreferrer" ><button>See All</button></a>`)
}
function empty() {
    if (!input.value) {
        document.querySelector('.body').classList.add('displayNone');
        document.querySelector('#notFound').classList.add('displayNone')
        return;
    }
    document.querySelector('#notFound').classList.add('displayNone')
    document.querySelector('.body').classList.remove('displayNone');
  
    
}
function userNotFound(){
    document.querySelector('.body').classList.add('displayNone')
    document.querySelector('#notFound').classList.remove('displayNone')

}
