import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'



function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3301/login',
            data: {
                email: email,
                senha: senha
            }
          }).then((response)=>{
            window.localStorage.setItem('x-access-token',response.data.token)
            navigate('/home', { replace: true })
          }).catch((err)=>{
            const erro = err.response.data.error;
            console.log(err.response.data.error)
            if(erro === "email-password-is-empty"){ Swal.fire("E-mail ou Senha vazio !", '', 'error')}
            if(erro === "email-not-exist"){ Swal.fire("E-mail não cadastrado !", '', 'error')}
            if(erro === "email-password-not-match"){ Swal.fire("E-mail e Senha não conferem !", '', 'error')}


          })

    }

    return (
        <div>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">

                            <form>
                                <div className="form-outline mb-4">
                                    <input value={email} type="email" id="email" className="form-control form-control-lg" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-outline mb-4">
                                    <input value={senha} type="password" id="password" className="form-control form-control-lg" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={handleLogin}>Entrar</button>
                                <hr />
                                <p className="small text-muted">Não possue uma conta ? <Link to="/register">Cadastre-se</Link> </p>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;