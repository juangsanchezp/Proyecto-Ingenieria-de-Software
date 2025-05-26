import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';

export const routes: Routes = [
    {
    path:"",
    component:HomeComponent,
    },{
        path:"carrito",
        component:CarritoComponent,
    },{
        path:"productos/:id",
        component:DetallesProductoComponent,
    }
];
