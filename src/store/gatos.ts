import { ref } from "vue";
import { defineStore } from "pinia";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export interface Gato {
  id?: string;
  nome: string;
  raca: string;
  idade: number;
  sociavel: boolean;
  area: string; //ex: salão principal, jardim, area vip etc
  favorito: boolean;
}

export const useGatosStore = defineStore("gatos", () => {
  const gatos = ref<Gato[]>([]);
  const gatosCollection = collection(db, "gatos");

  async function buscarGatos(): Promise<void> {
    try {
      if (!auth.currentUser) {
        console.warn(
          "usuário não detectado ainda. aguardando autenticação para buscar dados.",
        );
        return;
      }
      const snapshot = await getDocs(gatosCollection);
      gatos.value = snapshot.docs.map((doc) => ({
        ...(doc.data() as Gato),
        id: doc.id,
      }));
    } catch (error) {
      console.error("Erro ao buscar gatos: ", error);
      throw error;
    }
  }

  async function salvarGato(gato: Gato): Promise<void> {
    try {
      // Aqui eu separo o ID do restante dos dados para que o Firestore não salve um campo "id" redundante no documento
      const { id, ...dados } = gato;
      if (id) {
        const gatoRef = doc(db, "gatos", id);
        await updateDoc(gatoRef, dados);
      } else {
        await addDoc(gatosCollection, dados);
      }
      // Chamo a busca novamente para atualizar a lista reativa e refletir a mudança na tela imediatamente
      await buscarGatos();
    } catch (error) {
      console.error("Erro ao salvar gato: ", error);
      throw error;
    }
  }

  async function excluirGato(id: string): Promise<void> {
    try {
      const gatoRef = doc(db, "gatos", id);
      await deleteDoc(gatoRef);
      await buscarGatos();
    } catch (error) {
      console.error("Erro ao excluir gato: ", error);
      throw error;
    }
  }

  return { gatos, buscarGatos, salvarGato, excluirGato };
});
