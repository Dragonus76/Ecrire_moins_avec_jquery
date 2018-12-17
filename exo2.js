
// On crée le sommaire tout en haut
$('#contenu').before('<div id="sommaire"><ol class="niveau1"></ol></div>');

// Pour chaque titre <h1>
$('#contenu h1').each(function(numTitre1,titre1){
  // numTitre1 est le numéro du h1 en question, partant de 0
  // titre1 est l'élément h1 en question, donc on peut le manipuler avec $(titre1)
  // $('h1:eq('+numTitre1+')') est donc la requête permettant d'acceder a cet h1
  
  // On ajoute l'id au titre, pour l'ancre
  $(titre1).attr('id', 'ancre-'+numTitre1);
 
  // On ajoute une ligne avec le texte du h1
  // + le lien de vers son ancre attache
  $('#sommaire .niveau1').append(
      '<li id="sommaire-'+numTitre1+'">'
        +'<a href="#ancre-'+numTitre1+'">'+$(titre1).text()+'</a>'
     +'</li>');
  // il ne faut pas oublier d'attribuer un id a cet li
  // pour pouvoir y rajouter des h2 plus tard
  
  
  // Si cet h1 a des h2
  if($('#contenu h1:eq('+numTitre1+') + div.chapitre').length == 1){
    // On crée une liste de sous-parties
    $('#sommaire-'+numTitre1).append('<ol class="niveau2"></ol>');
    
    // Pour chaque h2 dans le h1 en question
    $('#contenu h1:eq('+numTitre1+') + div.chapitre > h2').each(function(numTitre2,titre2){
      // On ajoute l'id au sous-titre, pour l'ancre
      $(titre2).attr('id', 'ancre-'+numTitre1+'-'+numTitre2);
      
      // On ajoute une ligne avec le nom de ce h2 avec un lien
      // + le lien de l'ancre vers le sous-titre
      $('#sommaire-'+numTitre1+' ol').append(
          '<li>'
           +'<a href="#ancre-'+numTitre1+'-'+numTitre2+'">'+$(titre2).text()+'</a>'
         +'</li>');
    });
  }
});
var tailles = {}, tailleMax = 0, tailleCourante;

$('#menu li.premier')
  .each(function(){
    // enregistrer la hauteur du menu déroulé complètement
    tailles[ $(this).attr('id') ] = tailleCourante = $(this).height();
    // redéfinir la hauteur (par défaut) pour cacher le menu
    // Note : juste pour ceux qui ont JavaScript activé
    // donc ceux qui n'ont pas JS activé verront le menu déroulé et non animé
    $(this).height( 20 );
    
    // enregistrer la taille maximale au fur et à mesure
    if( tailleCourante> tailleMax ){
      tailleMax = tailleCourante;
    }
    // pour ne pas déborder sur le contenu (position:relative et pas absolute)
    $('#menu').height( tailleMax );
  })
  // la souris rentre..
  .mouseenter(function(){
    $(this).stop().animate({
      // hauteur du menu déroulé complètement
      height: tailles[ $(this).attr('id') ]
    },500);
  })
  // ..et sort
  .mouseleave(function(){
    $(this).stop().animate({
      height: '19px' // taille par défaut
    },500);
  })
;

