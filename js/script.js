/**
 * 
 * @returns Récupération des données de l'API
 */
// Méthode 1
const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products")
    const productsAvailable = await res.json()
    console.log("Liste des produits disponibles :", productsAvailable)
    return productsAvailable
}

//  Méthode 2
/*     const fetchProducts = () => {
        return fetch("http://localhost:3000/api/products")//  Requête fetch GET pour récupérer les données de l'api
        .then(res => {//  Réponse de l'api, contient le status ainsi que d'autre informations. Les données ne sont pas lisibles à ce stade
        return res.json()// On parse le body afin qu'il soit lisible par notre code
        }
     )
} */

/**
 * Implémentation des données dans la page
 */
// Méthode 1 avec createElement
const productsDisplay = async () => {
    productsAvailable = await fetchProducts()
    let newProduct = document.getElementById("items")

    for (i = 0; i < productsAvailable.length; i++){

        let a = document.createElement("a")
        newProduct.appendChild(a).href = `product.html?id=${productsAvailable[i]._id}`

        let article = document.createElement("article")
        a.appendChild(article)

        let img = document.createElement("img")
        article.appendChild(img).src = productsAvailable[i].imageUrl
        article.appendChild(img).alt = productsAvailable[i].altTxt

        let h3 = document.createElement("h3")
        article.appendChild(h3).classList.add("productName")
        h3.innerText = productsAvailable[i].name

        let p = document.createElement("p")
        article.appendChild(p).classList.add("productDescription")
        p.innerText = productsAvailable[i].description
        
        }
    }

productsDisplay()

// Méthode 1 avec innerHTML
/* const productsDisplay = async () => {
    productsAvailable = await fetchProducts() //--Informe productsDisplay qu'elle doit attendre la fin de fetchProducts

    document.getElementById("items").innerHTML = productsAvailable.map((products) => `
        <a href="product.html?id=${products._id}">
            <article>
                <img src="${products.imageUrl}" alt="${products.altTxt}">
                <h3 class="productName">${products.name}</h3>
                <p class="productDescription">${products.description}</p>
            </article>
        </a>`
    )
    .join("")/*Permet de supprimer l'apostrophe automatique*/
//--}
//--productsDisplay()