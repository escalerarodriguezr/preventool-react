export const MessagesHttpResponse = {
    //General
    ActionNotAllowedException :'Permisos insuficientes.',
    AccessDeniedException : 'Acceso denegado.',
    InternalError : 'Servicio no disponible.',
    SuccessCreatedResponse: 'Registro completado.',
    SuccessEditResponse: 'Editado con éxito.',

    //Admin
    AdminAlreadyExistsException: 'Ya existe un Administrador con el email introducido.',
    AdminNotFoundException :'El administrador no existe en el sistema.',
    AdminInvalidCurrentPasswordException: 'La contraseña actual introducida no coincide con la contraseña del usuario.',

    //Company
    CompanyAlreadyExistsException: 'Ya existe un Empresa con el mismo RUC.',

}