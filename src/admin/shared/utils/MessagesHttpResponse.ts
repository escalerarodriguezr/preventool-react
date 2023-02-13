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
    AdminInvalidCurrentPasswordException: 'La contraseña actual introducida no coincide con tu contraseña registrada en el sistema.',

    //Company
    CompanyAlreadyExistsException: 'Ya existe un Empresa con el mismo RUC.',
    CompanyNotFoundException :'La empresa no existe en el sistema.',

    //Workplace
    WorkplaceAlreadyExistsException: 'Ya existe un Centro de trabajo con el mismo nombre.',
    WorkplaceNotBelongToCompanyException: 'La empresa del centro de trabajo que intenmtas actualizar no existe.',


}