import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

    pageTitle: string = 'Product List';
    
    showImage: boolean;
    includeDetail: boolean = true;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    //@ViewChild('filterCriteria') filterComponent: CriteriaComponent;// 'filterCriteria' must be predefined in the html template
    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
    parentListFilter: string;

    constructor(private productService: ProductService) { 
        // in the constructor the view is not yet rendered
    }

    ngAfterViewInit(): void {
        this.parentListFilter = this.filterComponent.listFilter;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.parentListFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
