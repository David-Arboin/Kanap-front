let productsInCart = JSON.parse(localStorage.getItem("cart"))

/**
 * 
 * @returns Récupération des prix associés aux ids de produits
 */
function recoveryIdProduct () {

    window.addEventListener("DOMContentLoaded", (event) => {
        console.log("DOM entièrement chargé et analysé");

    if (productsInCart == null) {

    let displayPrice = document.getElementById("totalPrice")
    displayPrice.innerText = `0`
    console.log("Prix total au moment de l'ouverture de la page : 0 €")

    let totalQuantity = document.getElementById("totalQuantity")
    totalQuantity.innerText = `0`
    console.log("Nombre d'articles au moment de l'ouverture de la page : 0")
}
else {
    const fetchProduct = productsInCart.map(product => {
        return fetch(`https://site-de-vente-de-canape-back.herokuapp.com/api/products/${product._id}`)
    })

    let productsInCartWithPrice = Promise.all(fetchProduct)
.then((res) => {
    Promise.all(res.map(res => res.json()))
    .then(data => {
        console.log(data)

        productsInCart = productsInCart.map(product => {
            const find = data.find(value => {
                return value._id === product._id
            })
            const price = find.price
            product.price = price
            return product
        })

        panierDisplay()
        displayTotalPrice ()
        newTotalByNewQuantityByArrow()
        removeProduct()
            }
        )
    }
)
}
});
}
recoveryIdProduct()


/**
 * 
 * @returns Affichage dynamique des canapés sélectionnés
 */
function panierDisplay () {

    if (productsInCart == null) {
        let displayPrice = document.getElementById("totalPrice")
        displayPrice.innerText = `0`
        console.log("Prix total au moment de l'ouverture de la page : 0 €")

        let totalQuantity = document.getElementById("totalQuantity")
        totalQuantity.innerText = `0`
        console.log("Nombre d'articles au moment de l'ouverture de la page : 0")
    }
    else {

//--Affichage de chaque produit tour à tour
/* //--Méthode 2 avec innerHTML
    document.getElementById("cart__items").innerHTML = productsInCart.map((product) => (
    `
        <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
            <div class="cart__item__img">
                <img src="${product.image}" alt="${product.alt}">
            </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${product.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
    )
    ).join("") */
 

//--Méthode 1 avec createElement

    let getId = document.getElementById("cart__items")

    for (i = 0; i < productsInCart.length; i++){

        let article = document.createElement("article")
        article.classList.add("cart__item")
        article.dataset.id = productsInCart[i]._id
        article.dataset.color = productsInCart[i].color

        getId.appendChild(article)

        let divImg = document.createElement("div")
        divImg.classList.add("cart__item__img")
        article.appendChild(divImg)

        let img = document.createElement("img")
        divImg.appendChild(img).src = productsInCart[i].image
        divImg.appendChild(img).alt = productsInCart[i].alt
        divImg.appendChild(img)


        let divContent = document.createElement("div")
        divContent.classList.add("cart__item__content")
        article.appendChild(divContent)

        let divDescription = document.createElement("div")
        divDescription.classList.add("cart__item__content__description")
        divContent.appendChild(divDescription)

        let h2 = document.createElement("h2")
        h2.innerText = productsInCart[i].name
        divDescription.appendChild(h2)

        let pColor = document.createElement("p")
        pColor.innerText = productsInCart[i].color
        divDescription.appendChild(pColor)

        let pPrice = document.createElement("p")
        pPrice.innerText = productsInCart[i].price
        divDescription.appendChild(pPrice)

        let divSettings = document.createElement("div")
        divSettings.classList.add("cart__item__content__settings")
        divContent.appendChild(divSettings)

        let divQuantity = document.createElement("div")
        divQuantity.classList.add("cart__item__content__settings__quantity")
        divSettings.appendChild(divQuantity)

        let pQuantity = document.createElement("p")
        pQuantity.innerText = `Qté : `
        divQuantity.appendChild(pQuantity)

        let inputQuantity = document.createElement("input")
        inputQuantity.type = "number"
        inputQuantity.classList.add("itemQuantity")
        inputQuantity.name = "itemQuantity"
        inputQuantity.min = 1
        inputQuantity.max = 100
        inputQuantity.value = `${productsInCart[i].quantity}`
        divQuantity.appendChild(inputQuantity)

        let divDelete = document.createElement("div")
        divDelete.classList.add("cart__item__content__settings__delete")
        divSettings.appendChild(divDelete)

        let pDelete = document.createElement("p")
        pDelete.classList.add("deleteItem")
        pDelete.innerText = "Supprimer"
        divDelete.appendChild(pDelete)
        }
        console.log(getId)
    }

}

