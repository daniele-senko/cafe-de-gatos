// importamos o 'ref' do vue para tornar nossa lista reativa
// qualquer alteração nessa lista atualizará a interface automaticamente
import { ref } from "vue";

// definição da interface (contrato) do nosso objeto Gato
// isso garante que todos os registros possuam os campos exigidos

export interface Gato {
  id: number;
  nome: string;
  raca: string;
  idade: number;
  sociavel: boolean;
  area: string; //ex: salão principal, jardim, area vip etc
  favorito: boolean;
}

// inicializa a lista vazia. ela sera o nosso "banco de dados" em memória
// o export permite que outras partes da aplicação acessem esta variavel

export const gatos = ref<Gato[]>([]);

/**
 * Função responsável por criar um novo registro ou atualizar um existente.
 * Atende aos requisitos Create e Update do CRUD.
 * * @param gato Objeto contendo os dados do formulário
 */
export function salvarGato(gato: Gato): void {
  // verifica se o gato já possui um id (caracteriza uma edição/update)
  if (gato.id) {
    // buscamos o índice do elemento no array
    const index = gatos.value.findIndex((g) => g.id === gato.id);
    if (index !== -1) {
      // atualizamos o registro mantendo a reatividade
      gatos.value[index] = { ...gato };
    }
  } else {
    // caso não exista o id, é um novo registro (create)
    // utilizamos o Date.now() para gerar um ID númerico único baseado no timestamp
    const novoGato = { ...gato, id: Date.now() };
    gatos.value.push(novoGato);
  }
}

/**
 * Função responsável por remover um registro da lista.
 * Atende ao requisito Delete do CRUD.
 * * @param id Identificador único do gato a ser removido
 */
export function excluirGato(id: number): void {
  // filtra a lista, mantendo apenas os elementos com id diferente do informado
  gatos.value = gatos.value.filter((g) => g.id !== id);
}
