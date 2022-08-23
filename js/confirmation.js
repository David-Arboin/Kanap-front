/**
 * 
 * @returns Fonction unique de la page confirmation - Chaque bloc est expliqué
 */
function order () {

//--Utilisation de l'interface URLSearchParams qui permet de travailler avec l'URL de la page active
const urlSearchParams = new URLSearchParams(window.location.search);
console.log("Récupération de l'URL de la page :", urlSearchParams);

//--Récupérartion de l'id du produit
const orderId = urlSearchParams.get("orderID");
console.log("L'id de la commande renvoyée par le server est :", orderId);

//--Affichage de l'id de la commande renvoyée par le server
const displayOrderId = document.getElementById("orderId")
displayOrderId.innerText = orderId

//--Affichage d'un message de remerciement
const thanks = document.createElement("p")
displayOrderId.appendChild(thanks).innerHTML = "Merci et à bientôt !"

//--Suppression du panier et des données de la commande
localStorage.clear()
}
order()