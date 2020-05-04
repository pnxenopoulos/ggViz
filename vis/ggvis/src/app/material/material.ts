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
        MatTabsModule,
        MatCardModule} from '@angular/material';
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
        MatTabsModule,
        MatCardModule],
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
        MatTabsModule,
        MatCardModule]
})

export class MaterialModule { }
