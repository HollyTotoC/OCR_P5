//Chargement des produits et affichage sur la page d'accueil
let afficherProduits = async function () {
    await fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then ((product) => {
        
                                                                            //console.log('%c Info Produit', 'color: lime; font-weight: bold');
                                                                            //console.table(product); //vérification console de ce qui est renvoyé
                                                                            //console.log(product[3].name); //vérification de l'item 3
        
        let ancreProduits = document.querySelector('#items');               //selection de l'id où insérer le catalogue
        
                                                                            //console.log('%c Chargement', 'color: lime; font-weight: bold');
        for (let i = 0; i < product.length; i++) {
            //Affichage des produits dans le DOM
            const ficheProduit = '<a href="./product.html?id='
                + product[i]._id 
                + '"><article><img src="'
                + product[i].imageUrl
                + '" alt="' 
                + product[i].altTxt
                +'" /><h3 class="productName">'
                + product[i].name + '</h3><p class="productDescription">'
                + product[i].description
                + '</p></article></a>';
            let print = [i + 1] + '/' + product.length;
            ancreProduits.innerHTML += ficheProduit;
                }
            });
        };
        
afficherProduits();