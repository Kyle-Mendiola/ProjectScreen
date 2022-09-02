const apps = [
    "App with a long name",
    "App with an even longer name",
    "App with an long even longer longer name",
    "App name",
    "App name"
]

window.onload = function() {
    const appSection = document.querySelector(".app-section")

    for (let index = 0; index < apps.length; index++) {
        appSection.appendChild(createApp(apps[index]))
    }   
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
