import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sell extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public bev_id: number

  @column()
  public type:boolean

  @column()
  public price:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
