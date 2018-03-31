export class Tools {
  public static convertStore(store: any) {
    return new Promise((resolve) => {
      const newStoreFront = [];
      store.storefronts.forEach((storefront) => {
        // keep only the BRDailyStorefront and BRWeeklyStorefront
        if (
          storefront.name === "BRDailyStorefront" ||
          storefront.name === "BRWeeklyStorefront"
        ) {
          const newCatalogEntries = [];
          storefront.catalogEntries.forEach((catalogEntry) => {
            newCatalogEntries.push({
              devName: catalogEntry.devName,
              offerId: catalogEntry.offerId,
              prices: catalogEntry.prices,
            });
          });
          newStoreFront.push({
            catalogEntries: newCatalogEntries,
            name: storefront.name,
          });
        }
      });
      store.storefronts = newStoreFront;
      resolve(store);
    });
  }
}
