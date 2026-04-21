import { Socket } from "socket.io";
import { getServer } from "../../server.js";
import todoModel from "./todoModel.js";

class todo{
    private io = getServer();
    constructor(){
        this.io.on("connection",(socket)=>{
            console.log("socket connection has been established")
            socket.on("addTodo",(data)=>this.handleAddTodo(socket,data))
        })
       
    }
    private async handleAddTodo(socket:Socket,data:any){
   try {
          const{task,deadline,status} =data
     await todoModel.create({
            task,
            deadline,
            status
         }) 
         const alltodos= await todoModel.find()
         socket.emit("responseTodo",{
           alltodos
         })
   } catch (error) {
    socket.emit("errResponse",{ 
        status:"error",
        error
    })
   }
    }

    private async handleDeleteTodo(socket:Socket,data:{id:string}){
        
    }
}
 
export default new todo()
