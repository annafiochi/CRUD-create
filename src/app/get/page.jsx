"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"


export default function GetPage(){
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(false);


    const router = useRouter();

    const buscarComments = async() => {
        setLoading(true);
        try {
            const response = await axios.get ("https://jsonplaceholder.typicode.com/comments")
            setComments(response.data)
        } catch (error) {
            setError(true);
            console.error("Erro ao buscar comentários", error);
        } finally {
            setLoading(false)
        }
    };

    const navegarParaComentário = (commentsId) => {
        router.push(`/get/${commentsId}`);
    }
    useEffect(() => {
        buscarComments()
    }, []);


    return (
        <div>
            <h1>Lista de comentários</h1>
    
            <h2>Comentários ({comments.length})</h2>
            {loading ? (
                <p>Carregando comentários...</p>
            ) : (
    
                <ul>
                    {comments.map((comment) => (
                        <li
                        key={comment.id}
                        onClick={() => navegarParaComentário(comment.id)}>
                            <hr />
                            <p>ID: {comment.id} </p>
                            <p>Nome: {comment.name} </p>
                            <p>Email: {comment.email} </p>
                            <p>Comentário: {comment.body} </p>
                        </li>
                    ))}
                </ul>
            )}
            {error && <p> x ocorreu um erro ao buscar comtários.</p>}
        </div>
        )
}

