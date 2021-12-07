import { Client } from "../client/client"
import { Hotel } from "../hotel/hotel"

export class Resa {
    id?:number
    datedeb?:Date
    datefin?:Date
    numChambre?:number
    client?:Client
    hotel?:Hotel
}
