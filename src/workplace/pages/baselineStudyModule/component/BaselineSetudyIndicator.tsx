import {
    BaselineStudyIndicatorInterface
} from "../hook/getBaselineStudyIndicatotByCategory/BaselineStudyIndicatorInterface";
import {Card, CardText, CardTitle, Input} from "reactstrap";
import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";

export const BaselineStudyIndicator = (
    {
        id,
        name,
        description,
        compliancePercentage,
        observations

    }:BaselineStudyIndicatorInterface) => {

    const [compliance, setCompliance] = useState<number|string>(compliancePercentage);
    const [observationsState, setObservationsState] = useState<any>(observations);




    const handleComplianceChange = (event:ChangeEvent<HTMLInputElement>)=>{
        const value = event.target.value
        setCompliance(value)
    }

    const handleOnKeyUp = (event:any)=>{

        if (event.target.value > 100 ){
            event.target.value = "100";
            setCompliance(event.target.value);
        }

        if (event.target.value < 0 ){
            event.target.value = "0";
            setCompliance(event.target.value);
        }


    }

    const handleObservationsChange = (event:any)=>{
        setObservationsState(event.target.value);
    }



    const handleSaveAction = () => {

        //Validar la longitud de las observaciones
        console.log(compliance);

    }


    return(
        <Card body className={"mt-4 border border-2"}>
            <CardTitle className="mt-0">Indicador</CardTitle>
            <CardText className={"mt-2"}>
                {description}
            </CardText>
            <CardTitle className="mt-4">% de Cumplimiento</CardTitle>
            <CardText>

                <Input
                    className={"form form-control input-w-10"}
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    id={id}
                    value={compliance}
                    onChange={handleComplianceChange}
                    onKeyUp={handleOnKeyUp}
                />


            </CardText>
            <CardTitle className="mt-4">Observaciones</CardTitle>
            <CardText>
                <Input
                    type="textarea"
                    id="textarea"
                    rows="4"
                    placeholder="Máximo 300 caracteres..."
                    value={observationsState}
                    onChange={handleObservationsChange}
                />
            </CardText>
            <button
                className="btn btn-primary w-25"
                onClick={handleSaveAction}
            >
                Guardar
            </button>
        </Card>
    )

}