"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageDefault = exports.insterestsMaxLen = exports.linkedin = exports.instagram = exports.fieldsLinkedLink = exports.fieldsFacebookLink = exports.fieldsInstagramLink = exports.fieldsGoogleLogin = exports.fieldsFacebookLogin = exports.linkedinBaseUrl = exports.instagramBaseUrl = exports.googleBaseUrl = exports.facebookBaseUrl = exports.folderFullResolution = exports.priceSkillMax = exports.priceSkillMin = exports.nameSkillMin = exports.nameSkillMax = exports.nameUserMin = exports.nameUserMax = exports.dropdownValueLen = exports.accountNumberMax = exports.resolutions = exports.mimeType = exports.fileACL = exports.skillsMin = exports.skillsMax = void 0;
exports.skillsMax = 20; // Cantidad maxima de Skills
exports.skillsMin = 1; // Cantidad minima de Skills
exports.fileACL = 'public-read'; // Permisos de la foto de perfil en s3
exports.mimeType = 'image/png'; // Tipo por defecto de la foto de perfil
exports.resolutions = [300, 100, 250]; // Resoluciones foto de perfil
exports.accountNumberMax = 15; // Cantidad maxima de digitos de cuenta bancaria
exports.dropdownValueLen = 3; // Cantidad maxima de caracteres de un valor de dropdown
exports.nameUserMax = 100; // Cantidad de caracteres maximo del nombre de un User
exports.nameUserMin = 1; // Cantidad de caracteres minimo del nombre de un User
exports.nameSkillMax = 50; // Cantidad de caracteres maximo del nombre de un Skill
exports.nameSkillMin = 1; // Cantidad de caracteres minimo del nombre de un Skill
exports.priceSkillMin = 0; // Precio minimo por skill
exports.priceSkillMax = 999999999; // Precio maximo por skill
exports.folderFullResolution = 'Full'; // Carpeta en s3 para las fotos en maxima resolucion
exports.facebookBaseUrl = 'https://graph.facebook.com/v2.5/'; // Url base autenticacion Facebook
exports.googleBaseUrl = 'https://www.googleapis.com/oauth2/v2/'; // Url base autenticacion Google
exports.instagramBaseUrl = 'https://graph.instagram.com/'; // Url base autetenticacion Instagram
exports.linkedinBaseUrl = 'https://api.linkedin.com/v2/'; // Url base autetenticacion Linkedin
exports.fieldsFacebookLogin = ['name', 'email']; // Campos Facebook Login
exports.fieldsGoogleLogin = ['userinfo']; // Campos Google Login
exports.fieldsInstagramLink = ['username']; // Campos Instagram Link
exports.fieldsFacebookLink = ['link']; // Campos Facebook Link
exports.fieldsLinkedLink = ['link']; // Campos Facebook Link
exports.instagram = 'https://instagram.com/'; // Url instagram
exports.linkedin = 'https://www.linkedin.com/in/'; // Url Linkedin
exports.insterestsMaxLen = 5;
exports.messageDefault = 'Mensaje no existe en base de datos'; // Mensaje por defecto cuando no existe en base de datos
//# sourceMappingURL=constants.js.map