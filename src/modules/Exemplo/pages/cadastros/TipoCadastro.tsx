"use client";
import { notFound, useParams } from "next/navigation";
import { TelaExemplo } from "./TelaExemplo/TelaExemplo";

const TIPOS_CADASTRO = {
  ["exemplo"]: TelaExemplo,
};

export const TipoCadastro = () => {
  const params = useParams();
  const Component =
    TIPOS_CADASTRO[params.tipoCadastro as keyof typeof TIPOS_CADASTRO];

  if (!Component) {
    notFound();
  }

  return (
    <div>
      <Component />
    </div>
  );
};
