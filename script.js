//======INITIALISATION DOM =======
//pour le form
let form=   document.getElementById("taskForm");
let nomInput = document.getElementById("taskName");
let dueDateInput = document.getElementById("taskDue");
let priorityInput = document.getElementById("taskPriority");

//pour le conteneur des tasks
let taskList = document.getElementById("taskList");

//le bouton suppr
let deleteBtn = document.querySelectorAll(".deleteBtn");

//==================================

//======Les Classes=======
class Task {
  constructor(nom,dueDate,priority){
    this.id= Date.now(); //generer id unique à partir d'une date
    this.nom=nom;
    this.dueDate = dueDate;
    this.priority=priority;
    this.status= false; // tâche non terminé par défaut 
  }
  
  //methodes
  isValide(){ // Pour vérifier si les éléments du task sont clean
    let valide = false; //par défaut 
    
    //recup les dates
    let dueDate = new Date(this.dueDate)//date de l'input
    let currentDate = new Date(); //Date actuelle
    
    //mettre à 0 l'heure, min , sec pour seulement comparer anee, mois , jour et ne pas avoir d'erreurs 
    dueDate.setHours(0,0,0,0);
    currentDate.setHours(0,0,0,0);
    try {
      if(this.nom == ""){ //si le nom est vide
        throw new Error("Le nom ne doit pas être vide");
      }else if(dueDate<currentDate){ //Si la date n'est pas valide
        throw new Error("La date ne doit pas être inférieure à la date actuelle");
      }
      else{
        valide = true;
      }
      return valide;
    }catch(e){
      showToast(e.message, "danger");
    }finally{
      console.log("Fin de la validation");
    }
  }
  
  //Meéthode pour mettre le statut à terminé.
  markDone(){
    this.status=true;
  }
}

//la classe TaskManager
class TaskManager{
    constructor(){
      this.taches=[]; // le tableau qui contient les tâches
    }
    addTask(task){
      if(task instanceof Task){
        //vérifier si la tâche est valide
        try{
          if (task.isValide()) { //si la tâche est valide
            this.taches.push(task);
            showToast(`Nouvelle tâche : "${task.nom}" ajouté`, "success")
          }
          else{
            task.isValide();
          }
        }catch(e){
            showToast(e.message, "danger");
        }finally{
          console.log("Opération Add Task Terminé");
        }
      }
      else{
        console.log("Le paramètre de addTask doit être un objet");
      }
    }
    
    editTask(task,newName,newDate,newPriority){
      if(task instanceof Task){
        //Modifier les éléments 
        try{
          let tmpTask = new Task(newName,newDate,newPriority); //pour vérifier avant d'écraser 
          if(tmpTask.isValide() == true){
              task.nom=newName;
              task.dueDate=newDate;
              task.priority=newPriority;
            console.log("Tâche modifié avec succès"); //pour le pop up
          }else{
            throw new Error("tâche invalide, modification échoué");
          }
        }catch(e){
          showToast(e.message, "danger");
        }finally{
          console.log("Opération edit task terminé");
        }
      }
      else{
         showToast("Tâche introuvable", "danger");
      }
    }
      //suppr une tache
    deleteTask(idTask){
      //parcourir le tableau de task
      let found = false;
      try{
        for(let i=0; i<this.taches.length;i++){
          if(idTask==this.taches[i].id){
            let taskName = this.taches[i].nom;
            //supprimer l'élément 
            this.taches.splice(i,1); //on suppr 1 element depuis l'indice i
            showToast(`Tâche ${taskName} supprimé avec succès`, "warning");
            found=true;
            break;
          }
        }
        if(!found){
          throw new Error("Tache introuvable");
        }
      }
      catch (e) {
        showToast(e.message, "danger");
      }
      finally{
        console.log("Fin de l'opération delete Task");
      }
      return found;
    }
    
    markTaskDone(task){ //marquer une tâche comme terminée 
      if (!(task instanceof Task)) {
          console.log("Le paramètre de markTaskDo e doit être une instance de la classe Task");
          return false;
      }
      try{
        if(task.status === false){
          task.status = true;
          showToast(`Tache "${task.nom}" terminée avec succès`, "success");
          return true;
        }else{
          showToast(`L'accomplissement de la tâche "${task.nom}" annulée`, "warning");
            task.status = false;
        }
      } catch (e) {
          showToast(e.message, "danger");
          return false;
        }
        finally{
          console.log("Fin de l'opération markTaskDone");
        }
    }
    
