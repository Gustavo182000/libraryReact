import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios';


function Register() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    async function handleRegistrar(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:3301/register',
            data: {
                email: email,
                senha: senha
            }
          }).then((response)=>{
            console.log(response)
            Swal.fire("Cadastrado com sucesso, realize o login !", '', 'success')
            navigate('/', { replace: true })

          }).catch((err)=>{
            const erro = err.response.data.error;
            console.log(err.response.data.error)

            if(erro === "email-password-is-empty"){ Swal.fire("E-mail ou Senha vazio !", '', 'error')}
            if(erro === "email-not-valid"){ Swal.fire("E-mail invalido !", '', 'error')}
            if(erro === "password-min-6"){ Swal.fire("A senha deve ter no mínimo 6 caracteres !", '', 'error')}
            if(erro === "password-include-letters"){ Swal.fire("A senha deve conter letras !", '', 'error')}
            if(erro === "password-include-numbers"){ Swal.fire("A senha deve conter numeros !", '', 'error')}
            if(erro === "email-in-use"){ Swal.fire("E-mail em uso !", '', 'error')}





          })
        

    }

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://img.freepik.com/premium-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security_566886-2817.jpg"
                            className="img-fluid w-5" alt="Phone image" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">

                        <form>
                            <div className="form-outline mb-4">
                                <input value={email} type="email" id="email" className="form-control form-control-lg" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-outline mb-4">
                                <input value={senha} type="password" id="password" className="form-control form-control-lg" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={handleRegistrar}>Registrar</button>
                            <hr />
                            <p className="small text-muted">Já possue uma conta ? <Link to="/">Entrar</Link> </p>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Register;