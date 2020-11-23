document.addEventListener("DOMContentLoaded", function (event) {

    // Le jeu

    class Jeu {                                                                 // Cette classe va contenir toutes les caractéristiques que mon jeu peut avoir. La première lettre d'un objet, ici "Jeu" doit être en majuscule, c'est une convention dans la communauté DEV. C'est la définition d'objets, l'objet n'est pas créé.

        constructor(_idSvg, _idPointage) {                                      // Benoît met des underscore pour différencier ses id de ses autres variables en paramètre.
            console.log("creation du jeu");

            this.s = Snap(_idSvg);                                              //On met dans une variable le id du SVG grâce à snap.svg non pas dans une variable, mais dans une propriété s (snap).

            this.sortiPointage = document.querySelector(_idPointage);           // document.querySelector() permet de sélectionner un élément de la page html

            this.grandeurCarre = 20;                                            // Donne un width et un height de 20px aux carré.
            this.grandeurGrille = 15;                                           // C'est le nombre de carré dans la grille en largeur et en hauteur.

        }


        nouvellePartie() {                                                      // La nomenclature est similaire à une fonction, mais c'est une méthode, pas une fonction.

            this.finPartie();

            this.affichagePointage(1);                                // on met 1 en paramètre parce qu'au début de la partie, le serpent est composé d'un carré de long.

            this.pomme = new Pomme(this);                                       // this.pomme est pour rattacher la pomme à mon jeu. (!!!!!!!!!!!!!!!!!! je ne comprends pas trop !!!!!!!!!!!!!!!!!!). Le fait de ettre this en paramètre réfère au jeu et on s'attend à la retrouvé plus bas (ici, dans le paramètre de la classe Pomme).

            this.serpent = new Serpent(this);

        }

        finPartie() {

            if (this.pomme !== undefined) {                                    // S'il y a quelque chose dans le tableau pomme...
                this.pomme.supprimePomme();                                    // Supprime la pomme.
                this.pomme = undefined;                                        // Vide le tableau de la pomme.
            }

            if (this.serpent !== undefined) {                                  // S'il y a quelque chose dans le tableau serpent...
                this.serpent.supprimeSerpent();                                // Supprime le serpent.
                this.serpent = undefined;                                      // Vide le tableau du serpent.
            }

        }

        affichagePointage(_lePointage) {
            this.sortiPointage.innerHTML = _lePointage;                        // this est une référence à la classe Jeu. innerHTML permet d'écrire dans le HTML la valeur qu'on donne à la propriété (ici, ce sera un nombre).
        }

    }

// Le serpent

    class Serpent {

        constructor(_leJeu) {
            console.log("création du serpent");

            this.leJeu = _leJeu;

            this.currentX = -1;                                               // On met -1 parce que le prochain  mouvement sera 1 (on l'annule et le mettons à 0)
            this.currentY = 0;                                                // Le premier prochain mouvement ne bouge pas, donc pas besoin de le corriger.
            this.nextMoveX = 1;                                               // .nextMoveX c'est le prochain mouvement en x.
            this.nextMoveY = 0;                                               // Empêche le serpent de bouger en diagonale.

            this.serpentLongueur = 1;                                         // La longueur du serpent au début est de 1 carré.
            this.tblCarreSerpent = [];                                        // Tableau pour conserver en référence les carré; la longueur du serpent.

            this.touche = false;

            this.vitesse = 250;                                               // Correspond à la vitesse du serpent en 250ms.
            this.timing = setInterval(this.controleSerpent.bind(this), this.vitesse);       // this.timing équivaut au déplacement du prochain mouvement du serpent et de la vitesse de déplacement du serpent. .bind(this) donne le contexte de la demande et le this en paramètre correspond à serpent au lieu du document.

            document.addEventListener("keydown", this.verifTouche.bind(this));         // Dans le html, lorsqu'on appuie sur une touche, lance la fonction verifTouche. .bind(this) donne le contexte de la demande et le this en paramètre correspond à serpent au lieu du document.
        }

        verifTouche(_evt) {                                                   // On vérifie la touche sur laquelle on appuie
            var evt = _evt;                                                   // Met dans une variable, le paramètre de l'évènement.

            console.log(evt.keyCode);                                         // Si on appuie sur une touche du clavier, on vera le nombre qui correspond à la touche en code. Exemple : flèche du bas = 40.

            this.deplacement(evt.keyCode);                                    // Appeler la fonction de déplacement selon le paramètre; la touche appuyée.
        }

        deplacement(dirCode) {                                                // dirCode c'est le code de direction (la touche).

            switch (dirCode) {                                                // Dans le cas où la touche sélectionnée...
                case 37:                                                      // J'appuie sur la flèche de gauche...
                    this.nextMoveX = -1;                                      // Déplace le serpent vers la gauche.
                    this.nextMoveY = 0;                                       // Ne bouge pas en hauteur.
                    break;                                                    // Arrête le cas.

                case 38:                                                      // J'appuie sur la flèche du haut...
                    this.nextMoveX = 0;                                       // Ne bouge pas en largeur.
                    this.nextMoveY = -1;                                      // Déplace le serpent vers le haut.
                    break;                                                    // Arrête le cas.

                case 39:                                                      // J'appuie sur la flèche de droite...
                    this.nextMoveX = 1;                                       // Déplace le serpent vers la droite.
                    this.nextMoveY = 0;                                       // Ne bouge pas en hauteur.
                    break;                                                    // Arrête le cas.

                case 40:                                                      // J'appuie sur la flèche du bas...
                    this.nextMoveX = 0;                                       // Ne bouge pas en largeur.
                    this.nextMoveY = 1;                                       // Déplace le serpent vers le bas.
                    break;                                                    // Arrête le cas.
            }

            console.log(this.nextMoveX, this.nextMoveY);                      // On regarde les touches si le code trouve ce sur quoi on appuie.

        }

        controleSerpent() {                                                   // On va vérifier à quoi touche le serpent.

            var nextX = this.currentX + this.nextMoveX;                       // la position actuelle en x additionné au prochain mouvement en x équivaut à une variable pour la prochaine position du serpent en x.
            var nextY = this.currentY + this.nextMoveY;                       // la position actuelle en y additionné au prochain mouvement en y équivaut à une variable pour la prochaine position du serpent en y.

            this.tblCarreSerpent.forEach(function (element) {                 // Pour chaque parties du tableau des membres du serpent (pour chaque carré du serpent), Je créer une fonction qui...
                if (nextX === element[1] && nextY === element[2]) {           // Si le prochain mouvement en x touche à la position en x d'une partie de mes membres de serpent (si ça touche un des carrés du serpent en x) et que le prochain mouvement en y touche à la position en y d'une partie de mes membres de serpent (si ça touche un des carrés du serpent en y)...

                    console.log("touche moi-même !");
                    this.leJeu.finPartie();                                   // La partie s'arrête.
                    this.touche = true;
                }
            }.bind(this));                                                    // .bind(this) donne le contexte de la demande et le this en paramètre correspond à serpent au lieu du document.

            if (nextY < 0 || nextX < 0 || nextY > this.leJeu.grandeurGrille - 1 || nextX > this.leJeu.grandeurGrille - 1) {          // Si la position du prochain mouvement est plus petite que 0 en hauteur ou si la position du prochain mouvement est plus petite que 0 en largeur ou si la position du prochain mouvement est plus grande que la grandeur de la grille (15, mais le tableau est de 0 à 14) -1 (pour se rendre au 14 du tableau) en hauteur ou si la position du prochain mouvement est plus grande que la grandeur de la grille (15, mais le tableau est de 0 à 14) -1 (pour se rendre au 14 du tableau) en largeur...    (si on sort de la grille de jeu...)

                console.log("Touche limite !");
                this.leJeu.finPartie();                                       // La partie s'arrête.
                this.touche = true;
            }

            if (!this.touche) {            // Si this.touche == false...
                if (this.currentX === this.leJeu.pomme.pomme[1] && this.leJeu.pomme.pomme[2]) {                                      // Si la position actuelle de mon serpent est la même en x et en y qu'une pomme...
                    this.serpentLongueur++;                                  // Augmente la taille du serpent.

                    this.leJeu.affichagePointage(this.serpentLongueur);                                                              // On affiche le pointage selon la longueur du serpent.

                    this.leJeu.pomme.supprimePomme();                        // Supprime la pomme.
                    this.leJeu.pomme.ajoutePomme();                          // Créer une nouvelle pomme.
                }

                this.dessineCarre(nextX, nextY);                             // On dessine le premier carré du serpent.
                this.currentX = nextX;                                       // On transforme la position actuelle par le prochain mouvement (on la remplace) et ça donne une position de départ au serpent en x.
                this.currentY = nextY;                                       // On transforme la position actuelle par le prochain mouvement (on la remplace) et ça donne une position de départ au serpent en y.
            }

            console.log(nextX, nextY);

        }

        dessineCarre(x, y) {                                                 // Créer le serpent

            var unCarre = [this.leJeu.s.rect(x * this.leJeu.grandeurCarre, y * this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre), x, y];          // this.leJeu.s.rect() équivaut à un rectangle fait à partir de snap.svg. En paramètre, on indique sur les 2 premières variables la position du carré et sur les 2 dernières, les dimensions du carré. On note la position x et y pour savoir si l'on se touche soi-même. On met la ligne dans un tableau.

            this.tblCarreSerpent.push(unCarre);                              // On ajoute un carré après celui qui existe déjà.

            if (this.tblCarreSerpent.length > this.serpentLongueur) {        // Si le tableau des membres de mon serpent (les carrés) est plus grand que la longueur de mon serpent...
                this.tblCarreSerpent[0][0].remove();                         // Enlève le dernier carré visible à l'écran, mais ça n'a pas enlevé le carré dans le tableau des membres du serpent.
                this.tblCarreSerpent.shift();                                // Enlève le début de mon tableau des membres du serpent (le premier carré).
            }
        }

        supprimeSerpent() {                                                  // Supprimer le serpent
            clearInterval(this.timing);                                      // L'interval qui vérifie si le touche moi-même va s'arrêter.

            while (this.tblCarreSerpent.length > 0) {
                this.tblCarreSerpent[0][0].remove();                         // Enlève le dernier carré visible à l'écran, mais ça n'a pas enlevé le carré dans le tableau des membres du serpent.
                this.tblCarreSerpent.shift();                                // Enlève le début de mon tableau des membres du serpent (le premier carré).
            }
        }
    }

// La pomme

    class Pomme {

        constructor(_leJeu) {
            console.log("création de la pomme");

            this.leJeu = _leJeu;                                                                   // Dans la classe pomme, c'est la propriété qui aura la référence au jeu.

            this.pomme = [];                                                                       // [] = tableau. Référence à la pomme dans le jeu.

            this.ajoutePomme();

        }

        ajoutePomme() {

            var posX = Math.floor(Math.random() * this.leJeu.grandeurGrille);                   // Math.floor est un arrondi vers le bas pour avoir des nombres entiers au lieu de nombres à virgules.Math.random() génère une nombre aléatoire entre 0 et 1 que l'on multiplie par la la grandeur de la grille (15 pour le x à cause de notre variable). This.leJeu réfère à la classe jeu plus haut et le .grandeurGrille à la propriété dans cette classe.
            var posY = Math.floor(Math.random() * this.leJeu.grandeurGrille);                   // Math.floor est un arrondi vers le bas pour avoir des nombres entiers au lieu de nombres à virgules.Math.random() génère une nombre aléatoire entre 0 et 1 que l'on multiplie par la la grandeur de la grille (15 pour le y à cause de notre variable). This.leJeu réfère à la classe jeu plus haut et le .grandeurGrille à la propriété dans cette classe.

            this.pomme = [this.leJeu.s.rect(posX * this.leJeu.grandeurCarre, posY * this.leJeu.grandeurCarre, this.leJeu.grandeurCarre, this.leJeu.grandeurCarre).attr({fill: 'red'}), posX, posY];                                 // this.leJeu.s.rect() équivaut à un rectangle fait à partir de snap.svg. En paramètre, on indique sur les 2 premières variables la position du carré et sur les 2 dernières, les dimensions du carré. on met le posX et posY, mais il y a aussi un espacement entre ceux-ci qu'il faut mettre (la distance de 20px), c'est pourquoi on multiplie par la grandeur du carré. On ajoute un attribut fill (le fill est du css), puis on met une couleur (ici, rouge entre guillement simple). On indique aussi la position de la pomme comme élément 1 et 2 d'un tableau (0, 1 ,2). On met la ligne dans un tableau.

        }


        supprimePomme() {
            this.pomme[0].remove();                                                                // onva chercher le premier élément du tableau qui est la pomme et on la retire grâce à la propriété .remove de snap.svg.
        }
    }


    var unePartie = new Jeu("#jeu", "#pointage");                                 // new (nouvel objet) que l'on appelle : "Jeu" qui est dans une variable. En paramètre, on met les id du html auxquels on réfère.

    var btnJouer = document.querySelector("#btnJouer");
    btnJouer.addEventListener("click", nouvellePartie);

    function nouvellePartie() {
        unePartie.nouvellePartie();                                                               // on appelle la fonctionnalité nouvellePartie qui est dans la classe Jeu.
    }

});