const appNames = [
    "App with a long name",
    "App with an even longer name",
    "App with an long even longer longer name",
    "App name",
    "App name",
    "App with a long name",
    "App with an even longer name",
    "App with an long even longer longer name",
    "App name",
    "App name",
    "App with a long name",
    "App with an even longer name",
    "App with an long even longer longer name",
    "App name",
    "App name",
    "App name",
    "App name"
]

const appList = []
const currentPage = 0

for (const appName of appNames) {
    appList.push(createApp(appName))
}

window.onload = function() {
    const appScroll = document.querySelector(".appScroll")
    const settingsDiv = document.querySelector(".settings")

    settingsDiv.addEventListener('blur', (event) => {
        settingsDiv.style.display = 'none'
    }, true)

    const appPartition = [...getChunkedArray([...appList], getMaxAppCount())]

    for (let i = 0; i < appPartition.length; i++) {
        let appSection = createAppSection(i)

        fillAppSection(appSection, appPartition[i])

        appScroll.appendChild(appSection)
    }

    createNavButtons(appPartition.length)

}

window.onresize = function() {
    // console.log("hey");
}

function scrollToAppSection(id) {
    const f = document.getElementById(`app-section-${id}`)
    f.scrollIntoView({behavior: "smooth"})
}

function showSettings() {
    const settingsDiv = document.querySelector(".settings")
    settingsDiv.classList.toggle("slide-in")
    settingsDiv.style.display = "block"
    settingsDiv.style.bottom = 0
    settingsDiv.focus()
}

function createApp(name) {
    let appDiv = document.createElement('div')
    let iconDiv = document.createElement('div')
    let nameContainer = document.createElement('span')

    appDiv.className = "app"
    iconDiv.className = "icon"
    nameContainer.className = "name"

    appDiv.appendChild(iconDiv)
    iconDiv.appendChild(nameContainer)
    nameContainer.innerHTML = name

    return appDiv
}

function createNavButtons(n) {
    const nav = document.querySelector("div.nav")

    for (let i = 0; i < n; i++) {
        const btn = document.createElement("button")
        btn.className = i === 0 
            ? "nav active" 
            : "nav"
        btn.id = `btn-${i}`
        btn.onclick = function () {
            const activeBtn = document.querySelector("button.nav.active")
            if(activeBtn){
                activeBtn.classList.toggle("active")
            }
            btn.classList.toggle("active")
            scrollToAppSection(i)
        }
        nav.appendChild(btn)
    }
}

function createAppSection(id) {
    let appSection = document.createElement('div')
    appSection.className = "app-section"
    appSection.id = `app-section-${id}`
    return appSection
}

/** Fills a div with apps. 
 *  If # of apps are less than the needed amount
 *  to completely fill a row, add invisible divs
 *  to complete it.
 * 
 * @param  {div} appSection - the div to be filled with apps
 * @param  {array} apps - list of apps to be added
 */
function fillAppSection(appSection, apps) {
    for (let app of apps) {
        appSection.appendChild(app)
    }
    
    const maxColCount = getColumnCount()
    if (apps.length >= maxColCount) {
        return
    }
    const noOfPlaceholderApps = maxColCount - apps.length

    for (let j = 0; j < noOfPlaceholderApps; j++) {
        appSection.appendChild(document.createElement('div'))
    }
}

function* getChunkedArray(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
        yield arr.slice(i, i + n);
    }
}

function getColumnCount() {
    if (window.innerWidth >= 625) {
        return 4
    }
    else if (window.innerWidth >= 473) {
        return 3
    }
    else if (window.innerWidth >= 342) {
        return 2
    }
    else if (window.innerWidth < 342) {
        return 1
    }
    // const appSection = document.querySelector(".app-section")
    // const gridCompProps = window.getComputedStyle(appSection)
    // const gridColumnCount = gridCompProps.getPropertyValue("grid-template-columns").split(" ").length
    // return gridColumnCount
}

function getMaxAppCount() {
    return getColumnCount() * 4
}