export interface TaskRiskResponse{
    id:string;
    name:string;
    status:string;
    observation:string|null;
    legalRequirement:string|null;
    creatorId:string;
    updaterId: null;
    createdAt: string;
    updatedAt: string|null;
    hazardId:string;
    hazardName:string;
    hazardDescription:string|null;
    hazardCategoryName:string;
    taskId:string
}