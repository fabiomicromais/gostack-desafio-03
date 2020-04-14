import React, { useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";


function App() {
   //create repository
  const [repositories , SetRepositories ] = useState([]);
    // trigger para pegar dados do repositorio e setar no repositories
  useEffect (()=> {
             api.get('repositories').then (response => {
               SetRepositories(response.data);
  } );
 }, [] );

  
 async function handleAddRepository() {
    // setar novos dados no repositorio = dados abaixo static  
    const response = await  api.post('repositories',{
                title: 'Projeto react - desafio03',
                url: 'www.reactD.com',
                techs: ['node', 'react']
              });

      //console.log(response); //setar dados static no fim do array
     const repository = response.data;
     SetRepositories([...repositories, repository ]);

  }

  async function handleRemoveRepository(id) {
    //deleta repositorio = id 
    await api.delete(`repositories/${id}`);

     //filtra = atualiza repositorio retirando repositorio que foi deletado
     SetRepositories(repositories.filter  //mantem no repositorio apenas os repositorios diefentes do id
      ( repository => repository.id !== id ))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repository => (
        <li key={repository.id}>
            
           <label repositorio />   {repository.title} 

          <button onClick={ () => handleRemoveRepository(repository.id)} > Remover </button> 
        </li>
       ))}
    </ul>  
            

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
