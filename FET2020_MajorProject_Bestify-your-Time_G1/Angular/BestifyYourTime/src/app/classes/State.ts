
export class State{
    quiz_id:number;
    user_id:number;
    quiz:{quesId:number,ans:string}[];
    cat_id:number;
    timer:number;
    automatic:number;

    constructor(uid:number,qid:number,cid:number){
        this.quiz=[];
        this.quiz_id=qid;
        this.user_id=uid;
        this.cat_id=cid;
        this.timer=-1;
        this.automatic=-1;
    }

    initializeSaveData(questionCount:number){
        for(let i=1;i<=questionCount;i++){
            this.quiz.push({quesId:i,ans:""});
        }
    }
}