//****************Affichage et calcul du nombre d'aricles et du prix total lors de l'ouverture de la page
let totalPriceByProduct = 0
let totalPrice = 0
let totalCopyByProduct = 0
let totalProducts = 0

/**
 * A
 * @returns ffichage et calcul du nombre d'aricles et du prix total lors de l'ouverture de la page
 */
function displayTotalPrice () {

    if (productsInCart !== null) {
        for (k = 0; k < productsInCart.length; k++) {
            if (productsInCart[k].color != "" && productsInCart[k].quantity > 0) {
                totalPriceByProduct = parseInt(productsInCart[k].price) * parseInt(productsInCart[k].quantity)
                totalPrice = totalPrice + totalPriceByProduct
                totalCopyByProduct = 1 * parseInt(productsInCart[k].quantity)
                totalProducts = totalProducts + totalCopyByProduct
             }
        }
            let displayPrice = document.getElementById("totalPrice")
            displayPrice.innerText = `${totalPrice}`
            console.log("Prix total au moment de l'ouverture de la page :", totalPrice, "€")
    
            let totalQuantity = document.getElementById("totalQuantity")
            totalQuantity.innerText = `${totalProducts}`
            console.log("Nombre d'articles au moment de l'ouverture de la page :", totalProducts)
    }
}

/**
 * 
 * @returns Mise à jour du nombre d'article et du prix total lors de la saisie d'une nouvelle quantité depuis les petites flèches
 */ 
