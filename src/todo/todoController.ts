import { Socket } from "socket.io";
import { getServer } from "../../server.js";
import todoModel from "./todoModel.js";
import { Status, type Itodo } from "./todoTypes.js";

class todo{
    private io = getServer();
    constructor(){
        this.io.on("connection",(socket)=>{
            console.log("socket connection has been established")
            socket.on("getTodo",(data)=>{this.handleGetTodo(socket)})
            socket.on("addTodo",(data)=>this.handleAddTodo(socket,data))
            socket.on("deleteTodo",(data)=>{this.handleDeleteTodo(socket,data)})
            socket.on("updateTodo",(data)=>{this.handleUpdateTodo(socket,data)})
        })
       
    }

    private async handleGetTodo(socket:Socket){
        try {
            const allTasks = await todoModel.find({status:Status.Pending});
            socket.emit("responseTodo", { allTasks });
        } catch (error) {
            socket.emit("responseTodo", {
                status: "error",
                error
            });
        }
    }

    private async handleAddTodo(socket:Socket,data:Itodo){
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
          try {
              const {id} = data
        const deleteTodo = await todoModel.findByIdAndDelete(id)
        if(!deleteTodo){
            socket.emit("responseTodo",{
                status:"error",
                message:"Cannot delete the task"
            })
            return;
        }
           const alltodos= await todoModel.find()
         socket.emit("responseTodo",{
           message:"Deleted successfully ",
           alltodos
         })
          } catch (error) {
            socket.emit("responseTodo",{
                message:"Cannot delete the task",
                error
            })
          }
    }

    private async handleUpdateTodo(socket:Socket,data:{id:string,status:Status}){
     try {
             const{id,status}= data
         const update = await todoModel.findByIdAndUpdate(id,{status})
         if(!todo){
            socket.emit("responseTodo",{
                status:"error",
                message:"todo not found"
            })
            return;
         }
          const alltodos= await todoModel.find({status:Status.Pending})
         socket.emit("responseTodo",{
           message:"Updated successfully ",
           alltodos
         })

     } catch (error) {
          socket.emit("responseTodo",{
                error,
                message:"error has occured "
            })
     }
    }

}
 
export default new todo()
