import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";



function Home() {

    const [livros, setLivros] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [id, setId] = useState("");
    const [tituloEdit, setTituloEdit] = useState("");
    const [autorEdit, setAutorEdit] = useState("");
    const [dataReserva,setDataReserva] = useState("");
    const [dataEntrega,setDataEntrega] = useState("");
    const [disponivel,setDisponivel] = useState("Sim");
    const navigate = useNavigate();


    function getBooks() {
        const token = window.localStorage.getItem('x-access-token');
        axios({
            method: 'get',
            url: 'http://localhost:3301/books',
            headers: {
                'x-access-token': token
            }
        }).then((response) => {
            console.log(response.data)
            setLivros(response.data)
        }).catch((err) => {
            const erro = err.response.data.error;
            console.log(err.response.data.error)
            if (erro === "failed-auth-token") {
                Swal.fire("Sua sessão expirou, realize o login novamente !", '', 'error')
                navigate('/', { replace: true })
            }
        })
    }

    function handleCadastrar(e) {
        e.preventDefault();
        const token = window.localStorage.getItem('x-access-token');

        console.log('cadastrar')
        axios({
            method: 'post',
            url: 'http://localhost:3301/book',
            headers: {
                'x-access-token': token
            },
            data: {
                titulo: titulo,
                autor: autor
            }
        }).then((response) => {
            console.log(response.data)
            Swal.fire("Livro cadastrado com sucesso !", '', 'success')
            setTitulo("");
            setAutor("");
        }).catch((err) => {
            const erro = err.response.data.error;
            console.log(err.response.data.error)

            if (erro === "title-author-required") { Swal.fire("Titulo e Autor necessário !", '', 'error') }
            if (erro === "title-min-2") { Swal.fire("Titulo precisa ter mais de 2 caracteres !", '', 'error') }
            if (erro === "autor-min-2") { Swal.fire("Autor precisa ter mais de 2 caracteres !", '', 'error') }
            if (erro === "failed-auth-token") {
                Swal.fire("Sua sessão expirou, realize o login novamente !", '', 'error')
                navigate('/', { replace: true })
            }

        })
    }

    function handleExcluir(id) {
        console.log(id)
        const token = window.localStorage.getItem('x-access-token');


        axios({
            method: 'delete',
            url: 'http://localhost:3301/book',
            headers: {
                'x-access-token': token
            },
            data: {
                id: id,
            }
        }).then((response) => {
            Swal.fire("Livro excluido com sucesso !", '', 'success')
        }).catch((err) => {
            const erro = err.response.data.error;
            console.log(err.response.data.error)

            if (erro === "id-undefined") { Swal.fire("Livro inválido !", '', 'error') }
            if (erro === "id-invalid") { Swal.fire("Livro inválido !", '', 'error') }
            if (erro === "book-not-exists") { Swal.fire("Livro não existe !", '', 'error') }
            if (erro === "failed-auth-token") {
                Swal.fire("Sua sessão expirou, realize o login novamente !", '', 'error')
                navigate('/', { replace: true })
            }

        })
    }

    function handleEditar(id,titulo,autor,dataReserva,dataEntrega,disponivel) {
        console.log(id)
        setId(id)
        setTituloEdit(titulo)
        setAutorEdit(autor)
        setDisponivel(disponivel)
    }

    function handleAtualizar(){
        const token = window.localStorage.getItem('x-access-token');
        axios({
            method: 'put',
            url: 'http://localhost:3301/book',
            headers: {
                'x-access-token': token
            },
            data: {
                id: id,
                titulo: tituloEdit,
                autor: autorEdit,
                dataReserva: dataReserva,
                dataEntrega: dataEntrega,
                disponivel: disponivel
            }
        }).then(()=>{
            Swal.fire("Atualizado com sucesso !", '', 'success')
            setId("");
        }).catch((err)=>{
            const erro = err.response.data.error;
            console.log(err.response.data.error)

            if (erro === "title-author-id-required") { Swal.fire("Titulo autor é necessário !", '', 'error') }
            if (erro === "available-reservationdate-deliverydate-required") { Swal.fire("Todos os campos precisam ser preenchidos !", '', 'error') }
            if (erro === "id-invalid") { Swal.fire("Id inválido !", '', 'error') }
            if (erro === "book-not-exists") { Swal.fire("Livro não encontrado !", '', 'error') }
            if (erro === "failed-auth-token") {
                Swal.fire("Sua sessão expirou, realize o login novamente !", '', 'error')
                navigate('/', { replace: true })
            }
        })
    }

    useEffect(() => {
        getBooks();
    }, [])

    return (
        <div>

            <div className="container">

                <h2>Cadastrar</h2>
                <form>
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
                        </div>
                        <div className="col">
                            <button className="btn btn-primary" onClick={handleCadastrar}> Cadastrar</button>
                        </div>
                    </div>
                </form>

                {id && (
                    <div>
                        <h2>Editar</h2>
                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Titulo" value={id} disabled />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Titulo" value={tituloEdit} onChange={(e) => setTituloEdit(e.target.value)} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Autor" value={autorEdit} onChange={(e) => setAutorEdit(e.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Data da Reserva <input type="date" className="form-control" onChange={(e)=> setDataReserva(e.target.value)}/>
                            </div>
                            <div className="col">
                                Data da Entrega <input type="date" className="form-control" onChange={(e)=> setDataEntrega(e.target.value)} />
                            </div>
                            <div className="col">
                                Disponivel ?
                                <select class="form-select" aria-label="Default select example" onChange={(e)=> setDisponivel(e.target.value)}>
                                    <option selected value='Sim'>Sim</option>
                                    <option value="Nao">Não</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-primary" onClick={handleAtualizar}>Atualizar</button>
                                <button className="btn btn-danger" onClick={()=> setId("")}>Cancelar</button>
                            </div>
                            
                        </div>
                    </div>
                )}
                
                <h2>Livros</h2>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Autor</th>
                                <th scope="col">Data da Reserva</th>
                                <th scope="col">Data da Entrega</th>
                                <th scope="col">Disponivel</th>

                            </tr>
                        </thead>
                        <tbody>
                            {livros.map((item) => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.titulo}</td>
                                    <td>{item.autor}</td>
                                    <td>{item.dataEntrega}</td>
                                    <td>{item.dataReserva}</td>
                                    <td>{item.disponivel}</td>
                                    <td><button className="btn" onClick={() => handleExcluir(item._id)}><i className="bi bi-trash "></i></button>
                                        <button className="btn" onClick={() => handleEditar(item._id,item.titulo,item.autor,item.dataReserva,item.dataEntrega,item.disponivel)}><i className="bi bi-pencil-square "></i></button></td>

                                </tr>
                            ))

                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Home;