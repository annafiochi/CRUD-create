"use client";
import { useState } from "react";
import axios from "axios";

export default function Edit() {
    const [commentId, setCommentId] = useState("");
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

const buscarComentario = async () => {
    setLoading(true);
    try {
        const {data} = await axios.get(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
        setForm ({name: data.name, email: data.email, body: data.body})
    } catch (error) {
        setError(true);
    } finally {
        setLoading(false);
    }
}

const editarComentario = async () => {
    setLoading(true);
    try {
        await axios.put(`https://jsonplaceholder.typicode.com/comments/${commentId}`, form);
        setSuccess(true);
    } catch (error) {
        setError(true);
    } finally {
        setLoading(false);
    }
}

    return(
        <div>
            <div>Cheguei brasil</div>

            <input 
                type="number"
                value={commentId}
                onChange={(e) => setCommentId(e.target.value)}
                placeholder="ID do comentário"
            />
            <button onClick={buscarComentario} disabled={loading}>
                {loading ? "Buscando..." : "Buscar Comentário"}
            </button>
            <div>
                {form.name && (
                    <div>
                        <h2> Editar detalhes do comentário</h2>
                        <input
                            type="text"
                            value={form.name}
                            onChange = {(e) => setForm ({...form, name: e.target.value})}
                            placeholder="Escreva seu aqui muleke doido"
                        />
                        <br />
                        <input
                            type="email"
                            value={form.email}
                            onChange = {(e) => setForm ({...form, email: e.target.value})}
                            placeholder="Escreva seu email aqui muleke doido"
                        />
                        <br />
                        <textarea
                            value={form.body}
                            onChange = {(e) => setForm ({...form, body: e.target.value})}
                            placeholder="Escreva seu comentário aqui muleke doido"
                                rows="3"
                        />
                        <br />
                        <button onClick={editarComentario} disabled={loading || !form.name?.trim()}>
                            {loading ? "Salvando ..." : "Salvar alterações"}
                        </button>
                    </div>
                )}

                {error && <p>❌ Ocorreu um erro. Tente novamente.</p>}
                {success && <p>✅ Comentário atualizado com sucesso!</p>}
            </div>
        </div>);
}