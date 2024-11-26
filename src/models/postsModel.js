import 'dotenv/config';
import conectarAoBanco from '../config/dbConfig.js';
import { ObjectId } from 'mongodb';
// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts
export async function getTodosPosts() {
    // Obtém o banco de dados 'instabytes'
    const db = conexao.db("instabytes");
    // Obtém a coleção 'posts'
    const colecao = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find().toArray();
}

export async function criarPost(novoPost){
        const db = conexao.db("instabytes");
        const colecao = db.collection("posts");
        return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost){
    const db = conexao.db("instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)

    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}