const newTotalByNewQuantityByArrow = () => {


//--Récupérartion de toutes les quantités
    let newQuantities = document.querySelectorAll(".itemQuantity")
    console.log("Liste des boutons 'quantités' :", newQuantities)

//--Ecoute du clik
    newQuantities.forEach((newQuantity) => {newQuantity.addEventListener("change",() => {
        
        let retrieveNewQuantity = newQuantity.value
        console.log("Une nouvelle quantité vient d'être saisie :", retrieveNewQuantity)

//--Avertir le client si la quantité saisie n'est pas comprise entre 0 et 100
        if (newQuantity.value < 1 || newQuantity.value > 100){
            let alertQuantityEqualZero = document.createElement("p")
            let text = newQuantity.closest("div").appendChild(alertQuantityEqualZero)
            let addText = text.innerHTML = " " + "X Veuillez saisir une quantité conprise enre 0 et 100 X"
            alertQuantityEqualZero.style.color = "red"
            alertQuantityEqualZero.style.marginLeft = "15px"
            alertQuantityEqualZero.style.backgroundColor = "black"
            alertQuantityEqualZero.style.borderRadius = "20px"
            alertQuantityEqualZero.style.padding = "2px 6px 2px 6px"
            alertQuantityEqualZero.style.textAlign = "center"

            if (newQuantity.closest("div").getElementsByTagName("p").length > 2) {
                let retieveTextAlert = newQuantity.closest("div").lastChild
                newQuantity.closest("div").removeChild(retieveTextAlert)
            
        }}
        else {
            if (newQuantity.value > 0 && newQuantity.closest("div").getElementsByTagName("p").length > 1) {
            let retieveTextAlert = newQuantity.closest("div").lastChild
            console.log(retieveTextAlert)
            newQuantity.closest("div").removeChild(retieveTextAlert)
        }

//--Récupérartion des données liées au produit
        let retrieveProductToNewQuantity = newQuantity.closest("article")

//--Récupérartion du nom du produit
        let retrieveNameProductToNewQuantity = retrieveProductToNewQuantity.querySelector("h2").innerText
        console.log("Elle concerne le canapé :", retrieveNameProductToNewQuantity)

//--Récupérartion de la couleur du produit
        let retrieveColorProductToNewQuantity = retrieveProductToNewQuantity.querySelector("p").innerText
        console.log("De couleur :", retrieveColorProductToNewQuantity)

//--Récupération du produit dans le panier
    let productWhithNewQuantity = () => {
        for (l = 0; l < productsInCart.length; l++) {
            if (productsInCart[l].name == retrieveNameProductToNewQuantity && productsInCart[l].color == retrieveColorProductToNewQuantity) {
                productsInCart[l].quantity = parseInt(retrieveNewQuantity)
            }
        }
    }
    productWhithNewQuantity()

    //--Recalcul du prix total du panier
    let totalPriceByProduct = 0
    let totalPrice = 0
    let totalQuantityByProduct = 0
    let totalQuantity = 0

    let displayTotalPrice = () => {
        for (m = 0; m < productsInCart.length; m++) {
            if (productsInCart[m].color != "" && productsInCart[m].quantity > 0) {
                totalPriceByProduct = parseInt(productsInCart[m].price) * parseInt(productsInCart[m].quantity)
                totalPrice = totalPrice + totalPriceByProduct

                totalQuantityByProduct = parseInt(productsInCart[m].quantity)
                totalQuantity = totalQuantity + totalQuantityByProduct
            }
        }
    //--Affichage dynamique du prix total
        let displayNewTotalPrice = document.getElementById("totalPrice")
        displayNewTotalPrice.innerText = `${totalPrice}`
        console.log("Mise à jour du prix total :", totalPrice, "€")

    //--Affichage dynamique de la quantité totale d'article
        let displayNewTotalQuantity = document.getElementById("totalQuantity")
        displayNewTotalQuantity.innerText = `${totalQuantity}`
        console.log("Mise à jour du nombre total d'article dans le panier :", totalQuantity)
        }
    displayTotalPrice()
        localStorage.setItem("cart", JSON.stringify(productsInCart))

                }}
            )
        }
    )
}

/**
 * 
 * @returns Suppression d'un produit
 */ 
const removeProduct = () => {
//--Récupération des données du panier
/*     let productsInCart = JSON.parse(localStorage.getItem("cart")) */
console.log(productsInCart)

//--Récupération de tous les boutons supprimmer
    let trashs = document.querySelectorAll(".deleteItem")
    console.log("Liste des boutons 'Supprimer'", trashs)

//--Ecoute du clik sur Supprimer
    trashs.forEach((trash) => {trash.addEventListener("click",() => {

//--Récupération des données liées au produit à supprimer
        let retrieveProductToRemove = trash.closest("article")
        const id = retrieveProductToRemove.dataset.id
        const color = retrieveProductToRemove.dataset.color

//--Nombre de produit dans le panier
        let totalAddProductRemove = productsInCart.length

//--Si le panier ne contient qu'un produit, on le vide
        if(totalAddProductRemove == 1){
            let confirmRemouveCart = confirm("Souhaitez-vous vider le panier ?")
            if (confirmRemouveCart) {
            localStorage.clear()
            retrieveProductToRemove.remove(1)

            let displayNewTotalPrice = document.getElementById("totalPrice")
            displayNewTotalPrice.innerText = `0`
            console.log("Mise à jour du prix total : 0 €")

            let displayNewTotalQuantity = document.getElementById("totalQuantity")
            displayNewTotalQuantity.innerText = `0`
            console.log("Mise à jour du nombre total d'article dans le panier : 0")
            }
        }
//--On conserve les produits du panier non supprimés
        else {
            productsInCart = productsInCart.filter(el => {
            if (id != el._id || color != el.color) {
                return true
                    }
                }
            )
            console.log(productsInCart)
//--Prévenir de la suppression du produit
            let confirmAction = confirm("Souhaitez-vous retirer ce produit du panier ?")

//--Si le client confirme
            if (confirmAction) {

//--Suppression du produit dans le local storage
                const productPriceLess = productsInCart.map( product => {
                    return {
                        _id : product._id, 
                        color : product.color, 
                        quantity : product.quantity,
                        image : product.image,
                        alt : product.altTxt,
                        name : product.name,
                        }
                })
                console.log(productPriceLess)
                localStorage.setItem("cart", JSON.stringify(productPriceLess))
                
//-- Suppression du produit sur la page
                retrieveProductToRemove.remove(1)

//--Mise à jour du nombre d'article et du prix total
//--On rapelle le local storage à jour

                let newTotalQuantity = 0
                let priceByProduct = 0
                let newTotalPrice = 0

                for (n = 0; n < productsInCart.length; n++) {
                    newTotalQuantity += parseInt(productsInCart[n].quantity)
                    priceByProduct = parseInt(productsInCart[n].quantity) * parseInt(productsInCart[n].price)
                    newTotalPrice = priceByProduct + newTotalPrice
                }
                console.log({newTotalQuantity, newTotalPrice, priceByProduct})
                let displayNewTotalPrice = document.getElementById("totalPrice")
                displayNewTotalPrice.innerText = `${newTotalPrice}`
                console.log("Mise à jour du prix total :", newTotalPrice, "€")

                let displayNewTotalQuantity = document.getElementById("totalQuantity")
                displayNewTotalQuantity.innerText = `${newTotalQuantity}`
                console.log("Mise à jour du nombre total d'article dans le panier :", newTotalQuantity)
                        }
                    }
                } 
            )
        }
    )
}


