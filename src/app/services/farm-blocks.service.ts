// Core Imports
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

// Definition Imports
import type { FarmBlockInterface } from './../definitions/interfaces'

@Injectable({
    providedIn: 'root'
})

export class FarmBlocksService {
    constructor( private _http: HttpClient ) {}

    getData() {
        return this._http.get< Array< FarmBlockInterface > >( '/assets/data/blocks.json' )
    }
}
