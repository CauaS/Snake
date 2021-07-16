import firebase from "../firebase.js";
const ref = firebase.firestore().collection("pontuacoes")

const PontuacaoService = {
    async getPontuacoes(direction = 'desc') {
        const records = await ref.limit(5).orderBy('Pontos', direction).get();
        const itens = records.docs.map(x => x.data())
        return itens
    },

    async insertPontuacao(pontuacao) {
        try {
            const placares = await this.getPontuacoes('asc')
            let deveInserir = false
            if (placares.length === 5) {
                for (let placar of placares) {
                    if (placar.Pontos < pontuacao.Pontos) {
                        await this.deletePontuacao(placar)
                        deveInserir = true
                        break
                    }
                }
            }
            if(deveInserir || placares.length < 5)
                await ref.doc(`${pontuacao.Apelido}${pontuacao.Pontos}`).set(pontuacao)

        } catch (e) {
            console.error(e)
        }
    },

    async deletePontuacao(pontuacao) {
        try {
            await ref.doc(`${pontuacao.Apelido}${pontuacao.Pontos}`).delete()
        } catch (e) {
            console.error(e)
        }
    }
}

export default PontuacaoService