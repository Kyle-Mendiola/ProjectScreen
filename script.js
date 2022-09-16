const apps = [
    "App with a long name",
    "App with an even longer name",
    "App with an long even longer longer name",
    "App name",
    "App name",
    "App name"
]

window.onload = function() {
    const appSection = document.querySelector(".app-section")
    const settingsDiv = document.querySelector(".settings")

    settingsDiv.addEventListener('blur', (event) => {
        settingsDiv.style.display = 'none'
    }, true)

    for (const app of apps) {
        appSection.appendChild(createApp(app))
    }

    const gridCompProps = window.getComputedStyle(appSection)
    const gridColumnCount = gridCompProps.getPropertyValue("grid-template-columns").split(" ").length
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
