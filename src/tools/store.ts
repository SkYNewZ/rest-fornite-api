export class Tools {
  static convertStore(store: any) {
    return new Promise((resolve) => {
      let newStoreFront = []
      store.storefronts.forEach((storefront) => {
        // keep only the BRDailyStorefront and BRWeeklyStorefront
        if (storefront.name === 'BRDailyStorefront' || storefront.name === 'BRWeeklyStorefront') {
          let newCatalogEntries = []
          storefront.catalogEntries.forEach((catalogEntry) => {
            newCatalogEntries.push({
              devName: catalogEntry.devName,
              offerId: catalogEntry.offerId,
              prices: catalogEntry.prices
            })
          })
          newStoreFront.push({
            name: storefront.name,
            catalogEntries: newCatalogEntries
          })
        }
      })
      store.storefronts = newStoreFront
      resolve(store)
    })
  }
}