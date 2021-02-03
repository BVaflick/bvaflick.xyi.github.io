let full_sizes = []
start()
let modal = document.getElementById('modal');
modal.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none"
    } else if (event.target === document.getElementById('gallery')) {
        if (event.offsetX < document.getElementById('gallery').width / 2) {
            let index = full_sizes.indexOf(document.getElementById('gallery').src)
            document.getElementById('gallery').src = full_sizes[index === 0 ? full_sizes.length - 1 : index - 1]
        } else {
            let index = full_sizes.indexOf(document.getElementById('gallery').src)
            document.getElementById('gallery').src = full_sizes[index === full_sizes.length - 1 ? 0 : index + 1]
        }
    }
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented || modal.style.display !== 'block') {
        return;
    }
    let index
    switch (event.key) {
        case "Left":
        case "ArrowLeft":
            index = full_sizes.indexOf(document.getElementById('gallery').src)
            document.getElementById('gallery').src = full_sizes[index === 0 ? full_sizes.length - 1 : index - 1]
            break;
        case "Right":
        case "ArrowRight":
            index = full_sizes.indexOf(document.getElementById('gallery').src)
            document.getElementById('gallery').src = full_sizes[index === full_sizes.length - 1 ? 0 : index + 1]
            break
        case "Esc":
        case "Escape":
            modal.style.display = "none"
            break;
        default:
            return;
    }
    event.preventDefault();
}, true);

function processPhotos(result) {
    let height = 200
    let items = result.response.items
    items.forEach(item => {
        let item_max_size = item.sizes.find(s => s.type === 'w') || item.sizes.find(s => s.type === 'z') || item.sizes.find(s => s.type === 'y') || item.sizes.find(s => s.type === 'x')
        let item_p = item.sizes.find(s => s.type === 'p') || item.sizes.find(s => s.type === 'x')
        let width = 200 / (item_p.height / item_p.width)
        let img = document.createElement('img')
        img.width = width
        img.height = height
        img.src = item_p.url
        img.onclick = (event) => {
            if (event.target === img) {
                let index = full_sizes.indexOf(document.getElementById('gallery').src)
                document.getElementById('gallery').src = full_sizes[Array.from(document.getElementById('pictures').children).indexOf(img) - 1]
                modal.style.display = 'block'
            }
        }
        full_sizes.push(item_max_size.url)
        document.getElementById('pictures').append(img)
    })
}

function start() {
    // let url = 'https://api.vk.com/method/photos.get?rev=1&photo_sizes=1&owner_id=-5880263&album_id=204376129&access_token=171062ab171062ab171062ab98175ef93711710171062ab4b747c497a208287e3f065a3&v=5.126&callback=processPhotos'
    let url = 'https://api.vk.com/method/photos.get?rev=1&count=1000&owner_id=4731467&album_id=214624130&access_token=171062ab171062ab171062ab98175ef93711710171062ab4b747c497a208287e3f065a3&v=5.126&callback=processPhotos'
    let head = document.getElementsByTagName('head')[0]
    let script = document.createElement('script')
    script.src = url
    script.id = 'script'
    let current_script = document.getElementById('script')
    if (current_script) head.removeChild(current_script)
    head.appendChild(script)
}