    listTasks(container){ //Afficher tt les taches
      try{
        if(this.taches.length == 0){
          container.innerHTML="";
          throw new Error("Aucune tâche à afficher");
        }
        else{
          container.innerHTML="";

           this.taches.forEach((task,index)=>{
            let newLi = `<li class="list-group-item d-flex justify-content-between align-items-center ${task.status ? "task-done":""}">
                <span>
                  <strong>${task.nom}</strong> – 
                  <small>${task.dueDate}</small>
              
                  <span 
                    class="${
                      task.priority === 'low'
                        ? 'priority-low'
                        : task.priority === 'medium'
                        ? 'priority-medium'
                        : 'priority-high'
                    }"
                  >
                    [${task.priority}]
                  </span>
                </span>
              
                <span class="d-flex justify-content-between align-items-center">
                  <button 
                    class="btn btn-outline-success btn-sm me-1" 
                    onclick="markDone(${index})"
                    title="Marquer comme terminée"
                  >
                    <i class="bi bi-check2-circle"></i>
                  </button>
              
                  <button 
                    class="btn btn-outline-danger btn-sm" 
                    onclick="deleteTask(${index})"
                    title="Supprimer la tâche"
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </span>
              </li>`;

        container.insertAdjacentHTML("beforeend", newLi);
          });
          return true;

        }
      } catch (e) {
        console.log(e.message);
        return false;
      }
      finally{
        console.log("Opération listTasks terminé");
      }
    }
    
    saveToJson(){ //sauvegarder le tableau en Json
      try{
        //verifier si le tab est vide
        if(this.taches.length==0){
          throw new Error("Le tableau est vide, impossible de convertir en Json");
        }
        else{
          //creer un nouveau tableau qui contient seulement les infos utiles 
          let cleanTab = this.taches.map(function(task){
            //ce que la fonction renvoie pour chaque élément du tableau 
            //l'objet : 
            return {
              id: task.id,
              nom: task.nom,
              dueDate: task.dueDate,
              priority: task.priority,
              status: task.status ? "Terminé" : "En Cours"
            }
            //nb : this.taches.map(function{...}) permet de parcourir les éléments du tableau taches un par un et renvoie ce que la fonction retourne vers le tableau cleanTab
          });
          //convertir le clean tab en Json
          let jsonString = JSON.stringify(cleanTab,null,2); //crée une chaîne JSON lisible, indentée de 2 espaces.
          
          //vérifier si json bien crée 
          JSON.parse(jsonString); //lève automatiquement une erreur si ne marche pas 
          console.log("conversion Json effectué avec succès");
          console.log(jsonString);
          return true;
        }
      }catch(e){
        console.log(e.message);
        return false;
      }
      finally{
        console.log("opération saveToJson terminé");
      }
    }
}
//==================================

let defaultTaskManager = new TaskManager();

//Pour ajouter une tache
form.addEventListener("submit", function(e){
  e.preventDefault(); //éviter l'actualisation 
  let task = new Task(nomInput.value,dueDateInput.value,priorityInput.value);
  //verifier si la tâche est valide
  task.isValide();
  //ajouter la nouvelle tache dans le tableau 
  defaultTaskManager.addTask(task);
  //afficher dans le container listTask
  defaultTaskManager.listTasks(taskList);
  form.reset();
});

//Pour Suppr une tache
function deleteTask(index){
  // recup l'ID par l'indexe et supprimer la tache
  defaultTaskManager.deleteTask(defaultTaskManager.taches[index].id);
  //refresh l'affichage 
  defaultTaskManager.listTasks(taskList);
}

//Pour effectuer une tâche 
function markDone(index){
  defaultTaskManager.markTaskDone(defaultTaskManager.taches[index]);
  
    //refresh l'affichage 
  defaultTaskManager.listTasks(taskList);
}

//fonction pour afficher un toast avec message perso
function showToast(message, type="success"){
  let toastEl = document.getElementById("liveToast");
  let toastBody= document.querySelector(".toast-body");
  toastEl.className=`toast align-items-center text-bg-${type}` //success, warning, danger
  let toast = new bootstrap.Toast(toastEl);
  toastBody.textContent = message;
  toast.show();
}