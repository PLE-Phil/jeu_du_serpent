// Commente tout
document.addEventListener("DOMContentLoaded", function(event) {

    // Le jeu

    class Jeu{                                  // Cette classe va contenir toutes les caractéristiques que mon jeu peut avoir. La première lettre d'un objet, ici "Jeu" doit être en majuscule, c'est une convention dans la communauté DEV. C'est la définition d'objets, l'objet n'est pas créé.

        constructor(_idSvg, _idPointage){       // Benoît met des underscore pour différencier ses id de ses autres variables en paramètre.
            console.log("création du jeu");

            this.s = Snap(_idSvg);              //On met dans une variable le id du SVG grâce à snap.svg non pas dans une variable, mais dans une propriété s (snap).

            this.sortiPointage = document.querySelector(_idPointage);              // document.querySelector() permet de sélectionner un élément de la page html

            this.grandeurCarre = 20;                    // Donne un width et un height de 20px aux carré.
            this.grandeurGrille = 15;                   // C'est le nombre de carré dans la grille en largeur et en hauteur.

        }


        nouvellePartie(){                       // La nomenclature est similaire à une fonction, mais c'est une méthode, pas une fonction.

            this.affichagePointage(1);      // on met 1 en paramètre parce qu'au début de la partie, le serpent est composé d'un carré de long.

            this.pomme = new Pomme(this);                  // this.pomme est pour rattacher la pomme à mon jeu. (!!!!!!!!!!!!!!!!!! je ne comprends pas trop !!!!!!!!!!!!!!!!!!). Le fait de ettre this en paramètre réfère au jeu et on s'attend à la retrouvé plus bas (ici, dans le paramètre de la classe Pomme).

            this.serpent = new Serpent();

        }

        finPartie(){

        }

        affichagePointage(_lePointage){
            this.sortiPointage.innerHTML = _lePointage;                                                // this est une référence à la classe Jeu. innerHTML permet d'écrire dans le HTML la valeur qu'on donne à la propriété (ici, ce sera un nombre).
        }

    }

// Le serpent

    class Serpent{

        constructor(){
            console.log("création du serpent");
        }

    }

// La pomme

    class Pomme{

        constructor(_leJeu){
            console.log("création de la pomme");

            this.leJeu = _leJeu;              // Dans la classe pomme, c'est la propriété qui aura la référence au jeu.

            this.pomme = [];                    // [] = tableau. Référence à la pomme dans le jeu.

            this.ajoutePomme();

        }

        ajoutePomme(){

            var posX = Math.floor(Math.random() * this.leJeu.grandeurGrille);                   // Math.floor est un arrondi vers le bas pour avoir des nombres entiers au lieu de nombres à virgules.Math.random() génère une nombre aléatoire entre 0 et 1 que l'on multiplie par la la grandeur de la grille (15 pour le x à cause de notre variable). This.leJeu réfère à la classe jeu plus haut et le .grandeurGrille à la propriété dans cette classe.
            var posY = Math.floor(Math.random() * this.leJeu.grandeurGrille);                   // Math.floor est un arrondi vers le bas pour avoir des nombres entiers au lieu de nombres à virgules.Math.random() génère une nombre aléatoire entre 0 et 1 que l'on multiplie par la la grandeur de la grille (15 pour le y à cause de notre variable). This.leJeu réfère à la classe jeu plus haut et le .grandeurGrille à la propriété dans cette classe.

            this.leJeu.s.rect(posX * this.leJeu.grandeurCarre, posY * this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre).attr({fill: 'red'});                                 // this.leJeu.s.rect() équivaut à un rectangle fait à partir de snap.svg. En paramètre, on indique sur les 2 premières variables la position du carré et sur les 2 dernières, les dimensions du carré. on met le posX et posY, mais il y a aussi un espacement entre ceux-ci qu'il faut mettre (la distance de 20px), c'est pourquoi on multiplie par la grandeur du carré. On ajoute un attribut fill (le fill est du css), puis on met une couleur (ici, rouge entre guillement simple).
////////////////////////////////////////// Vidéo à 53:56 /////////////////////////////////////////////////////////////////////////////////////////////////////
        }


        supprimePomme(){

        }
    }



    var unePartie = new Jeu("#jeu", "#pointage");                    // new (nouvel objet) que l'on appelle : "Jeu" qui est dans une variable. En paramètre, on met les id du html auxquels on réfère.

    var btnJouer = document.querySelector("#btnJouer");
    btnJouer.addEventListener("click", nouvellePartie);

    function nouvellePartie(){
        unePartie.nouvellePartie();                                         // on appelle la fonctionnalité nouvellePartie qui est dans la classe Jeu.
    }

});