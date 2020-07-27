/************* LINKING GOOGLE SHEETS **********/

// ID COMES FROM THE URL THAT IS IN THE ADDRESS BAR ONCE THE SHEET HAS BEEN CREATED/SHARED
const id = '1NydoL_oDQr2cmgVhuqgbiOQpwQCJZmI5-VkcVMgmJ5Q'

// BELOW URL IS HOW GOOGLE ALLOWS US TO ACCESS THE SHARED FILE AS JSON
const source = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`

// FETCH GOOGLE SHEETS API
fetch(source).then(res => res.json()).then((data) => {
    let projects = data.feed.entry.map(d => {
        return {
            title: d.gsx$title.$t,
            image: d.gsx$image.$t,
            description: d.gsx$description.$t,
            liveLink: d.gsx$livelink.$t,
            githubLink: d.gsx$githublink.$t,
            category: d.gsx$category.$t,
        }
    });
    createCards(projects)
})

/*********** EVENT LISTENERS & FUNCTION CALLS ***************/

removeHamburgerMenu();

/*********** FUNCTION DEFINITIONS ***************/

function removeHamburgerMenu() {
    const navLinks = document.getElementsByClassName('nav-link');

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', () => {
            removeHamburgerStyles();
        })
    }
}

function removeHamburgerStyles() {
    const navCollapse = document.querySelector('.navbar-collapse');
    const hamburgerMenu = document.getElementById('hamburger-menu');

    hamburgerMenu.classList.add('collapsed');
    hamburgerMenu.setAttribute('aria-expanded', 'false');
    navCollapse.classList.remove('show');
}

/********* CREATE CAROUSEL CARDS **********/
class Card {
    constructor(obj) {
        this.title = obj.title
        this.image = obj.image
        this.description = obj.description
        this.liveLink = obj.liveLink
        this.githubLink = obj.githubLink
        this.category = obj.category
    }

    render() {
            // target carousel-inner (container for all carousel-items) & create div that will hold each image
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card')
                // create img element for & add current image
            const image = document.createElement('img')
            image.setAttribute('src', this.image)
            image.classList.add('card-img-top')
                // grab div with id projects
            const projectsDiv = document.getElementById('projects');
            // creates class for content and adds current card description to it
            const cardContent = new CardContent(this.title, this.description, this.liveLink, this.githubLink)
                // appends div element card to div element container
            projectsDiv.appendChild(cardDiv)
                // appends img element to div element .card-image
            cardDiv.appendChild(image)
                // renders and appends class card (description) to div element card
            cardDiv.appendChild(cardContent.render())
                // returns div element container
            return cardDiv;
        } // end of render()
} // end of class Card

class CardContent {
    constructor(title, desc, liveLink, githubLink) {
        this.title = title
        this.desc = desc
        this.liveLink = liveLink
        this.githubLink = githubLink
    }
    render() {
            // creates a div for card content (description of project)
            const cardBody = document.createElement('div')
                // adds class card-content to above div
            cardBody.classList.add('card-body');
            // create h5 tag for project title
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.innerText = this.title
                // creates p tag to add description text
            const paragraph = document.createElement('p');
            paragraph.classList.add('card-text');
            paragraph.innerText = this.desc
                // create buttons
            const liveProjectLink = document.createElement('a');
            liveProjectLink.classList.add('btn', 'btn-primary', 'live-link');
            liveProjectLink.setAttribute('href', this.liveLink);
            liveProjectLink.setAttribute('target', '_blank');
            liveProjectLink.innerText = 'See the app'

            const githubProjectLink = document.createElement('a');
            githubProjectLink.setAttribute('href', this.githubLink);
            githubProjectLink.setAttribute('target', '_blank');
            githubProjectLink.classList.add('btn', 'btn-primary', 'github-link');
            githubProjectLink.innerText = 'See the code'
                //append all content to card's body
            cardBody.appendChild(cardTitle)
            cardBody.appendChild(paragraph)
            cardBody.appendChild(liveProjectLink)
            cardBody.appendChild(githubProjectLink)

            return cardBody;
        } // end of render()
} // end of class CardContent

// render and append cards to projects div
function createCards(projects) {
    const projectDiv = document.querySelector('#projects')
    const designDiv = document.querySelector('#projects-design')
    projects.forEach(obj => {
        let card = new Card(obj)
        if (card.category == 'code') {
            projectDiv.appendChild(card.render())
        } else if (card.category == 'design') {
            designDiv.appendChild(card.render())
        }

    })
}