//--Utilisation de l'interface URLSearchParams qui permet de travailler avec l'URL de la page active
const urlSearchParams = new URLSearchParams(window.location.search)
console.log("Récupération de l'URL de la page :", urlSearchParams)

//--Récupération de l'id du produit
const idProduct = urlSearchParams.get("id");
console.log("L'id du produit est :", idProduct);

/**
 * 
 * @returns Informations du panier : Quantité affichée à côté du mot panier dans le Header au moment de l'ouverture de la page
 */

const updateNumberProductInCart = () => {
    
    window.addEventListener("DOMContentLoaded", () => {
        console.log("DOM entièrement chargé et analysé");

//--Récupération du panier
    let productsInCart = JSON.parse(localStorage.getItem("cart"))
    console.log("Que contient le panier ?", productsInCart)
    let numberProductInCart = 0

//--S'il est vide, on l'affiche
    if (productsInCart == null){
        let displayUpdateCart = () => {
            let sectionCart = document.getElementsByTagName("ul")[1];
            let updateInfoCart = document.createElement("p");
            sectionCart.appendChild(updateInfoCart);
            updateInfoCart.innerText = ": vide";
            }
            displayUpdateCart()
    }
//--S'il contient des produits, on compte leur nombre
    else {
            for (i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].color != "" && productsInCart[i].quantity > 0) {
                numberProductInCart = parseInt(numberProductInCart) + parseInt(productsInCart[i].quantity)
            }
        }
//--Et on l'affiche à côté du mot panier
        let displayUpdateCart = () => {
            let sectionCart = document.getElementsByTagName("ul")[1];
            let updateInfoCart = document.createElement("p");
            sectionCart.appendChild(updateInfoCart);
            updateInfoCart.innerHTML = `: ${numberProductInCart} canapé(s)`;
            }
            displayUpdateCart()
        }
});

}
/**
 * 
 * @returns Appel des données liées au produits de la page actuelle
 */
//--Méthode 1
  const fetchProduct = async () => {
    const res = await fetch(`https://site-de-vente-de-canape-back.herokuapp.com/api/products/${idProduct}`)
    const dataProduct = await res.json()
    console.log("Données liées au produit de cette page :", dataProduct)
    return dataProduct
    }

//--Méthode 2
/*    const fetchProduct = () => {
        return fetch(`https://site-de-vente-de-canape-back.herokuapp.com/api/products/${idProduct}`)//  Requête fetch GET pour récupérer les données d'un canapé dans l'api selon son id
        .then(res => {//  Réponse de l'api, contient le status ainsi que d'autre informations. Les données ne sont pas lisibles à ce stade
        return res.json()// On parse le body afin qu'il soit lisible par notre code
        }
     )
} */

/**
 * 
 * @returns Affichage des détails du produit
 */
const displayPageProduct = async () => {
    dataProduct = await fetchProduct()

    let imgProduct = document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${dataProduct.imageUrl}">`
    let titleProduct = document.querySelector("h1").innerText = `${dataProduct.name}`
    let priceProduct = document.getElementById("price").innerText = `${dataProduct.price}`
    let descriptionProduct = document.getElementById("description").innerText = `${dataProduct.description}`

//--Optionnel--Voir dans la console le nombre de couleur possible
    console.log("Nombre de couleur possible pour ce canapé :",dataProduct.colors.length)

//Boucle de création des choix de couleurs
    for (let i = 0; i < dataProduct.colors.length; i++){
        let optionColors = document.createElement("option");
        let sectionColors = document.getElementById("colors");
        sectionColors.appendChild(optionColors);
        optionColors.innerText = `${dataProduct.colors[i]}`
        optionColors.value = `${dataProduct.colors[i]}`
    }
}

//--Déclaration des constantes d'alertes si aucune couleur et/ou quantité n'a été saisie
let alertColor = document.createElement("p")
let displayAlertColor = document.getElementsByClassName("item__content__settings__color")[0]
let alertQuantity = document.createElement("p")
let displayAlertQuantity = document.getElementsByClassName("item__content__settings__quantity")[0]

//*****************Ecoute du click sur Ajouter au panier
window.onload=function(){
    document.getElementById("addToCart").addEventListener("click", addToCart)
  }

