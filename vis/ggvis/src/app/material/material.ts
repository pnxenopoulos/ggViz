import { MatButtonModule, MatToolbarModule, MatIconModule, MatSliderModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatSliderModule],
    exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatSliderModule]
})

export class MaterialModule { }
