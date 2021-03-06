import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedHomeModule } from './shared/shared.home.module';

// Home
import { HomeComponent } from './home.component';
import { PreloaderDirective } from './preloader.directive';

// Header
import { AppHeaderComponent } from './header/header.component';
import {TrackpointHeaderComponent} from './header/trackpoint-header.component';
import { AppSidenavComponent } from './sidenav/sidenav.component';
import { ToggleOffcanvasNavDirective } from './sidenav/toggle-offcanvas-nav.directive';
import { AutoCloseMobileNavDirective } from './sidenav/auto-close-mobile-nav.directive';
import { AppSidenavMenuComponent } from './sidenav/sidenav-menu/sidenav-menu.component';
import { AccordionNavDirective } from './sidenav/sidenav-menu/accordion-nav.directive';
import { AppendSubmenuIconDirective } from './sidenav/sidenav-menu/append-submenu-icon.directive';
import { HighlightActiveItemsDirective } from './sidenav/sidenav-menu/highlight-active-items.directive';
import {HeaderUpdateService} from './header/header-update.service';

// Search Overlay
import { AppSearchOverlayComponent } from './search-overlay/search-overlay.component';
import { SearchOverlayDirective } from './search-overlay/search-overlay.directive';
import { OpenSearchOverlaylDirective } from './search-overlay/open-search-overlay.directive';

import {AutoExpandAccordionNavDirective} from './sidenav/sidenav-menu/auto-expand-accordion-nav.directive';
import {MdButtonModule, MdMenuModule} from '@angular/material';



@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule,
        SharedHomeModule,
        MdButtonModule,
        MdMenuModule
    ],
    declarations: [
      // Home
      HomeComponent,
      PreloaderDirective,
      // Header
      // AppHeaderComponent,
      TrackpointHeaderComponent,

      AppSidenavComponent,
      ToggleOffcanvasNavDirective,
      AutoCloseMobileNavDirective,
      AppSidenavMenuComponent,
      AccordionNavDirective,
      AutoExpandAccordionNavDirective,
      AppendSubmenuIconDirective,
      HighlightActiveItemsDirective,
      // Search overlay
      AppSearchOverlayComponent,
      SearchOverlayDirective,
      OpenSearchOverlaylDirective,
    ],
    providers: [
        HeaderUpdateService
    ]
})

export class HomeModule {}
