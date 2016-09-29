
// Middleware pour des messages flash
/*
 Il est aussi possible de définir nos propres middleware.
 Il suffit pour cela de déclarer une fonction qui possède 3 arguments request,
  response et next qui devra être appellée à la fin du traitement.
  */
module.exports = function (request, response, next) {

   if (request.session.flash) {
        response.locals.flash = request.session.flash;
       request.session.flash = undefined
    }

    request.flash = function (type, content) {
        if (request.session.flash === undefined) {
            request.session.flash = {}
        }
        // type est une clé qui contient l'erreur content est la description de l'erreur
        request.session.flash[type] = content
    };

    next()
};