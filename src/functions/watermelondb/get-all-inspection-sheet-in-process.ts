import { database } from '@/database'
import { Image64Model, InspectionSheetModel } from '@/database/model'
import { Q } from '@nozbe/watermelondb'

export async function getAllInspectionSheetInProcess(processosId: number) {
  try {
    const inspectionSheets = await database
      .get<InspectionSheetModel>('inspection_sheets')
      .query(Q.where('processosId', processosId))
      .fetch()

    // if (!inspectionSheets.length) return

    const inspectionSheetData = await Promise.all(
      inspectionSheets.map(async (item) => {
        const images64 = await database
          .get<Image64Model>('image64')
          .query(Q.where('inspectionSheetId', item.id))
          .fetch()

        const selectedVariables = {
          id: item.id,
          protocolo: item.protocolo,
          processosId: item.processosId,
          insc_cadastral: item.insc_cadastral,
          nPredial: Number(item.nPredial),
          ocupacao: item.ocupacao,
          testada: Number(item.testada),
          posicao1: item.posicao1,
          pedologia: item.pedologia,
          topografia: item.topografia,
          caracterizacao: item.caracterizacao,
          ultilizacao: item.ultilizacao,
          sit_const_und: item.sit_const_und,
          estrutura: item.estrutura,
          parede: item.parede,
          cobertura: item.cobertura,
          rev_externo: item.rev_externo,
          posicao2: item.posicao2,
          alinhamento: item.alinhamento,
          conservacao: item.conservacao,
          area_construida: item.area_construida,
          piso: item.piso,
          forro: item.forro,
          rev_interno: item.rev_interno,
          condominio: item.condominio,
          agua: item.agua,
          esgoto: item.esgoto,
          energia: item.energia,
          telefone: item.telefone,
          divisas: item.divisas,
          calcada: item.calcada,
          meio_fio: item.meio_fio,
          galeria: item.galeria,
          ilum_publica: item.ilum_publica,
          pavimentacao: item.pavimentacao,
          educacao: item.educacao,
          saude: item.saude,
          coleta_lixo: item.coleta_lixo,
          limpeza: item.limpeza,
          logradouro: item.logradouro,
          observacao: item.observacao,
          posse: item.posse,
          vistoridorEmail: item.nome_vistoriador,
          dataFolha: item.dataFolha,
          uso_do_imovel: item.uso_do_imovel,
          nome_vistoriador: item.nome_vistoriador
        }

        return {
          selectedVariables,
          images: images64.map((image) => image.base64)
        }
      })
    )
    return inspectionSheetData
  } catch (error) {
    console.error('Error fetching inspection sheets:', error)
    throw error
  }
}