/**
 * 
 * @returns Déclaration de la fonction de remplissage du panier
 */

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM entièrement chargé et analysé");

function addToCart() {//addToCart

//--Récupération des données de la page produit pour les envoyers dans le panier s'il n'y est pas déjà
    let newProduct = {
    _id : dataProduct._id, 
    color : document.getElementById("colors").value, 
    quantity : parseInt(document.getElementById("quantity").value),
    image : dataProduct.imageUrl,
    alt : dataProduct.altTxt,
    name : dataProduct.name,
    }

/**
 * 
 * @returns Si la couleur ou la quantité n'est pas choisie, le client est avertit
 */
    function alertsColor () {

        if (newProduct.color === ""){
            const colorMessageSvp = document.getElementById("colors")
            colorMessageSvp.style.backgroundColor = "red"
            colorMessageSvp.style.color = "white"
            displayAlertColor.appendChild(alertColor).innerHTML = "X Veuillez sélectionner une couleur X"
            alertColor.style.color = "red"
            alertColor.style.backgroundColor = "#FFE4E1"
            alertColor.style.borderRadius = "20px"
            alertColor.style.padding = "2px 6px 2px 6px"
            alertColor.style.textAlign = "center"

        }
        else if (newProduct.color != "" && displayAlertColor.getElementsByTagName("p").length != 0) {
            const colorMessageSvp = document.getElementById("colors")
            colorMessageSvp.removeAttribute("style")
            displayAlertColor.removeChild(alertColor)
        }
    }

/**
 * 
 * @returns Prévenir l'utilisateur pour saisie d'une quantité non comprise entre 1 et 100
 */
    function alertsQuantity () {

        if (newProduct.quantity === 0 || newProduct.quantity > 100 || newProduct.quantity < 0){
            const colorErrorQuantity = document.getElementById("quantity")
            colorErrorQuantity.style.backgroundColor = "red"
            colorErrorQuantity.style.color = "white"
            displayAlertQuantity.appendChild(alertQuantity).innerHTML = "X Veuillez sélectionner une quantité comprise entre 1 et 100 X"
            alertQuantity.style.color = "red"
            alertQuantity.style.backgroundColor = "#FFE4E1"
            alertQuantity.style.borderRadius = "20px"
            alertQuantity.style.padding = "2px 6px 2px 6px"
            alertQuantity.style.textAlign = "center"
        }
        else if (newProduct.quantity != 0 && displayAlertQuantity.getElementsByTagName("p").length != 0) {
            const colorErrorQuantity = document.getElementById("quantity")
            colorErrorQuantity.removeAttribute("style")
            displayAlertQuantity.removeChild(alertQuantity)
        }
    }
    alertsColor()
    alertsQuantity()

//--Récupérer le contenu du panier
    let productsInCart = JSON.parse(localStorage.getItem("cart"))
    console.log(productsInCart)
//---Premier produit dans le panier s'il n'y en a pas déjà un
    if (productsInCart === null && newProduct.color !== "" && newProduct.quantity > 0) {
        productsInCart = []
        productsInCart.push(newProduct)
        localStorage.setItem("cart", JSON.stringify(productsInCart))

//--Affichage pendant deux seconde de l'information 'Effecué !' après mise à jour du panier
        document.getElementById("colors").removeAttribute("style")
        document.getElementById("colors").value = ""
        document.getElementById("quantity").value = 1
        let infoCard = document.createElement("p")
        let confirmInfoCard = document.getElementById("addToCart")
        confirmInfoCard.appendChild(infoCard).innerText = "Effectué !"
        setTimeout(function() {confirmInfoCard.removeChild(infoCard)},1000)
    }

//--Si le panier contient un produit identique (même id et même couleur)
//--Et qu'une couleur et une quantité ont été sélectionnées sur la page courante
//--On ajoute sa quantité à celle du panier
    else if ((productsInCart.some(product => product._id === newProduct._id && product.color === newProduct.color) 
                && newProduct.color !== "" && newProduct.quantity != 0 && newProduct.quantity > 0 && newProduct.quantity < 101)){

            console.log("Ce canapé est déjà dans le panier, sa quantité vient d'être mise à jour")
            productsInCart.map(product => {
                if (product._id === newProduct._id && product.color === newProduct.color) {
                    if ((parseInt(newProduct.quantity) + parseInt(product.quantity)) > 100){
                        document.getElementById("quantity").style.backgroundColor = "red"
                        displayAlertQuantity.appendChild(alertQuantity).innerHTML = 
                        `X Veuillez sélectionner une quantité maximum de ${100 - parseInt(product.quantity)} articles pour ne pas dépasser la limite de 100 exemplaires X`
                        alertQuantity.style.color = "red"
                        alertQuantity.style.backgroundColor = "black"
                        alertQuantity.style.borderRadius = "20px"
                        alertQuantity.style.padding = "2px 6px 2px 6px"
                        alertQuantity.style.textAlign = "center"
                    }
                    if (parseInt(product.quantity) == 100){
                        document.getElementById("quantity").style.backgroundColor = "red"
                        displayAlertQuantity.appendChild(alertQuantity).innerHTML = 
                        `X Votre panier contient déjà la quantité maximale pour ce modèle X`
                        alertQuantity.style.color = "red"
                        alertQuantity.style.backgroundColor = "black"
                        alertQuantity.style.borderRadius = "20px"
                        alertQuantity.style.padding = "2px 6px 2px 6px"
                        alertQuantity.style.textAlign = "center"
                    }
                    if ((parseInt(newProduct.quantity) + parseInt(product.quantity)) < 101){
                        product.quantity = parseInt(newProduct.quantity) + parseInt(product.quantity)
                        localStorage.setItem("cart", JSON.stringify(productsInCart))
    
    //--Affichage pendant deux seconde de l'information 'Effecué !' après mise à jour du panier
                        document.getElementById("colors").removeAttribute("style")
                        document.getElementById("colors").value = ""
                        document.getElementById("quantity").value = 1
                        let infoCard = document.createElement("p")
                        let confirmInfoCard = document.getElementById("addToCart")
                        confirmInfoCard.appendChild(infoCard).innerText = "Effectué !"
                        setTimeout(function() {confirmInfoCard.removeChild(infoCard)},1000)
                    }             
                    return product
                }

            }
        )
    }
//--Si le produit est nouveau, on l'ajoute
        else {
            if (newProduct.color != "" && newProduct.quantity != 0 && newProduct.quantity > 0 && newProduct.quantity < 101){
                productsInCart = [...productsInCart, newProduct]
                localStorage.setItem("cart", JSON.stringify(productsInCart))
        
        //--Affichage pendant deux seconde de l'information 'Effecué !' après mise à jour du panier
                document.getElementById("colors").removeAttribute("style")
                document.getElementById("colors").value = ""
                document.getElementById("quantity").value = 1
                let infoCard = document.createElement("p")
                let confirmInfoCard = document.getElementById("addToCart")
                confirmInfoCard.appendChild(infoCard).innerText = "Effectué !"
                setTimeout(function() {confirmInfoCard.removeChild(infoCard)},1000)
            }
    }
    
/**
 * 
 * @returns Mise à jour des informations du panier : Quantité affichée à côté du mot panier dans le Header
 */
    const updateNumberProductInCartAfterClick = () => {

        let productsInCart = JSON.parse(localStorage.getItem("cart"))
        let numberProductInCart = 0
        
        if (productsInCart == null){
            let displayUpdateCart = () => {
                let sectionCart = document.getElementsByTagName("ul")[1]
                let updateInfoCart = document.createElement("p")
                console.log(updateInfoCart)
                sectionCart.appendChild(updateInfoCart)
                updateInfoCart.innerText = ": vide"
                }
                displayUpdateCart()
        }
        else for (i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].color != "" && productsInCart[i].quantity > 0) {
                numberProductInCart = parseInt(numberProductInCart) + parseInt(productsInCart[i].quantity)
            }
        }
    //--Affichage du nombre de canapés dans le panier au moment de l'ouverture de la page
        let displayUpdateCart = () => {
            let updateInfoCart = document.getElementsByTagName("p")[0]
            updateInfoCart.innerText = `: ${numberProductInCart} canapés`
            console.log("Maintenant, le panier contient :" ,numberProductInCart, "canapés")
            }
            displayUpdateCart()
        }
        updateNumberProductInCartAfterClick()
}
});

updateNumberProductInCart()
displayPageProduct()
