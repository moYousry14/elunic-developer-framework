import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule
  ],
  template: `
    <div class="inventory-container">
      <div class="inventory-header">
        <h1>Inventory Management</h1>
        <p-button label="New Product" icon="pi pi-plus" (onClick)="showDialog()"></p-button>
      </div>

      <p-table [value]="products" [tableStyle]="{'min-width': '60rem'}" styleClass="p-datatable-striped">
        <ng-template pTemplate="header">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr>
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.sku }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price | currency }}</td>
            <td>
              <p-button icon="pi pi-trash" severity="danger" [text]="true" (onClick)="deleteProduct(product.id)"></p-button>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="6" class="text-center">No products found.</td>
          </tr>
        </ng-template>
      </p-table>

      <p-dialog header="New Product" [(visible)]="dialogVisible" [modal]="true" [style]="{width: '450px'}">
        <div class="flex flex-column gap-3">
          <div class="flex flex-column gap-2">
            <label for="name">Name</label>
            <input pInputText id="name" [(ngModel)]="newProduct.name" />
          </div>
          <div class="flex flex-column gap-2">
            <label for="sku">SKU</label>
            <input pInputText id="sku" [(ngModel)]="newProduct.sku" />
          </div>
          <div class="flex flex-column gap-2">
            <label for="quantity">Quantity</label>
            <p-inputNumber id="quantity" [(ngModel)]="newProduct.quantity" [showButtons]="true" [min]="0"></p-inputNumber>
          </div>
          <div class="flex flex-column gap-2">
            <label for="price">Price</label>
            <p-inputNumber id="price" [(ngModel)]="newProduct.price" mode="currency" currency="USD" locale="en-US"></p-inputNumber>
          </div>
        </div>
        <ng-template pTemplate="footer">
          <p-button label="Cancel" [text]="true" (onClick)="hideDialog()"></p-button>
          <p-button label="Save" (onClick)="saveProduct()"></p-button>
        </ng-template>
      </p-dialog>
    </div>
  `,
  styles: [`
    .inventory-container {
      padding: 1rem;
    }

    .inventory-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .inventory-header h1 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }

    .text-center {
      text-align: center;
    }
  `]
})
export class InventoryComponent implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  dialogVisible = false;
  newProduct: Product = this.getEmptyProduct();

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error loading products:', err)
    });
  }

  showDialog() {
    this.newProduct = this.getEmptyProduct();
    this.dialogVisible = true;
  }

  hideDialog() {
    this.dialogVisible = false;
  }

  saveProduct() {
    this.productService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.hideDialog();
      },
      error: (err) => console.error('Error creating product:', err)
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error('Error deleting product:', err)
    });
  }

  private getEmptyProduct(): Product {
    return { name: '', sku: '', quantity: 0, price: 0 };
  }
}
