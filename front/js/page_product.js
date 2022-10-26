//ajout de redirection si mauvais url
// controle si les article



//Recuperation id produit dans l'url
let adresseId = new URLSearchParams(document.location.search);
const objectId = adresseId.get("id"); 
                                                                            //console.log('%c Item ID', 'color: lime; font-weight: bold');
                                                                            //console.log(objectId);

//Recuperation des informations auprès de l'API et construction du DOM

let afficherProduit = () => {
    fetch ('http://localhost:3000/api/products/' + objectId)
    .then (res => res.json())
    .then ((product) => {
                                                                            //console.log('%c Info Produit', 'color: green; font-weight: bold');
                                                                            //console.table(product);
            
            document.querySelector('.item__img').innerHTML = '<img src="'
                + product.imageUrl
                + '" alt="'
                + product.altTxt
                + '">';                                                                 //Affichage image
            document.querySelector('#title').innerHTML = product.name;                  //Affichage nom produit
            document.querySelector('#price').innerHTML = product.price;                 //Affichage prix
            document.querySelector('#description').innerHTML = product.description;     //Affichage description
            
            //Affichage couleur
            for (let i = 0; i < product.colors.length; i++) {
                const optionCouleur = '<option value="' + product.colors[i] + '">' + product.colors[i] + '</option>';
                                                                            //console.log(product.colors[i]);
                document.querySelector('#colors').innerHTML += optionCouleur;
            }
    });
};


//Bouton d'ajout au panier

let boutonPanier = document.querySelector('#addToCart');
boutonPanier.addEventListener('click', (event) => {
    let color = document.querySelector("#colors").value;
    if (color == "") {
        alert("Veuillez choisir une couleur afin de pouvoir valider votre panier.");
        event.preventDefault();
    } else {
        
        // Mise en place des différentes variables
        let quantityPanier = document.querySelector('#quantity').value;
        let valeurQuantity = Number(quantityPanier);
        let productId = objectId;
        let name = document.querySelector("#title").textContent;
        let color = document.querySelector("#colors").value;
        
        //Création de l'objet Panier
        let produitPanier = {
            name, 
            productId,
            price: Number(document.querySelector('#price').textContent),
            valeurQuantity,
            color,
            imageUrl: document.querySelector('.item__img > img').src,
            description: document.querySelector('#description').textContent,
        };
                                                                            //console.log('%c--------------Ajout Panier--------------', 'color: red; font-weight: bold;');
                                                                            //console.table(produitPanier)
        
        let panier = JSON.parse(localStorage.getItem('produit'));
        //Création du panier si aucun pnaier présent dans le local storage.
        let boucle = false;
        if (!panier) {
            panier = [];
            panier.push(produitPanier);
            localStorage.setItem('produit', JSON.stringify(panier));
        }
        
        else {
            //Pour scanner le panier et ajouter si même article et même couleur
            for (let i = 0; i < panier.length; i++) {
                if (panier[i].productId === productId && panier[i].color === color) {
                    panier[i].valeurQuantity += valeurQuantity;
                    boucle = true;
                    break;
                }
            }
            //Si nouvel article envoi du nouvel objet car boucle = 0 par default
            if (boucle == false) {
                panier.push(produitPanier);
            }
            localStorage.setItem('produit', JSON.stringify(panier));
        }
        
        //Message d'alerte pour éviter l'ajout accidentel
        if (valeurQuantity > 1)             alert('Félicitation ! Vous avez ajouté ' + valeurQuantity  + ' articles au panier !');
        else if (valeurQuantity == 1)       alert('Félicitation ! Vous avez ajouté un article au panier !');
        
    }
});

afficherProduit();