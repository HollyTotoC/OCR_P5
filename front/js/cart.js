let panier = JSON.parse(localStorage.getItem("produit"));
console.table(panier);

//AFFICHAGE HTML
let afficherPanier = () => {
    // Si le panier est vide
    if (panier === null || panier.length == 0) {
        document.querySelector("#cartAndFormContainer > h1").textContent += " se sent seul !";
    } else {
    // Si le panier contient des articles
        for (let i = 0; i < panier.length; i++) {
            document.querySelector('#cart__items').innerHTML += '<article class="cart__item" data-id="'
                + panier[i].idProduct
                + '"><div class="cart__item__img"> <img src="'
                + panier[i].imageUrl
                + '" alt="'
                + panier[i].description
                + '" /></div><div class="cart__item__content"><div class="cart__item__content__titlePrice"><h2>'
                + panier[i].name
                + '</h2><p>'
                + panier[i].price
                + '</p><p>Couleur: '
                + panier[i].color
                + '</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté :</p><input index="'
                + [i]
                + '" onchange="recupererQuantity(this)" id="cartQty" type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="'
                + panier[i].valeurQuantity
                + '" /></div><div class="cart__item__content__settings__delete"><p index="'
                + [i]
                + '" onclick="supprimerArticle(this)" class="deleteItem">Supprimer</p></div></div></div></article>'
        }
    }
}

//Affichage Total et Quantity
let total = () => {
    let prixTotal = 0;
    let totalQuantity = 0;
    
    //Calcul du prix
    if (!panier) {      //si le panier est vide
        panier = [];
        document.querySelector('#totalPrice').innerHTML =+ '0' 
    }
    else {              //si le panier contient des articles
        for (let i = 0; i < panier.length; i++) {
            let quantity = parseInt(panier[i].valeurQuantity)
            let prix = parseInt(panier[i].price)
            prixTotal += prix * quantity;
        }
    }
    document.querySelector('#totalPrice').innerHTML = prixTotal + ',00'
    
    //Calcul de la quantité&
    for (let i = 0; i < panier.length; i++) {
        let quantity = parseInt(panier[i].valeurQuantity);
        totalQuantity += quantity;
    }
    document.querySelector('#totalQuantity').innerHTML = totalQuantity
};
    
//Fonction de suppression d'article
//i = this dans le code HTML injecté plus haut
let supprimerArticle = (i) => {
    let index = i.getAttribute('index');
    alert('Vous venez de supprimer ' + panier[index].name + ' de couleur ' + panier[index].color + ' de votre panier !');
    panier.splice(index, 1);
    localStorage.setItem('produit', JSON.stringify(panier));
    location.reload();
}

//Fonction pour récupérer les MaJ de quantitée 
let recupererQuantity = (i) => {
    let index = i.getAttribute('index');
    let nouvelleQuantity = i.value;
    panier[index].valeurQuantity = nouvelleQuantity;
    console.log('%c Quantité mise a jour', 'color: lime' )
    
    //cas 0
    if (nouvelleQuantity == 0) {
        supprimerArticle(i);
    } 
    //cas valeur ppositive
    else {
        total();
        localStorage.setItem('produit', JSON.stringify(panier));
    }
    
}; 

let formulaire = document.querySelector('.cart__order__form');
let submit = document.querySelector('#order');
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName')
let adress = document.querySelector('#adress');
let city = document.querySelector('#city');
let email = document.querySelector('#email');


order.addEventListener('click', (event) => {
    event.preventDefault();
    //Si tout ok

    //on récupère les ID en array
    let products = () => {
        let productsArray = [];
        for (let i = 0; i < panier.length; i++) {
            idProduit = panier[i].productID;
            productsArray.push(idProduit); 
        }
        return productsArray;
    }

    console.log('Array fonction OK');

    //on définit l'objet commande
    let order = {
        contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email:email.value,
        },
        products: products(),
    };

    //on gere l'envoi requete creation + envoi
/*
    let requete = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
    };
*/    
});


//Running function
    afficherPanier();
    total();
