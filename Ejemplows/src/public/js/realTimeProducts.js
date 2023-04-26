const socket = io.connect("http://localhost:8080", { forceNew: true })

function addProduct(e) {
    const product = {
        id: document.getElementById("id").value,
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        description: document.getElementById("description").value,
        thumbnail: document.getElementById("thumbnail").value,
    }

    socket.emit("addProduct", product)
    return false
}

function render(dataProduct) {
    const html = dataProduct.map((item, index) => {
        return(`<tr>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.code}</td>
            <td>${item.stock}</td>
            <td>${item.description}</td>
            <td>${item.thumbnail}</td>
        </tr>`)
    }).join(" ")

    document.getElementById("productsList").innerHTML = html
}

socket.on("addProduct", function(dataAddProduct) {render(dataAddProduct)})
