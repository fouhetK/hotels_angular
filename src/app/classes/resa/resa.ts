import { Client } from "../client/client"
import { Hotel } from "../hotel/hotel"

export class Resa {
    id?:number
    datedeb?:Date
    datefin?:Date
    numChamber?:number
    client?:Client
    hotel?:Hotel
}
