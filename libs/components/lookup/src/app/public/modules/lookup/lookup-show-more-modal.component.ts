import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';

import {
  SkyModalInstance
} from '@skyux/modals';

import {
  Subject
} from 'rxjs';

import {
  SkyLookupSelectMode
} from './types/lookup-select-mode';

import {
  SkyLookupShowMoreNativePickerContext
} from './types/lookup-show-more-native-picker-context';

/**
 * @internal
 * Internal component to implement the native picker.
 */
@Component({
  selector: 'skyux-lookup-show-more-modal',
  templateUrl: './lookup-show-more-modal.component.html',
  styleUrls: ['./lookup-show-more-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLookupShowMoreModalComponent implements AfterViewInit, OnDestroy {

  /**
   * @internal
   * Fires when users select the button to add new options to the list.
   */
  public addClick: Subject<void> = new Subject();

  public items: any[];

  public dataManagerConfig = {
    sortOptions: [
      {
        id: 'az',
        label: 'Alphabetical (A - Z)',
        descending: false,
        propertyName: 'name'
      },
      {
        id: 'za',
        label: 'Alphabetical (Z - A)',
        descending: true,
        propertyName: 'name'
      }
    ]
  };

  public displayedItems: any[] = [];
  public itemsHaveMore: boolean = false;
  public onlyShowSelected: boolean = false;
  public searchText: string;
  public selectedIds: any[] = [];

  private itemIndex: number = 0;
  private ngUnsubscribe = new Subject<void>();

  constructor(
    public modalInstance: SkyModalInstance,
    public context: SkyLookupShowMoreNativePickerContext,
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngAfterViewInit(): void {
    this.searchText = this.context.initialSearch;
    this.addItems();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public addButtonClicked(): void {
    this.addClick.next();
  }

  public addItems(): void {
    if (!this.items || this.items.length === 0) {
      let selectedIds: any[] = this.selectedIds?.slice() || [];
      this.items = this.context.items?.map(item => {
        return {
          value: item,
          selected: false
        };
      });

      this.items.forEach(item => {
        const isInitialValue: boolean = this.isEquivalent(this.context.initialValue, item.value);

        const initialIsArray: boolean = Array.isArray(this.context.initialValue);
        let initialValueContainsItem: boolean;

        if (initialIsArray) {
          initialValueContainsItem = this.context.initialValue
            .findIndex((initialItem: any) => this.isEquivalent(initialItem, item.value)) >= 0;
        }

        if (isInitialValue || (initialIsArray && initialValueContainsItem)) {
          item.selected = true;
          const itemIndex = this.items.indexOf(item);
          if (selectedIds.indexOf(itemIndex) < 0) {
            selectedIds.push(itemIndex);
          }
        }
      });

      this.selectedIds = selectedIds;
      this.updateData();
      this.changeDetector.markForCheck();
    }

    this.itemIndex = this.itemIndex + 10;
    const searchedItems = this.searchItems(this.items);
    this.displayedItems = searchedItems.slice(0, this.itemIndex);

    if (this.itemIndex > searchedItems.length) {
      this.itemsHaveMore = false;
    } else {
      this.itemsHaveMore = true;
    }
  }

  public clearAll(): void {
    this.displayedItems.forEach(item => {
      if (item.selected) {
        item.selected = false;

        const index = this.items.indexOf(item);

        this.selectedIds = this.selectedIds.filter(selectedId => {
          return selectedId !== index;
        });
      }
    });
    this.selectedIds = [];
    this.updateData();
    this.changeDetector.markForCheck();
  }

  public itemClick(selectedItem: any): void {
    if (this.context.selectMode === SkyLookupSelectMode.single) {
      if (!selectedItem.selected) {
        selectedItem.selected = true;
        this.items.forEach(item => {
          if (item.value !== selectedItem.value) {
            item.selected = false;
          }
        });
        this.displayedItems.forEach(item => {
          if (item.value !== selectedItem.value) {
            item.selected = false;
          }
        });
        const itemIndex = this.items.indexOf(selectedItem);
        this.selectedIds = <any[]>[itemIndex];
        this.updateData();
        this.changeDetector.markForCheck();
      }
    }
  }

  public onItemSelect(isSelected: boolean, item: any): void {
    let selectedItems: any[] = this.selectedIds || [];
    const allItemsIndex = this.items.indexOf(item);
    let selectedItemsIndex = selectedItems.indexOf(allItemsIndex);

    if (isSelected && selectedItemsIndex === -1) {
      selectedItems.push(allItemsIndex);
    } else if (!isSelected && selectedItemsIndex !== -1) {
      selectedItems.splice(selectedItemsIndex, 1);
    }

    this.selectedIds = selectedItems;
    this.updateData();
    this.changeDetector.markForCheck();
  }

  public searchApplied(searchText: string) {
    if (this.searchText !== searchText) {
      this.itemIndex = 10;
    }
    this.searchText = searchText;
    this.updateData();
  }

  public searchItems(items: any[]): any[] {
    let searchedItems = items;
    let searchText = this.searchText?.toUpperCase();

    if (searchText) {
      searchedItems = items.filter(function (item: any) {
        let property: any;
        const value = item.value;

        for (property in value) {
          if (value.hasOwnProperty(property) && (property === 'name' || property === 'description')) {
            const propertyText = value[property].toUpperCase();
            if (propertyText.indexOf(searchText) > -1) {
              return true;
            }
          }
        }

        return false;
      });
    }
    return searchedItems;
  }

  public selectAll(): void {
    let selectedIds: any[] = this.selectedIds || [];

    this.displayedItems.forEach((item: any) => {
      if (!item.selected) {
        item.selected = true;

        const index = this.items.indexOf(item);

        /* Sanity check */
        /* istanbul ignore else */
        if (selectedIds.indexOf(index) < 0) {
          selectedIds.push(index);
        }
      }
    });

    this.selectedIds = selectedIds;
    this.updateData();
    this.changeDetector.markForCheck();
  }

  public updateData(): void {
    let selectedIds: any[] = this.selectedIds || [];
    this.items.forEach((item: any, index: number) => {
      item.selected = selectedIds.indexOf(index) !== -1;
    });

    let searchedItems = this.searchItems(this.items);
    if (this.onlyShowSelected) {
      searchedItems = searchedItems.filter(item => item.selected);
    }
    this.displayedItems = searchedItems.slice(0, this.itemIndex);

    if (this.itemIndex > searchedItems.length) {
      this.itemsHaveMore = false;
    } else {
      this.itemsHaveMore = true;
    }

    this.changeDetector.markForCheck();
  }

  private isEquivalent(a: any, b: any): boolean {
    // Create arrays of property names
    const aProps = a ? Object.getOwnPropertyNames(a) : [];
    const bProps = b ? Object.getOwnPropertyNames(b) : [];

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }
}