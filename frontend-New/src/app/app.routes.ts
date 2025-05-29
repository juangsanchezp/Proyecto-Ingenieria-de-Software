import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
    path:"home",
    component:HomeComponent,
    },{
        path:"carrito",
        component:CarritoComponent,
    },{
        path:"productos/:id",
        component:DetallesProductoComponent,
    }
      ,{path:"login",
        component:LoginComponent,
      },{path:"signup",
        component:SignupComponent,
    }
];

