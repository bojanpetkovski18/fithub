import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgImageSliderModule } from 'ng-image-slider';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminDashboardComponent } from './main/admin/admin-page/admin-dashboard/admin-dashboard.component';
import { AdminPageComponent } from './main/admin/admin-page/admin-page.component';
import { CommonModule } from '@angular/common';
import { AdminAddProductComponent } from './main/admin/admin-products/components/admin-add-product/admin-add-product.component';
import { NavBarComponent } from './main/layout/nav-bar/nav-bar.component';
import { NavFooterComponent } from './main/layout/nav-footer/nav-footer.component';
import { HomePageComponent } from './main/client/home-page/home-page.component';
import { ProgramBannerComponent } from './main/client/progam-page/program-banner/program-banner.component';
import { ContactComponent } from './main/client/contact-page/contact/contact.component';
import { GearBannerComponent } from './main/client/gear-page/gear-banner/gear-banner.component';
import { GearComponent } from './main/client/gear-page/gear/gear.component';
import { ProgramsGridComponent } from './main/client/progam-page/programs-grid/programs-grid.component';
import { ProgramsComponent } from './main/client/progam-page/programs/programs.component';
import { CarouselComponent } from './main/client/home-page/components/carousel/carousel.component';
import { MenuNavigationComponent } from './main/client/home-page/components/menu-navigation/menu-navigation.component';
import { SliderBrandsComponent } from './main/client/home-page/components/slider-brands/slider-brands.component';
import { OnSaleBannersComponent } from './main/client/home-page/components/onsale-banners/onsale-banners.component';
import { OnSaleProductsComponent } from './main/client/home-page/components/onsale-products/onsale-products.component';
import { SupplementsBannerComponent } from './main/client/supplements-page/supplements-banner/supplements-banner.component';
import { SupplementsComponent } from './main/client/supplements-page/supplements/supplements.component';
import { AdminCategoriesComponent } from './main/admin/admin-categories/components/admin-categories.component';
import { AdminAddCategoryComponent } from './main/admin/admin-categories/components/admin-add-category/admin-add-category.component';
import { AdminBrandsComponent } from './main/admin/admin-brands/components/admin-brands.component';
import { AdminAddBrandComponent } from './main/admin/admin-brands/components/admin-add-brand/admin-add-brand.component';
import { AdminProductsComponent } from './main/admin/admin-products/components/admin-products.component';
import { ShoppingCartComponent } from './main/client/shared/components/shopping-cart/shopping-cart.component';
import { ShoppingCartItemComponent } from './main/client/shared/components/shopping-cart/shopping-cart-item/shopping-cart-item.component';
import { ProductDetailsComponent } from './main/client/shared/components/product/product-details/product-details.component';
import { ProductGridComponent } from './main/client/shared/components/product/product-grid/product-grid.component';
import { ProductsListComponent } from './main/client/shared/components/product/products-list/products-list.component';
import { CheckoutComponent } from './main/client/checkout-page/checkout/checkout.component';
import { LoginComponent } from './main/client/shared/components/login/login.component';
import { RegisterComponent } from './main/client/shared/components/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminPaymentsComponent } from './main/admin/admin-payments/components/admin-payments/admin-payments.component';

const appRoutes = [
  { path: '', component: HomePageComponent },
  { path: 'supplements', component: SupplementsComponent },
  { path: 'gear', component: GearComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'details/:uid', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    component: AdminPageComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'brands', component: AdminBrandsComponent },
      { path: 'payments', component: AdminPaymentsComponent }
    ],
  },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    CarouselComponent,
    MenuNavigationComponent,
    OnSaleProductsComponent,
    OnSaleBannersComponent,
    ProductGridComponent,
    SliderBrandsComponent,
    NavFooterComponent,
    SupplementsComponent,
    SupplementsBannerComponent,
    FilterPipe,
    SortPipe,
    GearComponent,
    GearBannerComponent,
    ContactComponent,
    ProgramsComponent,
    ProgramsGridComponent,
    ProgramBannerComponent,
    ProductDetailsComponent,
    AdminDashboardComponent,
    AdminPageComponent,
    AdminProductsComponent,
    AdminAddProductComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    AdminCategoriesComponent,
    AdminAddCategoryComponent,
    AdminBrandsComponent,
    AdminAddBrandComponent,
    ShoppingCartComponent,
    ProductsListComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    AdminPaymentsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgImageSliderModule,
    NgxPaginationModule,
    CommonModule,
  ],

  exports: [FormsModule, ReactiveFormsModule, HttpClientModule, FilterPipe, SortPipe],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
