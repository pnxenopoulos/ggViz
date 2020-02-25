import { MatButtonModule, MatToolbarModule, MatIconModule, MatSliderModule, MatMenuModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatSliderModule, MatMenuModule],
    exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatSliderModule, MatMenuModule]
})

export class MaterialModule { }
