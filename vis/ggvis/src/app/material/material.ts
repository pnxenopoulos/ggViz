import { MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSliderModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule, 
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatTabsModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSliderModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatTabsModule],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSliderModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatTabsModule]
})

export class MaterialModule { }
