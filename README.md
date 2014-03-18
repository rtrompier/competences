API :


Competences :
JSON :

	{
        "name": "Constuire et intégrer un template Joomla",
        "categorie": "Test"
    }


curl -i -X GET http://localhost:3000/competences
curl -i -X GET http://localhost:3000/competences/5069b47aa892630aae000007
curl -i -X DELETE http://localhost:3000/competences/5069b47aa892630aae000007
curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Constuire et intégrer un template Joomla","categorie": "Test","situation_id" : "5328383956488c4969f0de42"}' http://localhost:3000/competences
curl -i -X PUT -H 'Content-Type: application/json' -d '{"name": "Constuire et intégrer un template Joomla","categorie": "Test"}' http://localhost:3000/competences/5069b47aa892630aae000007


Situations : 
JSON :

	{
	  "competence_id" : "",
	  	"year": "2011",
	    "lieu": "entreprise",
	    "besoin_entreprise": "Répondre à la demande du client qui veut renouveller son image sur internet.",
	    "travail_demande": "On m’a demandé d’intégrer la nouvelle maquette d’un site web client (reéalisée par le webdesigner) et de mettre en place son site internet.",
	    "contraintes": [
	        "Découper une maquette Photoshop",
	        "Coder en HTML/CSS",
	        "Créer l’archive d’un Template Joomla",
	        "Installer et configurer le Template"
	    ],
	    "chronologiquement": [
	        "Découper la maquette sous Photoshop",
	        "Intégrer en HTML",
	        "Charter le site en CSS",
	        "Creer les positions pour les modules Joomla",
	        "Créer l’archive avec tous les fichiers à mettre en place pour un Template Joomla",
	        "Installation du Template sur un CMS Joomla",
	        "Configurer le site Joomla",
	        "Mettre en place le contenu"
	    ],
	    "resultat": [
	        "D’après moi le reésultat est bon, le site sous Joomla correspond parfaitement à la maquette réalisée par le webdesigner."
	    ],
	    "retour": "NC"
	}

curl -i -X GET http://localhost:3000/situations
curl -i -X GET http://localhost:3000/situations/5069b47aa892630aae000007
curl -i -X DELETE http://localhost:3000/situations/5069b47aa892630aae000007
curl -i -X POST -H 'Content-Type: application/json' -d '' http://localhost:3000/situations
url -i -X PUT -H 'Content-Type: application/json' -d 'json' http://localhost:3000/situations/5069b47aa892630aae000007
