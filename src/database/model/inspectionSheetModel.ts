import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export class InspectionSheetModel extends Model {
  static table = 'inspection_sheets'

  @field('processosId') processosId!: number
  @field('dataFolha') dataFolha!: string
  @field('logradouro') logradouro!: string
  @field('insc_cadastral') insc_cadastral!: string
  @field('protocolo') protocolo!: string
  @field('nPredial') nPredial!: string
  @field('ocupacao') ocupacao!: string
  @field('testada') testada!: string
  @field('posicao1') posicao1!: string
  @field('pedologia') pedologia!: string
  @field('topografia') topografia!: string
  @field('caracterizacao') caracterizacao!: string
  @field('ultilizacao') ultilizacao!: string
  @field('sit_const_und') sit_const_und!: string
  @field('estrutura') estrutura!: string
  @field('parede') parede!: string
  @field('cobertura') cobertura!: string
  @field('rev_externo') rev_externo!: string
  @field('posicao2') posicao2!: string
  @field('alinhamento') alinhamento!: string
  @field('conservacao') conservacao!: string
  @field('uso_do_imovel') uso_do_imovel!: string
  @field('area_construida') area_construida!: string
  @field('piso') piso!: string
  @field('forro') forro!: string
  @field('rev_interno') rev_interno!: string
  @field('posse') posse!: string
  @field('observacao') observacao?: string
  @field('vistoridorEmail') vistoridorEmail!: string
  @field('condominio') condominio!: boolean
  @field('agua') agua!: boolean
  @field('esgoto') esgoto!: boolean
  @field('energia') energia!: boolean
  @field('telefone') telefone!: boolean
  @field('divisas') divisas!: boolean
  @field('calcada') calcada!: boolean
  @field('meio_fio') meio_fio!: boolean
  @field('galeria') galeria!: boolean
  @field('ilum_publica') ilum_publica!: boolean
  @field('pavimentacao') pavimentacao!: boolean
  @field('educacao') educacao!: boolean
  @field('saude') saude!: boolean
  @field('coleta_lixo') coleta_lixo!: boolean
  @field('limpeza') limpeza!: boolean
  @field('nome_vistoriador') nome_vistoriador!: string
}
