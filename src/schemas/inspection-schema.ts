import { z } from 'zod'

export const inspectionSheetSchema = z
  .object({
    id: z.string().optional(),
    nome_vistoriador: z.string(),
    protocolo: z.string(),
    processosId: z.number(),
    vistoridorEmail: z.string(),
    logradouro: z
      .string({ required_error: 'Logradouro é obrigatório' })
      .toUpperCase()
      .trim(),
    insc_cadastral: z
      .string()
      .optional()
      .transform((val) => val?.trim())
      .refine((val) => !val || val.length >= 14, {
        message: 'Inscrição cadastral deve ter no mínimo 14 caracteres.'
      }),
    nPredial: z
      .string()
      .optional()
      .transform((val) => val?.trim()).or(z.number()),
    area_construida: z
      .string()
      .optional()
      .transform((val) => val?.trim()),
    posse: z.string({ required_error: 'Posse é obrigatório' }).toUpperCase().optional(),
    observacao: z
      .string()
      .optional()
      .transform((val) => val?.trim())
      .refine((val) => !val || val.length >= 3, {
        message: 'Observação deve ter no mínimo 3 caracteres.'
      }),
    ocupacao: z.string({ required_error: 'Selecione uma opção' }).toUpperCase(),
    testada: z.string({ required_error: 'Selecione uma opção' }).or(z.number()),
    posicao1: z.string({ required_error: 'Selecione uma opção' }).toUpperCase(),
    pedologia: z
      .string({ required_error: 'Selecione uma opção' })
      .toUpperCase(),
    topografia: z
      .string({ required_error: 'Selecione uma opção' })
      .toUpperCase(),
    caracterizacao: z
      .string({ required_error: 'Selecione uma opção' })
      .toUpperCase(),
    ultilizacao: z
      .string({ required_error: 'Selecione uma opção' })
      .toUpperCase(),
    sit_const_und: z
      .string({ required_error: 'Selecione uma opção' })
      .toUpperCase(),
    estrutura: z
      .string({ required_error: 'Selecione uma opção' })
      .toUpperCase(),
    parede: z.string({ required_error: 'Selecione uma opção' }).toUpperCase(),
    cobertura: z
      .string({ required_error: 'Selecione uma opção' })
      .toUpperCase(),
    rev_externo: z
      .string({ required_error: 'Selecione uma opção' })
      .toUpperCase(),
    posicao2: z.string({ required_error: 'Selecione uma opção' }).toUpperCase(),
    alinhamento: z
      .string({ required_error: 'Selecione uma opção' })
      .toUpperCase(),
    conservacao: z
      .string({ required_error: 'Selecione uma opção' })
      .toUpperCase(),
    uso_do_imovel: z
      .string({ required_error: 'Selecione uma opção' })
      .toUpperCase(),
    piso: z.string({ required_error: 'Selecione uma opção' }).toUpperCase(),
    forro: z.string({ required_error: 'Selecione uma opção' }).toUpperCase(),
    rev_interno: z
      .string({ required_error: 'Selecione uma opção' })
      .toUpperCase(),
    condominio: z.boolean().default(false),
    agua: z.boolean().default(false),
    esgoto: z.boolean().default(false),
    energia: z.boolean().default(false),
    telefone: z.boolean().default(false),
    divisas: z.boolean().default(false),
    calcada: z.boolean().default(false),
    meio_fio: z.boolean().default(false),
    galeria: z.boolean().default(false),
    ilum_publica: z.boolean().default(false),
    pavimentacao: z.boolean().default(false),
    educacao: z.boolean().default(false),
    saude: z.boolean().default(false),
    coleta_lixo: z.boolean().default(false),
    limpeza: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (
        (data.insc_cadastral === '00.00.000.0000.000' ||
          data.nPredial === '0000' ||
          data.posse === '' ||
          data.area_construida === '0,000') &&
        !data.observacao
      ) {
        return false
      }
      if (data.observacao) {
        return true
      }
      if (data.insc_cadastral && data.nPredial && data.area_construida) {
        return true
      }

      false
    },
    {
      message:
        'A observação se torna obrigatória caso não informe a inscrição cadastral, posse,o n° predial ou a área construída',
      path: ['observacao']
    }
  )
  .transform((data) => {
    if (!data.insc_cadastral) {
      data.insc_cadastral = '00.00.000.0000.000'
    }
    if (!data.nPredial) {
      data.nPredial = '0000'
    }
    if (!data.area_construida) {
      data.area_construida = '0,000'
    }
    if (!data.posse) {
      data.posse = ''
    }
    if (!data.observacao) {
      data.observacao = ''
    }

    return data
  })
