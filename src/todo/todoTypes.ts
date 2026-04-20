
export enum Status{
    Completed = 'completed',
    Pending = 'pending',

}

export interface Itodo{
    task: string,
    deadline : string,
    stauts : Status
}