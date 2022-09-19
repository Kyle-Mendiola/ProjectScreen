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
let currentPageNumber = 0

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

}

window.onresize = function() {
    // console.log("hey");
}

function showSettings() {
    const settingsDiv = document.querySelector(".settings")
    settingsDiv.style.display = "block"
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

function changeAppPage(targetPageNumber) {
    const currentPage = getChunkedArray(appList, 2)[currentPageNumber]
    const targetPage = getChunkedArray(appList, 2)[targetPageNumber]
}

function createAppSection(id) {
    let appSection = document.createElement('div')
    appSection.className = "app-section"
    appSection.id = id
    return appSection
}

function fillAppSection(appSection, apps) {
    for (let app of apps) {
        appSection.appendChild(app)
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
    else if (window.innerWidth < 342){
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