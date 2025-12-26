import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    MenuModule,
    AvatarModule,
    DrawerModule
  ],
  template: `
    <div class="layout-wrapper">
      <!-- Topbar -->
      <div class="layout-topbar">
        <div class="topbar-left">
          <button pButton icon="pi pi-bars" class="p-button-text p-button-plain menu-toggle" (click)="toggleSidebar()"></button>
          <div class="logo-container">
            <i class="pi pi-box" style="font-size: 1.5rem; color: #3B82F6;"></i>
            <span class="app-title">Elunic Workshop</span>
          </div>
        </div>
        <div class="topbar-right">
          <p-avatar [label]="userInitial" shape="circle" size="large" (click)="userMenu.toggle($event)" styleClass="cursor-pointer"></p-avatar>
          <p-menu #userMenu [model]="userMenuItems" [popup]="true"></p-menu>
        </div>
      </div>

      <div class="layout-content-wrapper">
        <!-- Sidebar for Desktop -->
        <div class="layout-sidebar" [class.collapsed]="sidebarCollapsed">
          <p-menu [model]="navItems" styleClass="w-full border-none"></p-menu>
        </div>

        <!-- Mobile Drawer -->
        <p-drawer [(visible)]="mobileSidebarVisible" [modal]="true" styleClass="w-72">
          <ng-template pTemplate="header">
            <span class="font-semibold text-xl">Menu</span>
          </ng-template>
          <p-menu [model]="navItems" styleClass="w-full border-none"></p-menu>
        </p-drawer>

        <!-- Main Content -->
        <div class="layout-main" [class.sidebar-collapsed]="sidebarCollapsed">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .layout-topbar {
      height: 60px;
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .app-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
    }

    .topbar-right {
      display: flex;
      align-items: center;
    }

    .layout-content-wrapper {
      display: flex;
      margin-top: 60px;
      min-height: calc(100vh - 60px);
    }

    .layout-sidebar {
      width: 250px;
      background: #ffffff;
      border-right: 1px solid #e5e7eb;
      position: fixed;
      top: 60px;
      left: 0;
      height: calc(100vh - 60px);
      transition: width 0.3s ease;
      overflow-y: auto;
    }

    .layout-sidebar.collapsed {
      width: 0;
      overflow: hidden;
    }

    .layout-main {
      flex: 1;
      padding: 1.5rem;
      margin-left: 250px;
      background: #f8f9fa;
      transition: margin-left 0.3s ease;
    }

    .layout-main.sidebar-collapsed {
      margin-left: 0;
    }

    .menu-toggle {
      display: none;
    }

    @media (max-width: 991px) {
      .layout-sidebar {
        display: none;
      }

      .layout-main {
        margin-left: 0;
      }

      .menu-toggle {
        display: block;
      }
    }

    :host ::ng-deep .p-menu {
      border: none;
      background: transparent;
    }

    :host ::ng-deep .p-menuitem-link {
      padding: 1rem 1.25rem;
    }

    .cursor-pointer {
      cursor: pointer;
    }
  `]
})
export class MainLayoutComponent {
  private router = inject(Router);

  sidebarCollapsed = false;
  mobileSidebarVisible = false;
  userInitial = 'U';

  navItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Users',
      icon: 'pi pi-users',
      routerLink: '/users'
    },
    {
      label: 'Inventory',
      icon: 'pi pi-box',
      routerLink: '/inventory'
    }
  ];

  userMenuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog'
    },
    {
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];

  constructor() {
    this.loadUserData();
  }

  loadUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.username) {
          this.userInitial = user.username.charAt(0).toUpperCase();
        }
      } catch (e) {
        console.error('Error parsing user data');
      }
    }
  }

  toggleSidebar() {
    if (window.innerWidth <= 991) {
      this.mobileSidebarVisible = !this.mobileSidebarVisible;
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
