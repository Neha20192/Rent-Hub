import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FavouriteService {

    private readonly favouriteKey = 'renthub_favourites';

    private getFavouriteIds(): number[] {
        const favourites = localStorage.getItem(this.favouriteKey);
        if (!favourites) {
            return [];
        }
        return JSON.parse(favourites);
    }

    isFavourite(propertyId: number): boolean {
        const favouriteIds = this.getFavouriteIds();
        return favouriteIds.includes(propertyId);
    }

    addFavourite(propertyId: number): void {
        const favouriteIds = this.getFavouriteIds();

        if (!favouriteIds.includes(propertyId)) {
            favouriteIds.push(propertyId);

            localStorage.setItem(
                this.favouriteKey,
                JSON.stringify(favouriteIds)
            );
        }
    }

    removeFavourite(propertyId: number): void {
        const favouriteIds = this.getFavouriteIds();
        const updatedIds = favouriteIds.filter(
            id => id !== propertyId
        );

        localStorage.setItem(
            this.favouriteKey,
            JSON.stringify(updatedIds)
        );
    }

    toggleFavourite(propertyId: number): void {
        if (this.isFavourite(propertyId)) {
            this.removeFavourite(propertyId);
        } else {
            this.addFavourite(propertyId);
        }
    }
}