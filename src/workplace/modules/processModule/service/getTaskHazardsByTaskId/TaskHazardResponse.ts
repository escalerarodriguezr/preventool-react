export interface TaskHazardResponse{
    id:string;
    hazardName:string;
    description:string;
    riskName:string;
    riskId:string;
    active:boolean;
    creatorId:string;
    updaterId: null;
    createdAt: string;
    updatedAt: string|null;
}