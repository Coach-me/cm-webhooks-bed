"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesData = void 0;
require("reflect-metadata");
var MessageType;
(function (MessageType) {
    MessageType["ER"] = "error";
    MessageType["WA"] = "warning";
})(MessageType || (MessageType = {}));
exports.messagesData = [
    {
        model: 'Message',
        documents: [
            {
                key: 1,
                type: MessageType.ER,
                message: 'Usuario existente',
            },
            {
                key: 2,
                type: MessageType.ER,
                message: 'Usuario nuevo',
            },
            {
                key: 3,
                type: MessageType.ER,
                message: 'Habilidad existente',
            },
            {
                key: 4,
                type: MessageType.ER,
                message: 'Coach no existe',
            },
            {
                key: 5,
                type: MessageType.ER,
                message: 'Token invalido',
            },
            {
                key: 6,
                type: MessageType.ER,
                message: 'No se puede eliminar habilidad, debe tener al menos una',
            },
            {
                key: 7,
                type: MessageType.ER,
                message: 'Datos bancarios obligatorios',
            },
            {
                key: 8,
                type: MessageType.ER,
                message: 'No es posible agregar habilidades a un usuario',
            },
            {
                key: 9,
                type: MessageType.ER,
                message: 'Habilidad no existe',
            },
            {
                key: 10,
                type: MessageType.ER,
                message: 'Habilidad no pertenece al Coach',
            },
            {
                key: 11,
                type: MessageType.ER,
                message: 'ID user no existe',
            },
            {
                key: 12,
                type: MessageType.ER,
                message: 'Para el rango de fechas y dias de la semana seleccionados no hay ningun dia valido',
            },
            {
                key: 13,
                type: MessageType.ER,
                message: 'Disponibilidad no es permitida para un usuario',
            },
            {
                key: 14,
                type: MessageType.ER,
                message: 'No es posible agendar mas de tres meses',
            },
            {
                key: 15,
                type: MessageType.ER,
                message: 'Tiempo de inicio debe ser menor al tiempo final',
            },
            {
                key: 16,
                type: MessageType.ER,
                message: 'Fecha inicio disponibilidad debe ser menor a la fecha final',
            },
            {
                key: 17,
                type: MessageType.ER,
                message: 'No se encontro disponibilidad para las fechas indicadas',
            },
            {
                key: 18,
                type: MessageType.ER,
                message: 'Fecha de inicio de vigencia de disponibilidad debe ser mayor o igual a la fecha actual',
            },
            {
                key: 19,
                type: MessageType.ER,
                message: 'No puede exceder el limite de habilidades permitido',
            },
            {
                key: 20,
                type: MessageType.ER,
                message: 'Error al guardar disponibildad',
            },
            {
                key: 21,
                type: MessageType.ER,
                message: 'Error al guardar habilidad',
            },
            {
                key: 22,
                type: MessageType.ER,
                message: 'Coach no tiene habilidades',
            },
            {
                key: 23,
                type: MessageType.ER,
                message: 'No existe valor en dropdown',
            },
            {
                key: 24,
                type: MessageType.ER,
                message: 'No existe mensaje',
            },
            {
                key: 25,
                type: MessageType.ER,
                message: 'No se debe enviar información bancaria para un usuario',
            },
            {
                key: 26,
                type: MessageType.ER,
                message: 'Token y correo no corresponden',
            },
            {
                key: 27,
                type: MessageType.ER,
                message: 'Ya existe valor en dropdown',
            },
            {
                key: 28,
                type: MessageType.ER,
                message: 'No existe dropdown',
            },
            {
                key: 29,
                type: MessageType.ER,
                message: 'Label no actualizado',
            },
            {
                key: 30,
                type: MessageType.ER,
                message: 'Error al guardar foto',
            },
            {
                key: 31,
                type: MessageType.ER,
                message: 'CoachId debe ser el mismo en todos las skills',
            },
            {
                key: 32,
                type: MessageType.ER,
                message: 'Debe enviar skills unicas',
            },
            {
                key: 33,
                type: MessageType.ER,
                message: 'Para la creacion del coach debe enviar al menos una habilidad',
            },
            {
                key: 34,
                type: MessageType.ER,
                message: 'No debe enviar intereses para un Coach',
            },
            {
                key: 35,
                type: MessageType.ER,
                message: 'Nombre de habilidad excedio numero de caracteres permitidos',
            },
            {
                key: 36,
                type: MessageType.ER,
                message: 'Campo debe ser tipo ObjectId de Mongo',
            },
            {
                key: 37,
                type: MessageType.ER,
                message: 'Debe estar definido',
            },
            {
                key: 38,
                type: MessageType.ER,
                message: 'Valor no existe en dropdown',
            },
            {
                key: 39,
                type: MessageType.ER,
                message: 'Debe ser de 3 caracteres',
            },
            {
                key: 40,
                type: MessageType.ER,
                message: 'Numero de cuenta bancaria excedio cantidad de digitos permitido',
            },
            {
                key: 41,
                type: MessageType.ER,
                message: 'NIT invalido, debe ser de 10 digitos incluyendo digito de verificacion',
            },
            {
                key: 42,
                type: MessageType.ER,
                message: 'Debe ser tipo fecha',
            },
            {
                key: 43,
                type: MessageType.ER,
                message: 'Debe contener únicamente digitos',
            },
            {
                key: 44,
                type: MessageType.ER,
                message: 'Debe comenzar con 3 y tener 10 digitos',
            },
            {
                key: 45,
                type: MessageType.ER,
                message: 'Excedio cantidad maxima de intereses',
            },
            {
                key: 46,
                type: MessageType.ER,
                message: 'Debe ser tipo enumeracion',
            },
            {
                key: 47,
                type: MessageType.ER,
                message: 'Nombre excedio cantidad maxima de caracteres',
            },
            {
                key: 48,
                type: MessageType.ER,
                message: 'Numero de celular es obligatorio',
            },
            {
                key: 49,
                type: MessageType.ER,
                message: 'Debe ser un correo valido',
            },
            {
                key: 50,
                type: MessageType.ER,
                message: 'Habilidades deben estar definidas',
            },
            {
                key: 51,
                type: MessageType.ER,
                message: 'Unicamente letras sin caracteres especiales ni espacios',
            },
            {
                key: 52,
                type: MessageType.ER,
                message: 'Hora debe ser mayor o igual a 0',
            },
            {
                key: 53,
                type: MessageType.ER,
                message: 'Hora debe ser menor o igual a 23',
            },
            {
                key: 54,
                type: MessageType.ER,
                message: 'Minuto debe ser mayor o igual a 0',
            },
            {
                key: 55,
                type: MessageType.ER,
                message: 'Minuto debe ser menor o igual a 59',
            },
            {
                key: 56,
                type: MessageType.ER,
                message: 'Debe ser un arreglo',
            },
            {
                key: 57,
                type: MessageType.ER,
                message: 'Debe contener valores unicos',
            },
        ],
    },
];
//# sourceMappingURL=messages.js.map