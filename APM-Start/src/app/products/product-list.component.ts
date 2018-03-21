import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    @ViewChild('filterElement') filterElementRef: ElementRef;   // these get access to the corresponding DOM
    private _sub: Subscription;
    //@ViewChildren('filterElement, nameElement') filterElementRefs: QueryList<ElementRef>;
    @ViewChildren(NgModel) filterElementRefs: QueryList<ElementRef>;

    listFilter: string;  // superseeded by getter-setter see immediately below
    // private _listFilter: string;
    // get listFilter(): string {
    //     return this._listFilter;
    // }

    // set listFilter(value: string)  {
    //     this._listFilter = value;
    //     this.performFilter(this._listFilter);
    // }

    //@ViewChild(NgModel) filterInput: NgModel;   // this gets access to the data
    private _filterInput: NgModel;
    get filterInput(): NgModel {
        return this._filterInput;
    }

    @ViewChild(NgModel)
    set filterInput(value: NgModel)  {
        this._filterInput = value;
        if(this.filterElementRef)
            this.filterElementRef.nativeElement.focus();

        if(this.filterInput && !this._sub)
        this._sub = this.filterInput.valueChanges.subscribe(() => {
                this.performFilter(this.listFilter);       
            });
    }

    constructor(private productService: ProductService) { 
        // in the constructor the view is not yet rendered
    }

    ngAfterViewInit(): void {
        console.log(this.filterElementRefs); 
        console.log(this.filterInput); 
        // this.filterElementRef.nativeElement.focus();
        // this.filterInput.valueChanges.subscribe(() => {
        //     this.performFilter(this.listFilter);       
        // });
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
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

    onFilterChange(filter: string){
        this.listFilter = filter;
        this.performFilter(this.listFilter);
    } 
}
