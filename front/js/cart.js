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
                + '" data-color="' 
                + panier[i].color
                +'"><div class="cart__item__img"> <img src="'
                + panier[i].imageUrl
                + '" alt="'
                + panier[i].description
                + '"></div><div class="cart__item__content"><div class="cart__item__content__description"><h2>'
                + panier[i].name
                + '</h2><p>'
                + panier[i].color
                + '</p><p>'
                + panier[i].price
                + ',00 €</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté :</p><input index="'
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
    let Index = i.getAttribute('index');
    let nouvelleQuantity = i.value;
    panier[Index].valeurQuantity = nouvelleQuantity;
                                                                //console.log('%c Quantité mise a jour', 'color: lime' )
    
    //cas 0
    if (nouvelleQuantity == 0) {
        supprimerArticle(i);
    } 
    else if (nouvelleQuantity < 0) {
        alert("Veuillez choisir une quantitée valide");
        //document.querySelectorAll('input[index="'+Index+'"]').value = '"'+panier[Index].valeurQuantity+'"';
        location.reload();
    }
    else if (nouvelleQuantity > 100) {
        alert("Veuillez choisir une quantitée valide");
        //document.querySelectorAll('input[index="'+Index+'"]').value = '"'+panier[Index].valeurQuantity+'"';
        location.reload();
    }
    //cas valeur positive
    else {
        total();
        localStorage.setItem('produit', JSON.stringify(panier));
    }
    
}; 

let formulaire = document.querySelector('.cart__order__form');
let submit = document.querySelector('#order');
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName')
let address = document.querySelector('#address');
let city = document.querySelector('#city');
let email = document.querySelector('#email');

let emailExeption = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
let nameExeption = /^[a-zA-Zéêëèîïâäçù ,'-]{3,20}$/;
let addressExeption = /^[0-9]{1,3}[a-zA-Zéêëèîïâäçù ,'-]+$/;

//Verification Prénom
let verifFirstName = () => {
    let RegFirstName = nameExeption.test(firstName.value);
    if (RegFirstName == false) {
        firstName.nextElementSibling.innerHTML = `Ne peut contenir de chiffres ou caractères spéciaux.`;
        return false;
    } else {
        firstName.nextElementSibling.innerHTML = "";
        return true;
    }
}
firstName.addEventListener('input', () => {
    verifFirstName(firstName);
})

//Vérification Nom
let verifLastName = () => {
    let RegLastName = nameExeption.test(lastName.value);
    if (RegLastName == false) {
        lastName.nextElementSibling.innerHTML = `Ne peut contenir de chiffres ou caractères spéciaux.`;
        return false;
    } else {
        lastName.nextElementSibling.innerHTML = "";
        return true;
    }
}
lastName.addEventListener('input', () => {
    verifLastName(lastName);
})

//Vérification Adresse
let verifAddress = () => {
    let RegAddress = addressExeption.test(address.value);
    if (RegAddress == false) {
        address.nextElementSibling.innerHTML = `Veuillez saisir une adresse complète. Ne peut contenir de chiffres ou caractères spéciaux.`;
        return false;
    } else {
        address.nextElementSibling.innerHTML = "";
        return true;
    }
}
address.addEventListener('input', () => {
    verifAddress(address);
})

//Vérification Ville
let verifCity = () => {
    let RegCity = nameExeption.test(city.value);
    if (RegCity == false) {
        city.nextElementSibling.innerHTML = `Ne peut contenir de chiffres ou caractères spéciaux.`;
        return false;
    } else {
        city.nextElementSibling.innerHTML = "";
        return true;
    }
}
city.addEventListener('input', () => {
    verifCity(city);
})

//Vérification Nom
let verifEmail = () => {
    let RegEmail = emailExeption.test(email.value);
    if (RegEmail == false && email.value !='') {
        email.nextElementSibling.innerHTML = `Email invalide. Ne peut contenir de chiffres ou caractères spéciaux.`;
        return false;
    } else {
        email.nextElementSibling.innerHTML = "";
        return true;
    }
}
email.addEventListener('input', () => {
    verifEmail(email);
})




order.addEventListener('click', (event) => {
    event.preventDefault();
    //Si tout ok
    if (verifFirstName(firstName) && verifLastName(lastName) && verifAddress(address) && verifCity(city) && verifEmail(email)) {
        let idArray = [];
        //on définit l'objet commande
        let order = {
            contact: {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: idArray,
        };
        console.log(order);

        //on récupère les ID en array
        let products = () => {
            let productsArray = [];
            for (let i = 0; i < panier.length; i++) {
                if (idArray.find((e) => e == panier[i].productId)) {
                    console.log('erreur')
                } else {
                    idArray.push(panier[i].productId);
                }
            }; 
            jsonOrder = JSON.stringify(order);
            return jsonOrder;
        }
        let makeOrder = products();
        console.log(makeOrder);

        fetch ('http://localhost:3000/api/products/order', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: makeOrder,
        })
        .then((response) => response.json())
        .then((produit) => {
                localStorage.clear();
                let orderId = produit.orderId;
                window.location.assign(`confirmation.html?orderId=${orderId}`);
        })
        .catch((error) => {
            alert("Une erreur est survenue, merci de revenir plus tard.");
        })
    } else          alert('Attention, vous avez du commettre une erreur dans le formulaire de contact !)')
});


//Running function
    afficherPanier();
    total();
