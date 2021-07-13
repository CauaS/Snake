import firebase from "../firebase.js";
const ref = firebase.firestore().collection("pontuacoes")

const PontuacaoService = {
    async getPontuacoes() {
        const records = await ref.get();
        const itens = records.docs.map(x => x.data())
        return itens
    },

    async insertPontuacao(pontuacao) {
        try {
            await ref.doc().set(pontuacao)
        } catch (e) {
            console.error(e)
        }
    }
}

export default PontuacaoService