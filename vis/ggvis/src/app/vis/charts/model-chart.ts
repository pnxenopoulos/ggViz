import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class ModelChart {

    // divRef
    public divRef: ElementRef;

    constructor(divRef: ElementRef) {
        this.divRef = divRef;
    }

}