//*****************Formulaire

/**
 * @returns Contrôle de validité du prénom
 */
function firstNameCheck() {
    window.onload=function(){
    const firstName = document.getElementById("firstName")
        if(/^[A-Za-z\-\ë]{3,20}$/.test(firstName.value)){
            document.getElementById("firstNameErrorMsg").innerHTML = ""//--Permet de retirer le message d'erreur
            let firstNameValidated = firstName.value
            return true
        }
        else {
            return false
                }
            }
            }


/**
 * 
 * @returns Contrôle de validité du nom
 */
function lastNameCheck() {
    const lastName = document.getElementById("lastName")
        if(/^[A-Za-z\-\ë]{3,20}$/.test(lastName.value)){
            document.getElementById("lastNameErrorMsg").innerHTML = ""
            return true
        }
        else {
            return false
                }
            }

    
/**
 * 
 * @returns Contrôle de validité de l'adresse
 */
function addressCheck() {
    const address = document.getElementById("address")
        if(/.{3,}$/g.test(address.value)){
            document.getElementById("addressErrorMsg").innerHTML = ""
            return true
        }
        else {
            return false
                }
            } 

/**
 * 
 * @returns Contrôle de validité de la ville
 */
function cityCheck() {
    const city = document.getElementById("city")
        if(/^[A-Za-z\-\ë]{3,20}$/.test(city.value)){
            document.getElementById("cityErrorMsg").innerHTML = ""
            return true
        }
        else {
            return false
                }
            }


/**
 * 
 * @returns Contrôle de validité de l'email
 */
function emailCheck() {
    const email = document.getElementById("email")
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value)){
            document.getElementById("emailErrorMsg").innerHTML = ""
            return true
        }
        else {
            return false
                }
            }


/**
 * 
 * @param {Conditions d'acceptation du formulaire} panierDisplay 
 */
