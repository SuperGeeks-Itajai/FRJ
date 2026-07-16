import { useState } from "react";

export default function useToast() {
  const [toastMensagem, setToastMensagem] = useState("");

  const [toastTipo, setToastTipo] = useState("sucesso");

  const [mostrarToast, setMostrarToast] = useState(false);

  function mostrarMensagem(mensagem, tipo = "sucesso") {
    setToastMensagem(mensagem);

    setToastTipo(tipo);

    setMostrarToast(true);

    setTimeout(() => {
      setMostrarToast(false);
    }, 3000);
  }

  return {
    toastMensagem,
    toastTipo,
    mostrarToast,
    mostrarMensagem,
  };
}