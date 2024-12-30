export type Role = {
  id: number
  vistoriadorId: number
  perfilId: number
}

export type Surveyor = {
  nome: string
  email: string
  cpf: string
  idusuario: number
  idlotacao: number
  siglalotacao: string
  descricaolotacao: string
  vistoriador_perfis?: Role[]
}
