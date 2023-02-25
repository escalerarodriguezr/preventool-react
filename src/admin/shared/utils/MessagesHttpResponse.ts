export const MessagesHttpResponse = {
    //General
    ActionNotAllowedException :'Permisos insuficientes.',
    AccessDeniedException : 'Acceso denegado.',
    InternalError : 'Servicio no disponible.',
    SuccessCreatedResponse: 'Registro completado.',
    SuccessEditResponse: 'Editado con éxito.',
    SuccessUploadDocumentResponse: 'Documento guardado.',
    ErrorUploadDocumentResponse: 'El documento no se ha podido guardar.',
    ErrorUploadDocumentInvalidFormatResponse: 'El archivo no tiene el formato y/o tamaño adecuado.',

    //Admin
    AdminAlreadyExistsException: 'Ya existe un Administrador con el email introducido.',
    AdminNotFoundException :'El administrador no existe en el sistema.',
    AdminInvalidCurrentPasswordException: 'La contraseña actual introducida no coincide con tu contraseña registrada en el sistema.',

    //Company
    CompanyAlreadyExistsException: 'Ya existe un Empresa con el mismo RUC.',
    CompanyNotFoundException :'La empresa no existe en el sistema.',
    HealthAndSafetyPolicyOfCompanyNotHasDocumentAssignedException :'La empresa no tienen el documento de politíca de seguridad y salud en el trabajo asignado.',

    //Workplace
    WorkplaceAlreadyExistsException: 'Ya existe un Centro de trabajo con el mismo nombre.',
    WorkplaceNotBelongToCompanyException: 'La empresa del centro de trabajo que intenmtas actualizar no existe.',

    //HealthAndSafetyPolicy
    HealthAndSafetyNotFoundException: 'La política de la seguridad y salud de la empresa no existe en el sistema.',
    HealthAndSafetyStatusChangedSuccess: 'Estado de la política de la seguridad y salud actualizado',


}