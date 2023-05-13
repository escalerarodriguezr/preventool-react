export interface TaskHazardResponse{
    id:string;
    hazardName:string;
    description:string;
    active:boolean;
    creatorId:string;
    updaterId: null;
    createdAt: string;
    updatedAt: string|null;
}