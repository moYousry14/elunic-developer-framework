import { Component, Input, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SharedSessionService } from '../shared-session.service';

export interface HeaderConfig {
  title: string;
  showStatus?: boolean;
  appSwitcher?: boolean;
  logoUrl?: string;
}

@Component({
  selector: 'sio-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, AvatarModule, MenuModule],
  template: `
    <header class="sio-header tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-2" style="background: #0090D4; color: white; height: 56px;">
      <div class="tw-flex tw-items-center tw-gap-3">
        <i class="pi pi-building" style="font-size: 1.5rem;"></i>
        <span class="tw-font-bold tw-text-lg">{{ config.title }}</span>
        @if (config.showStatus) {
          <span class="tw-bg-green-500 tw-text-white tw-px-2 tw-py-1 tw-rounded tw-text-xs">Online</span>
        }
      </div>

      <div class="tw-flex tw-items-center tw-gap-3">
        @if (config.appSwitcher) {
          <p-button icon="pi pi-th-large" [rounded]="true" [text]="true" severity="contrast"></p-button>
        }
        
        <p-avatar 
          [label]="sessionService.userInitials()" 
          shape="circle" 
          size="normal"
          (click)="userMenu.toggle($event)"
          style="cursor: pointer; background: rgba(255,255,255,0.2);">
        </p-avatar>
        
        <p-menu #userMenu [model]="menuItems()" [popup]="true"></p-menu>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HeaderComponent {
  @Input() config: HeaderConfig = { title: 'Elunic Workshop' };
  
  sessionService = inject(SharedSessionService);

  menuItems = computed<MenuItem[]>(() => [
    {
      label: this.sessionService.userDisplayName(),
      icon: 'pi pi-user',
      disabled: true
    },
    { separator: true },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: '/settings'
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.sessionService.logout()
    }
  ]);
}
