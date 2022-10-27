import userEvent from "@testing-library/user-event";
import { useState, useEffect } from "react";
import { auth } from "../firebase";

const Header = props => {


    const [user, setUser] = useState()

    useEffect(()=>{
      auth.onAuthStateChanged(function(val){
        if(val!=null){
          setUser(val.displayName)
        }
      })
    })


    function criarConta(e){
      e.preventDefault();

      let email = document.getElementById("InputEmail").value;
      let senha = document.getElementById("InputPassword").value
      
      //criar conta firebase
      auth.createUserWithEmailAndPassword(email,senha)
      .then((authUser)=>{
          authUser.user.updateProfile({
            displayName: email
          })
          alert('Conta criada com Sucesso');

          let modal = document.querySelector('.bg-modal')
          modal.style.display = 'none'
      }).catch((error)=>{
        alert(error.message)
      });

    }

    function Login(e){
      e.preventDefault();

      let email = document.getElementById("InputEmailLogin").value;
      let senha = document.getElementById("InputPasswordLogin").value

      auth.signInWithEmailAndPassword(email,senha)
      .then((auth)=>{
        setUser(auth.user.displayName);
        window.location.href = "/";
      }).catch((err)=>{
        alert(err.message)
      })

    }

    function logout(){

      auth.signOut()
      .then((val)=>{
        setUser(null);
        window.location.href = "/";
      }).catch((err)=>{
        alert(err.message)
      })

    }


    function openModal(e){
        e.preventDefault();

        let modal = document.querySelector('.bg-modal')
        modal.style.display = 'block'
    }

    function closeModal(){
      let modal = document.querySelector('.bg-modal')
      modal.style.display = 'none'
    }

    function openModalLogin(e){
      e.preventDefault();

      let modal = document.querySelector('.bg-modal-login')
      modal.style.display = 'block'
    }

    function closeModalLogin(){
      let modal = document.querySelector('.bg-modal-login')
      modal.style.display = 'none'
    }

    return(
        <>
          <div className="bg-modal">
            <div className="modal-build p-3">
                <div onClick={()=>{closeModal()}} className='close-modal'>
                  <span>X</span>
                </div>
                <div className="modal-header">
                    <h1>Crie sua Conta</h1>
                    <p>Você está próximo de um mundo totalmente novo.</p>
                </div>
                <div className="modal-body">
                    <form onSubmit={(e)=>criarConta(e)}>
                    <div class="form-group">
                      <label for="InputEmail">Email</label>
                      <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="exemplo@exemplo.com"></input>
                      <small id="emailHelp" class="form-text text-muted">Nós nunca vamos compartilhar seu e-mail com ninguém.</small>
                    </div>
                    <div class="form-group">
                      <label for="InputPassword">Senha</label>
                      <input type="password" class="form-control" id="InputPassword" placeholder="*********"></input>
                    </div>
                    <button type="submit" class="btn btn-warning mt-3">Criar Conta</button>
                    </form>
                </div>
            </div>
        </div>

        <div className="bg-modal-login">
            <div className="modal-build p-3">
                <div onClick={()=>{closeModalLogin()}} className='close-modal'>
                  <span>X</span>
                </div>
                <div className="modal-header">
                    <h1>Faça seu Login</h1>
                    <p>Seja muito bem-vindo novamente!</p>
                </div>
                <div className="modal-body">
                    <form onSubmit={(e)=>Login(e)}>
                    <div class="form-group">
                      <label for="InputEmailLogin">Email</label>
                      <input type="email" class="form-control" id="InputEmailLogin" aria-describedby="emailHelp" placeholder="exemplo@exemplo.com"></input>
                      <small id="emailHelp" class="form-text text-muted">Nós nunca vamos compartilhar seu e-mail com ninguém.</small>
                    </div>
                    <div class="form-group">
                      <label for="InputPasswordLogin">Senha</label>
                      <input type="password" class="form-control" id="InputPasswordLogin" placeholder="*********"></input>
                    </div>
                    <button type="submit" class="btn btn-warning mt-3">Login</button>
                    </form>
                </div>
            </div>
        </div>



        <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
           
            </a>
    
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" className="logo nav-link px-2 text-white">Sistema Login</a></li>
            </ul>
            {
              (user)?
              <div className="text-logado">
                <p>Olá, {user}</p>
                <button onClick={()=>{logout()}} type="button" className="btn btn-warning ms-3">Sair</button>
              </div>
              :
              <div className="text-end">
              <button onClick={(e)=>openModal(e)} type="button" className="btn btn-warning me-3">Criar Conta</button>
              <button onClick={(e)=>openModalLogin(e)} type="button" className="btn btn-light">Fazer Login</button>
            </div>
            }
        
           
          </div>
        </div>
      </header>

    <section className="py-5 text-center container">
        <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
                <h1 className="fw-light">Sistema de Login e Criação de Conta Inicial</h1>
                <p className="lead text-muted">Vamos Tentar Construir algo Incrível</p>
            </div>
        </div>
    </section>
    </>
    )
}

export default Header;