const formValidateAndCheck = async (panierDisplay) => {
    await panierDisplay

    let form = document.getElementsByClassName("cart__order__form")[0]
    form.addEventListener("submit", (e) => {
        e.preventDefault()

//--Si toutes les données saisies dans le formulaire sont exactes (vérifiées par les RegExps ci-dessus)
        if(firstNameCheck() && lastNameCheck() && addressCheck() && cityCheck() && emailCheck()){

//Récupération des données saisies dans le formaulaire
            let firstName = document.getElementById("firstName").value
            const lastName = document.getElementById("lastName").value
            const address = document.getElementById("address").value
            const city = document.getElementById("city").value
            const email = document.getElementById("email").value

//--Récupération des ids produits
            const idProducts = JSON.parse(localStorage.getItem("cart"))
            if (idProducts === null) {
                console.log("Le panier est vide")

//--Affichage pendant deux seconde de l'information 'Impossible car votre panier est vide !'
        let infoOrder = document.createElement("p")
        let getInfoOrder = document.getElementsByClassName("cart__order__form")[0]
        getInfoOrder.appendChild(infoOrder).innerHTML = "Impossible car votre panier est vide !"
        infoOrder.style.textAlign = "center"
        infoOrder.style.color = "red"
        infoOrder.style.backgroundColor = "#FFE4E1"
        infoOrder.style.borderRadius = "20px"
        infoOrder.style.padding = "2px 6px 2px 6px"
        setTimeout(function() {getInfoOrder.removeChild(infoOrder)},1500)

            }
            else {       
            console.log("Contenu du panier :", idProducts)
                let products = []
                for (o = 0; o < idProducts.length; o++) {
                    if(products.includes(idProducts[o]._id) == false){
                        products.push(idProducts[o]._id)
                    }
                }
        console.log("Ids des produits à envoyer au server :", products)

//--Création du contact
            let contact = 
                {
                "firstName": firstName,
                "lastName": lastName,
                "address": address,
                "city": city,
                "email": email,
                }
            console.log("Fiche du contact :", contact)

//--Envoi de la commande sur le server
            const sendOrderToServer01 = fetch("https://site-de-vente-de-canape-back.herokuapp.com/api/products/order", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                    },
                body: JSON.stringify({contact, products})
                }
            )
            console.log(products)
//--Voir le résultat du server dans la console grâce à la promesse
        sendOrderToServer01.then(async(response)=> {
            try{
                const contain = await response.json()
                console.log("Réponse du server", contain)

                    if(response.ok){
                        console.log(`Résultat de response du server : ${response.ok}`)
                        
        //--Récupération de l'id de la réponse du server
                        console.log("id de la réponse du server :",contain.orderId)
                        console.log("Réponse produit du serveur :",contain.products)

        //--Redirection vers la page confirmation de la commande
                        window.location.href = `confirmation.html?orderID=${contain.orderId}`
                            }
                    else{
                        console.log(`Réponse du server : ${response.status} `)
                        alert(`Problème avec le serveru : erreur ${response.status} `)
                    }
                }
        //--Si la promesse n'est pas résolue, elle sera rejetée - Gestion des erreurs
            catch(e){
                console.log("ERREUR qui vient du catch()")
                console.log(e)
                alert(`ERREUR qui vient du catch() : ${e}`)
            }
        }
    )
}
}
//--Si une ou plusieurs données saisies dans le formulaire sont incorrectes, on avertit l'utilisateur
        else {
            if(firstNameCheck() != true) {
                document.getElementById("firstNameErrorMsg").innerHTML = "Les chiffres et les symboles ne sont pas autorisés \n Ne pas dépasser 20 caractères, minimum 3 caractères"
                }
            if(lastNameCheck() != true) {
                document.getElementById("lastNameErrorMsg").innerHTML = "Les chiffres et les symboles ne sont pas autorisés \n Ne pas dépasser 20 caractères, minimum 3 caractères"
                }
            if(addressCheck() != true) {
            document.getElementById("addressErrorMsg").innerHTML = "Minimum 3 caractères"
                }
            if(cityCheck() != true) {
            document.getElementById("cityErrorMsg").innerHTML = "Les chiffres et les symboles ne sont pas autorisés \n Ne pas dépasser 20 caractères, minimum 3 caractères"
                }
            if(emailCheck() != true) {
            document.getElementById("emailErrorMsg").innerHTML = "Ceci n'est pas une adresse mail valide"
                }
            }
        }
    )
}

firstNameCheck()
lastNameCheck()
addressCheck()
cityCheck()
emailCheck()
formValidateAndCheck()