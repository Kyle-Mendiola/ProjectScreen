const appNames = [
    "1. App name", "2. App name",
    "3. App name", "4. App name",
    "5. App name", "6. App name",
    "7. App name", "8. App name",
    "9. App name", "10. App name",
    "11. App name", "12. App name",
    "13. App name", "14. App name",
    "15. App name", "16. App name",
    "17. App name", "18. App name",
    "19. App name", "20. App name"
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

    arrangeAppPartition()

}

window.onresize = function() {
    arrangeAppPartition()
    scrollToAppSection(0)
}

function scrollToAppSection(id, options={}) {
    const f = document.getElementById(`app-section-${id}`)
    if(options){
        f.scrollIntoView(options)
        return
    }
    f.scrollIntoView()
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
        let btn = document.getElementById(`btn-${i}`)
        let handler = function () {
            navBtnHandler(btn, i)
        }
        if (btn) {
            let excessBtn = document.getElementById(`btn-${n}`)
            if (!excessBtn) {
                continue
            }
            while (excessBtn) {
                console.log(excessBtn);
                nav.lastChild.removeEventListener('click', handler)
                nav.lastChild.remove()
            }
            continue
        }
        btn = document.createElement("button")
        
        btn.className = i === 0 
            ? "nav active" 
            : "nav"
        btn.id = `btn-${i}`
        btn.addEventListener('click', handler)
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
    appSection.replaceChildren(...apps)
    
    const maxColCount = getColumnCount()
    if (apps.length >= maxColCount) {
        return
    }
    const noOfPlaceholderApps = maxColCount - apps.length

    for (let j = 0; j < noOfPlaceholderApps; j++) {
        appSection.appendChild(document.createElement('div'))
    }
}

function arrangeAppPartition() {
    const appScroll = document.querySelector(".appScroll")
    const appPartition = [...getChunkedArray([...appList], getMaxAppCount())]

    for (let i = 0; i < appPartition.length; i++) {
        let appSection = document.getElementById(`app-section-${i}`)
        if (!appSection) {
            appSection = createAppSection(i)
        }

        fillAppSection(appSection, appPartition[i])

        appScroll.appendChild(appSection)
    }

    createNavButtons(appPartition.length)
}

function* getChunkedArray(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
        yield arr.slice(i, i + n);
    }
}

function getRowCount(){
    if (window.innerHeight >= 700) {
        return 4
    }
    else if (window.innerHeight >= 520) {
        return 3
    }
    else if (window.innerHeight >= 330) {
        return 2
    }
    else{
        return 1
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
    return getColumnCount() * getRowCount()
}

function removeApps(elem) {
    const aS = document.getElementById(elem)
    console.log(aS);
    for(let app of aS.children()){
        app.remove()
    }
}

function navBtnHandler(btn, n) {
    const activeBtn = document.querySelector("button.nav.active")
    if(activeBtn){
        activeBtn.classList.toggle("active")
    }
    btn.classList.toggle("active")
    scrollToAppSection(n, {behavior: "smooth"})
}